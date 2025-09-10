package salesSavvy.service;

import java.util.List;

import salesSavvy.entity.Product;

public interface ProductService {

	String addProduct(Product product);
	List<Product> getAllProducts();
	String deleteProduct(Long id);
	String updateProduct(Product product);

}
