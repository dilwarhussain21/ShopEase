package salesSavvy.dto;

public class CheckoutResponse {
    private String razorpayOrderId;

    public CheckoutResponse() {}

    public CheckoutResponse(String razorpayOrderId) {
        this.razorpayOrderId = razorpayOrderId;
    }

    public String getRazorpayOrderId() { return razorpayOrderId; }
    public void setRazorpayOrderId(String razorpayOrderId) { this.razorpayOrderId = razorpayOrderId; }
}