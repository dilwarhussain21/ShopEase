package salesSavvy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import salesSavvy.entity.Product;
import salesSavvy.service.ProductService;

@CrossOrigin("*")
@RestController
public class ProductController {
	
	@Autowired
	ProductService service;
	
	@PostMapping("/addProduct")
    public String addProduct(@RequestBody Product product) {
        return service.addProduct(product);
    }
	
	@GetMapping("/allProducts")
	public List<Product> allProducts() {
		return service.getAllProducts();
	}
	
	@PostMapping("/deleteProduct")
    public String deleteProduct(@RequestParam Long id) {
        return service.deleteProduct(id);
    }
	
	@PostMapping("/updateProduct")
    public String updateProduct(@RequestBody Product product) {
        return service.updateProduct(product);
    }
	
//	@PostMapping("/viewCart")
//    public String viewCart() {
//        return service.updateProduct(product);
//    }
}
