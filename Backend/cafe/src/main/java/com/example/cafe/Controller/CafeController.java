package com.example.cafe.Controller;

import com.example.cafe.Entity.User;
import com.example.cafe.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;


@Controller
@RequiredArgsConstructor
@RequestMapping("/")
public class CafeController {

    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<User>> getDrinks() {
        return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
    }
}
