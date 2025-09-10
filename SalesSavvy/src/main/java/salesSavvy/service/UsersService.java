package salesSavvy.service;

import salesSavvy.dto.LoginData;
import salesSavvy.entity.Users;

public interface UsersService {

    String addUser(Users user);

    Users getUserByEmail(String email);

    Users validate(LoginData data); 

}