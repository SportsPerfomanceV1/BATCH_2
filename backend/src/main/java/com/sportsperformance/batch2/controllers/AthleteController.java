package com.sportsperformance.batch2.controllers;

import com.sportsperformance.batch2.models.Athlete;
import com.sportsperformance.batch2.services.AthleteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/athletes")
public class AthleteController {

    @Autowired
    private AthleteService athleteService;

    @PostMapping
    public Athlete createAthlete(@RequestBody Athlete athlete) {
        return athleteService.createAthlete(athlete);
    }

    @GetMapping("/{id}")
    public Athlete getAthlete(@PathVariable Long id) {
        return athleteService.getAthleteById(id);
    }

    @GetMapping
    public List<Athlete> getAllAthletes() {
        return athleteService.getAllAthletes();
    }

    @PutMapping
    public Athlete updateAthlete(@RequestBody Athlete athlete) {
        return athleteService.updateAthlete(athlete);
    }

    @DeleteMapping("/{id}")
    public void deleteAthlete(@PathVariable Long id) {
        athleteService.deleteAthlete(id);
    }
}
