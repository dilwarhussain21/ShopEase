package salesSavvy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import salesSavvy.entity.Product;
import salesSavvy.repository.ProductRepository;

@Service
public class ProductServiceImplementation implements ProductService{
	
	@Autowired
	ProductRepository repo;

	@Override
	public String addProduct(Product product) {
		repo.save(product);
		return "Successfully added";
	}

	@Override
	public List<Product> getAllProducts() {
		return repo.findAll();
	}

	@Override
	public String deleteProduct(Long id) {
		repo.deleteById(id);
		return "Successfully Deleted";
	}

	@Override
	public String updateProduct(Product product) {
	    if (product.getId() == null || !repo.existsById(product.getId())) {
	        return "Product ID not found. Cannot update.";
	    }

	    repo.save(product);
	    return "Updated successfully";
	}

}
