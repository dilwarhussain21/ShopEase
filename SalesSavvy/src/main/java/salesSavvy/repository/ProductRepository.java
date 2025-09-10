package salesSavvy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import salesSavvy.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{
	
}
