package com.sportsperformance.batch2.controllers;

import com.sportsperformance.batch2.models.Coach;
import com.sportsperformance.batch2.services.CoachService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/coaches")
public class CoachController {

    @Autowired
    private CoachService coachService;

    @PostMapping
    public Coach createCoach(@RequestBody Coach coach) {
        return coachService.createCoach(coach);
    }

    @GetMapping("/{id}")
    public Coach getCoach(@PathVariable Long id) {
        return coachService.getCoachById(id);
    }

    @GetMapping
    public List<Coach> getAllCoaches() {
        return coachService.getAllCoaches();
    }

    @PutMapping
    public Coach updateCoach(@RequestBody Coach coach) {
        return coachService.updateCoach(coach);
    }

    @DeleteMapping("/{id}")
    public void deleteCoach(@PathVariable Long id) {
        coachService.deleteCoach(id);
    }
}
