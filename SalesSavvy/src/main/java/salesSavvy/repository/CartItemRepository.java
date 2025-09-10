package salesSavvy.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import salesSavvy.entity.Cart;
import salesSavvy.entity.CartItem;
import salesSavvy.entity.Product;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    boolean existsByCartAndProduct(Cart cart, Product product);

    @Query("SELECT ci FROM CartItem ci JOIN FETCH ci.product WHERE ci.cart = :cart")
    List<CartItem> findByCartWithProduct(@Param("cart") Cart cart);

    @Modifying
    @Transactional
    @Query("DELETE FROM CartItem ci WHERE ci.cart.id = :cartId")
    void deleteByCartId(@Param("cartId") Long cartId);
}
