package com.sportsperformance.batch2.services;


import com.sportsperformance.batch2.models.Athlete;
import com.sportsperformance.batch2.repositories.AthleteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AthleteService {

    @Autowired
    private AthleteRepository athleteRepository;

    public Athlete createAthlete(Athlete athlete) {
        return athleteRepository.save(athlete);
    }

    public Athlete getAthleteByEmail(String email) {
        return athleteRepository.findByEmail(email).orElse(null);
    }


    public Athlete getAthleteById(Long id) {
        return athleteRepository.findById(id).orElseThrow(() -> new RuntimeException("Athlete not found"));
    }


    public List<Athlete> getAllAthletes() {
        return athleteRepository.findAll();
    }

    public Athlete updateAthlete(Athlete athlete) {
        return athleteRepository.save(athlete);
    }

    public void deleteAthlete(Long id) {
        athleteRepository.deleteById(id);
    }
}
