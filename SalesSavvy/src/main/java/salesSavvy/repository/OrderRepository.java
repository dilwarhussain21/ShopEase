package salesSavvy.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import salesSavvy.entity.OrderSales;

public interface OrderRepository extends JpaRepository<OrderSales, Long> {
	Optional<OrderSales> findByRazorpayOrderId(String razorpayOrderId);
	
	List<OrderSales> findByEmail(String email);
}