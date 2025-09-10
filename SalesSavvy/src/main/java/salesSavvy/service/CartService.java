package salesSavvy.service;

import java.util.List;
import salesSavvy.dto.CartItemResponseDto;

public interface CartService {

    // Add multiple products to cart
    void addToCart(String email, List<Long> productIds);

    // Add a single product to cart
    void addToCart(String email, Long productId);

    // Get all cart items for a user
    List<CartItemResponseDto> getCartItems(String email);

    // Update quantity of a product in the cart
    void updateCartItemQuantity(String email, Long productId, int quantity);

    // Remove a specific product from cart
    void removeCartItem(String email, Long productId);

    // Clear the entire cart
    void clearCart(String email);
}
