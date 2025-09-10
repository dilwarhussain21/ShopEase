package salesSavvy.dto;

import java.util.List;

public class CartData {
    private String email;
    private List<Long> productIds;
    
    public CartData() {}

    public CartData(String email, List<Long> productIds) {
        this.email = email;
        this.productIds = productIds;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Long> getProductIds() {
        return productIds;
    }

    public void setProductIds(List<Long> productIds) {
        this.productIds = productIds;
    }

    @Override
    public String toString() {
        return "CartData [email=" + email + ", productIds=" + productIds + "]";
    }
}

