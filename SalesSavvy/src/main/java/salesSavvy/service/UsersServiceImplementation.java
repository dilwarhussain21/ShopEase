package salesSavvy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import salesSavvy.dto.LoginData;
import salesSavvy.entity.Users;
import salesSavvy.repository.UsersRepository;

import java.util.Optional;

@Service
public class UsersServiceImplementation implements UsersService {

    @Autowired
    UsersRepository repo;

    @Override
    public String addUser(Users user) {
        if (getUserByEmail(user.getEmail()) == null) { 
            repo.save(user);
            return "success";
        } else {
            return "fail";
        }
    }

    @Override
    public Users getUserByEmail(String email) {
        Optional<Users> userOpt = repo.findByEmail(email);
        return userOpt.orElse(null); // return user if present, else null
    }

    @Override
    public Users validate(LoginData data) {
        Users user = getUserByEmail(data.getEmail());

        if (user != null && user.getPassword().equals(data.getPassword())) {
            return user; // Return full user details
        }
        return null; // Invalid credentials
    }
}