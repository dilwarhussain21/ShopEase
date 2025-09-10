package salesSavvy.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String name;
    String email;
    String password;
    String role;
    @OneToOne(
            mappedBy = "user",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonIgnore // Prevents serialization of cart to break the cycle
    Cart cart;

    public Cart getCart() {
        return cart;
    }
    public void setCart(Cart cart) {
        this.cart = cart;
        if (cart != null && cart.getUser() != this) {
            cart.setUser(this);
        }
    }

    public Users() {
        super();
    }
    public Users(Long id, String name, String email, String password, String role) {
        super();
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    @Override
    public String toString() {
        return "Users [id=" + id + ", name=" + name + ", email=" + email + ", password=" + password + ", role=" + role + "]";
    }
}