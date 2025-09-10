package salesSavvy.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import salesSavvy.dto.CartData;
import salesSavvy.dto.CartItemResponseDto;
import salesSavvy.service.CartService;

@RestController
@CrossOrigin("*")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/addToCart")
    public ResponseEntity<?> addToCart(@RequestBody CartData req) {
        try {
            cartService.addToCart(req.getEmail(), req.getProductIds());
            return ResponseEntity.ok().body(Map.of("status", "success"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/getCartItems/{email}")
    public ResponseEntity<?> getCartItems(@PathVariable String email) {
        try {
            List<CartItemResponseDto> items = cartService.getCartItems(email);
            return ResponseEntity.ok(items);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/updateCartItem")
    public ResponseEntity<?> updateCartItem(@RequestBody Map<String, Object> req) {
        try {
            String email = (String) req.get("email");
            Long productId = ((Number) req.get("productId")).longValue();
            int quantity = ((Number) req.get("quantity")).intValue();
            cartService.updateCartItemQuantity(email, productId, quantity);
            return ResponseEntity.ok().body(Map.of("status", "success"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/removeCartItem/{email}/{productId}")
    public ResponseEntity<?> removeCartItem(@PathVariable String email, @PathVariable Long productId) {
        try {
            cartService.removeCartItem(email, productId);
            return ResponseEntity.ok().body(Map.of("status", "success"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @DeleteMapping("/clearCart/{email}")
    public ResponseEntity<?> clearCart(@PathVariable String email) {
        try {
            // First, get the cart for the user
            cartService.getCartItems(email).forEach(item -> 
                cartService.removeCartItem(email, item.getProductId())
            );
            return ResponseEntity.ok().body(Map.of("status", "success"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}