package salesSavvy.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class CheckoutRequest {
    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be greater than zero")
    private double amount;

    private String shippingAddress;

    public CheckoutRequest() {}

    public CheckoutRequest(double amount, String shippingAddress) {
        this.amount = amount;
        this.shippingAddress = shippingAddress;
    }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
    public String getShippingAddress() { return shippingAddress; }
    public void setShippingAddress(String shippingAddress) { this.shippingAddress = shippingAddress; }
}