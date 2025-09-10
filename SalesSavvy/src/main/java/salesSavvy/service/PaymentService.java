package salesSavvy.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;

@Service
public class PaymentService {

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    public Order createRzpOrder(double amount) throws RazorpayException {
        RazorpayClient client = new RazorpayClient(keyId, keySecret);

        JSONObject req = new JSONObject();
        req.put("amount", (int) (amount * 100)); // Convert to paise
        req.put("currency", "INR");
        req.put("receipt", "rcpt_" + System.currentTimeMillis());
        req.put("payment_capture", 1);

        return client.orders.create(req);
    }

    public boolean verifySignature(String orderId, String paymentId, String signature) {
        JSONObject payload = new JSONObject();
        payload.put("razorpay_order_id", orderId);
        payload.put("razorpay_payment_id", paymentId);
        payload.put("razorpay_signature", signature);

        try {
            Utils.verifyPaymentSignature(payload, keySecret);
            return true;
        } catch (RazorpayException e) {
            return false;
        }
    }

    public String getKeyId() {
        return keyId;
    }
}