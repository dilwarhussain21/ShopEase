package salesSavvy.dto;

public class CartItemResponseDto {
	private Long productId;
	private String name;
	private String photo;
	private int price;
	private int quantity;

	public CartItemResponseDto() { }

	public CartItemResponseDto(Long productId, String name, String photo, int price, int quantity) {
		this.productId = productId;
		this.name = name;
		this.photo = photo;
		this.price = price;
		this.quantity = quantity;
	}

	// getters & setters
	public Long getProductId() { return productId; }
	public void setProductId(Long productId) { this.productId = productId; }
	public String getName() { return name; }
	public void setName(String name) { this.name = name; }
	public String getPhoto() { return photo; }
	public void setPhoto(String photo) { this.photo = photo; }
	public int getPrice() { return price; }
	public void setPrice(int price) { this.price = price; }
	public int getQuantity() { return quantity; }
	public void setQuantity(int quantity) { this.quantity = quantity; }
}
