package com.sportsperformance.batch2.repositories;


import com.sportsperformance.batch2.models.Athlete;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AthleteRepository extends JpaRepository<Athlete, Long> {
    Optional<Athlete> findByEmail(String email);
}
