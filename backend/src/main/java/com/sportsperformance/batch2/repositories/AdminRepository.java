package com.sportsperformance.batch2.Repositories;

import com.sportsperformance.batch2.models.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByEmail(String email);
    Optional<Admin> findByUsername(String username);
}
