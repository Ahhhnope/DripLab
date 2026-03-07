package com.example.cafe.Service;

import com.example.cafe.DTO.UserRequest;
import com.example.cafe.DTO.UserResponse;

import java.util.List;

public interface UserService {
    List<UserResponse> getAll();
    UserResponse findById(Integer id);
    UserResponse add(UserRequest userRequest);
    UserResponse update(UserRequest userRequest, Integer id);
    UserResponse delete(Integer id);
}
