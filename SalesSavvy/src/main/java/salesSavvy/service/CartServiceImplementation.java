package salesSavvy.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import salesSavvy.dto.CartItemResponseDto;
import salesSavvy.entity.Cart;
import salesSavvy.entity.CartItem;
import salesSavvy.entity.Product;
import salesSavvy.entity.Users;
import salesSavvy.repository.CartItemRepository;
import salesSavvy.repository.CartRepository;
import salesSavvy.repository.ProductRepository;
import salesSavvy.repository.UsersRepository;

@Service
public class CartServiceImplementation implements CartService {

    @Autowired
    private UsersRepository userRepo;

    @Autowired
    private CartRepository cartRepo;

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private CartItemRepository itemRepo;

    @Override
    @Transactional
    public void addToCart(String email, Long productId) {
        Users user = userRepo.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));

        Cart cart = cartRepo.findByUser(user).orElseGet(() -> {
            Cart newCart = new Cart(user);
            user.setCart(newCart);
            cartRepo.save(newCart);
            return newCart;
        });

        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with id: " + productId));

        CartItem item = cart.getItems().stream()
                .filter(ci -> ci.getProduct().getId().equals(productId))
                .findFirst()
                .orElse(null);

        if (item != null) {
            item.setQuantity(item.getQuantity() + 1);
            itemRepo.save(item);
        } else {
            CartItem newItem = new CartItem(product, 1);
            newItem.setCart(cart);
            cart.addItem(newItem);
            itemRepo.save(newItem);
        }
    }

    @Override
    @Transactional
    public void addToCart(String email, List<Long> productIds) {
        if (productIds == null || productIds.isEmpty()) return;

        Users user = userRepo.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));

        Cart cart = cartRepo.findByUser(user).orElseGet(() -> {
            Cart newCart = new Cart(user);
            user.setCart(newCart);
            cartRepo.save(newCart);
            return newCart;
        });

        for (Long productId : productIds) {
            Product product = productRepo.findById(productId)
                    .orElseThrow(() -> new IllegalArgumentException("Product not found with id: " + productId));

            CartItem item = cart.getItems().stream()
                    .filter(ci -> ci.getProduct().getId().equals(productId))
                    .findFirst()
                    .orElse(null);

            if (item != null) {
                item.setQuantity(item.getQuantity() + 1);
                itemRepo.save(item);
            } else {
                CartItem newItem = new CartItem(product, 1);
                newItem.setCart(cart);
                cart.addItem(newItem);
                itemRepo.save(newItem);
            }
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<CartItemResponseDto> getCartItems(String email) {
        Users user = userRepo.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));

        Cart cart = cartRepo.findByUser(user).orElse(null);
        if (cart == null) return new ArrayList<>();

        List<CartItem> cartItems = itemRepo.findByCartWithProduct(cart);

        List<CartItemResponseDto> dtoList = new ArrayList<>();
        for (CartItem ci : cartItems) {
            dtoList.add(new CartItemResponseDto(
                    ci.getProduct().getId(),
                    ci.getProduct().getName(),
                    ci.getProduct().getPhoto(),
                    ci.getProduct().getPrice(),
                    ci.getQuantity()
            ));
        }
        return dtoList;
    }

    @Override
    @Transactional
    public void updateCartItemQuantity(String email, Long productId, int quantity) {
        Users user = userRepo.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));

        Cart cart = cartRepo.findByUser(user)
                .orElseThrow(() -> new IllegalArgumentException("Cart not found for user: " + email));

        CartItem item = cart.getItems().stream()
                .filter(ci -> ci.getProduct().getId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Product not found in cart: " + productId));

        if (quantity <= 0) {
            cart.removeItem(item);
            itemRepo.delete(item);
        } else {
            item.setQuantity(quantity);
            itemRepo.save(item);
        }
    }

    @Override
    @Transactional
    public void removeCartItem(String email, Long productId) {
        Users user = userRepo.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));

        Cart cart = cartRepo.findByUser(user)
                .orElseThrow(() -> new IllegalArgumentException("Cart not found for user: " + email));

        CartItem item = cart.getItems().stream()
                .filter(ci -> ci.getProduct().getId().equals(productId))
                .findFirst()
                .orElse(null);

        if (item != null) {
            cart.removeItem(item);
            itemRepo.delete(item);
        }
    }

    @Override
    @Transactional
    public void clearCart(String email) {
        Users user = userRepo.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));

        Cart cart = cartRepo.findByUser(user).orElse(null);
        if (cart != null) {
            itemRepo.deleteByCartId(cart.getId());
        }
    }
}
