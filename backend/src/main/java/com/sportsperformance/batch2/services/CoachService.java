package com.sportsperformance.batch2.services;

import com.sportsperformance.batch2.models.Coach;
import com.sportsperformance.batch2.repositories.CoachRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CoachService {

    @Autowired
    private CoachRepository coachRepository;

    public Coach createCoach(Coach coach) {
        return coachRepository.save(coach);
    }

    public Coach getCoachByEmail(String email) {
        return coachRepository.findByEmail(email).orElse(null);
    }

    public Coach getCoachById(Long id) {
        return coachRepository.findById(id).orElseThrow(() -> new RuntimeException("Coach not found"));
    }

    public List<Coach> getAllCoaches() {
        return coachRepository.findAll();
    }

    public Coach updateCoach(Coach coach) {
        return coachRepository.save(coach);
    }

    public void deleteCoach(Long id) {
        coachRepository.deleteById(id);
    }
}
