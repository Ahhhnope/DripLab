package com.example.cafe.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Cart extends JpaRepository<Cart, Integer> {
}
