package salesSavvy.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import salesSavvy.entity.Cart;
import salesSavvy.entity.Users;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUser(Users user);
}
