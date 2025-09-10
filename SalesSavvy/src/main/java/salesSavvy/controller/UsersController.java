package salesSavvy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import salesSavvy.dto.LoginData;
import salesSavvy.dto.UserDTO;
import salesSavvy.entity.Users;
import salesSavvy.service.UsersService;

@CrossOrigin("*")
@RestController
public class UsersController {

    @Autowired
    UsersService service;

    @PostMapping("/signUp")
    public String signUp(@RequestBody Users user) {
        System.out.println(user);
        return service.addUser(user);
    }

    @PostMapping("/signIn")
    public ResponseEntity<?> signIn(@RequestBody LoginData data) {
        Users user = service.validate(data);

        if (user != null) {
            // Map to DTO to avoid nested relationships
            UserDTO userDTO = new UserDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole()
            );
            return ResponseEntity.ok(userDTO);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
        }
    }
}