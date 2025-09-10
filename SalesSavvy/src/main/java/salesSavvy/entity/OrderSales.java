package salesSavvy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "order_sales")
public class OrderSales {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;   // Primary Key

    @Column(name = "razorpay_order_id", unique = true, nullable = false)
    private String razorpayOrderId;   // Razorpay Order ID

    private double amount;

    private String currency;

    private String status;   // CREATED | PAID

    @Column(name = "payment_id")
    private String paymentId;   // Razorpay payment ID after success

    @Column(name = "shipping_address")
    private String shippingAddress;

    @Column(name = "email")
    private String email;

    @Column(name = "signature")
    private String signature;

    @Column(name = "shipping_address_json", columnDefinition = "TEXT")
    private String shippingAddressJson;

    @Column(name = "created_at")
    private java.time.LocalDateTime createdAt;

    // ----- Getters & Setters -----

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getRazorpayOrderId() {
        return razorpayOrderId;
    }
    public void setRazorpayOrderId(String razorpayOrderId) {
        this.razorpayOrderId = razorpayOrderId;
    }

    public double getAmount() {
        return amount;
    }
    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }
    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public String getPaymentId() {
        return paymentId;
    }
    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }
    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getSignature() {
        return signature;
    }
    public void setSignature(String signature) {
        this.signature = signature;
    }

    public String getShippingAddressJson() {
        return shippingAddressJson;
    }
    public void setShippingAddressJson(String shippingAddressJson) {
        this.shippingAddressJson = shippingAddressJson;
    }

    public java.time.LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(java.time.LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    // Default constructor
    public OrderSales() {}
}
