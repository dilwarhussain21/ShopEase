package salesSavvy.dto;

public class PaymentVerificationRequest {
    private String orderId;
    private String paymentId;
    private String signature;

    public PaymentVerificationRequest() {}

    public PaymentVerificationRequest(String orderId, String paymentId, String signature) {
        this.orderId = orderId;
        this.paymentId = paymentId;
        this.signature = signature;
    }

    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }
    public String getPaymentId() { return paymentId; }
    public void setPaymentId(String paymentId) { this.paymentId = paymentId; }
    public String getSignature() { return signature; }
    public void setSignature(String signature) { this.signature = signature; }
}