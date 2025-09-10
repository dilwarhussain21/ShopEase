package salesSavvy.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;

import jakarta.annotation.PostConstruct;
import jakarta.validation.Valid;
import salesSavvy.dto.CheckoutRequest;
import salesSavvy.dto.CheckoutResponse;
import salesSavvy.dto.PaymentVerificationRequest;
import salesSavvy.entity.OrderSales;
import salesSavvy.repository.OrderRepository;

@RestController
@CrossOrigin("*")
public class CheckoutController {

    private static final Logger logger = LoggerFactory.getLogger(CheckoutController.class);

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

    private final OrderRepository orderRepository;
    private RazorpayClient razorpayClient;

    public CheckoutController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @PostConstruct
    public void init() {
        logger.info("Loaded Razorpay Key ID: {}, Secret: {}", razorpayKeyId, razorpayKeySecret);
        try {
            if (razorpayKeyId == null || razorpayKeySecret == null) {
                logger.error("Razorpay credentials are missing or invalid. Payment functionality will not work.");
                this.razorpayClient = null;
            } else {
                this.razorpayClient = new RazorpayClient(razorpayKeyId, razorpayKeySecret);
                logger.info("RazorpayClient initialized successfully with key ID: {}", razorpayKeyId);
            }
        } catch (RazorpayException e) {
            logger.error("Failed to initialize RazorpayClient: {}", e.getMessage(), e);
            this.razorpayClient = null;
        }
    }

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@Valid @RequestBody CheckoutRequest request) {
        logger.info("Creating order for amount: {}", request.getAmount());
        if (razorpayClient == null) {
            return ResponseEntity.badRequest().body("Payment system is not initialized. Check backend logs for details.");
        }
        try {
            if (request.getAmount() <= 0 || request.getAmount() > 1000000) {
                return ResponseEntity.badRequest().body("Amount must be between 0.01 and 1000000");
            }
            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", (int) (request.getAmount() * 100)); // Convert to paise
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", "order_rcptid_" + System.currentTimeMillis());

            Order razorpayOrder = razorpayClient.orders.create(orderRequest);
            logger.info("Order created successfully with ID: {}", razorpayOrder.get("id").toString());

            OrderSales order = new OrderSales();
            order.setRazorpayOrderId(razorpayOrder.get("id").toString());
            order.setAmount(request.getAmount());
            order.setCurrency("INR");
            order.setStatus("CREATED");
            order.setShippingAddress(request.getShippingAddress());
            orderRepository.save(order);

            // Return key along with order details
            Map<String, Object> response = new HashMap<>();
            response.put("key", razorpayKeyId);  // Include Razorpay key
            response.put("amount", request.getAmount() * 100); // in paise
            response.put("razorpayOrderId", razorpayOrder.get("id").toString());

            return ResponseEntity.ok(response);

        } catch (RazorpayException e) {
            logger.error("Order creation failed: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body("Order creation failed: " + e.getMessage());
        }
    }

    @PostMapping("/verify-payment")
    public ResponseEntity<?> verifyPayment(@Valid @RequestBody PaymentVerificationRequest request) {
        logger.info("Verifying payment for Razorpay Order ID: {}", request.getOrderId());

        if (razorpayClient == null) {
            return ResponseEntity.badRequest().body("Payment system is not initialized. Check backend logs for details.");
        }

        try {
            JSONObject options = new JSONObject();
            options.put("razorpay_order_id", request.getOrderId());
            options.put("razorpay_payment_id", request.getPaymentId());
            options.put("razorpay_signature", request.getSignature());

            boolean isValid = Utils.verifyPaymentSignature(options, razorpayKeySecret);

            if (isValid) {
                OrderSales order = orderRepository.findByRazorpayOrderId(request.getOrderId())
                        .orElseThrow(() -> new RuntimeException("Order not found"));

                // update order details
                order.setStatus("PAID");
                order.setPaymentId(request.getPaymentId());
                order.setSignature(request.getSignature());
                orderRepository.save(order);

                logger.info("Order updated and saved with DB ID: {} and Razorpay Order ID: {}", 
                            order.getId(), order.getRazorpayOrderId());

                // send both DB order ID & Razorpay order ID
                Map<String, Object> response = new HashMap<>();
                response.put("orderId", order.getId());  // DB Primary Key
                response.put("razorpayOrderId", order.getRazorpayOrderId());
                response.put("status", order.getStatus());

                return ResponseEntity.ok(response);
            } else {
                logger.warn("Payment verification failed for Razorpay Order ID: {}", request.getOrderId());
                return ResponseEntity.badRequest().body("Payment verification failed");
            }

        } catch (Exception e) {
            logger.error("Verification failed for Razorpay Order ID: {}: {}", request.getOrderId(), e.getMessage(), e);
            return ResponseEntity.badRequest().body("Verification failed: " + e.getMessage());
        }
    }

   
 // 1️⃣ Get order by Razorpay Order ID
    @GetMapping("/getOrder/{razorpayOrderId}")
    public ResponseEntity<OrderSales> getOrderByRazorpayId(@PathVariable String razorpayOrderId) {
        return orderRepository.findByRazorpayOrderId(razorpayOrderId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404).body(null));
    }

    // 2️⃣ Get all orders by user email
    @GetMapping("/getOrders/{email}")
    public ResponseEntity<List<OrderSales>> getOrdersByEmail(@PathVariable String email) {
        List<OrderSales> orders = orderRepository.findByEmail(email);
        // Return empty list if no orders found
        return ResponseEntity.ok(orders);
    }
    
 // 3️⃣ Get order by database ID
    @GetMapping("/getOrderById/{id}")
    public ResponseEntity<OrderSales> getOrderById(@PathVariable Long id) {
        return orderRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404).body(null));
    }

}
