package com.example.cafe.Controller;

import com.example.cafe.Entity.Drink;
import com.example.cafe.Repository.DrinkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {

    private final DrinkRepository drinkRepository;

    @GetMapping
    public ResponseEntity<List<Drink>> findAll() {
        return new ResponseEntity<>(drinkRepository.findAll(), HttpStatus.OK);
    }
}
