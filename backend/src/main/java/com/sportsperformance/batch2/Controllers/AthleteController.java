package com.sportsperformance.batch2.Controllers;

import com.sportsperformance.batch2.DTO.AthleteProfileDTO;
import com.sportsperformance.batch2.Services.AthleteService;
import com.sportsperformance.batch2.models.Athlete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/athlete")
public class AthleteController {
    @Autowired
    private AthleteService athleteService;


    @PostMapping(value = "/createProfile", consumes = "multipart/form-data")
    public ResponseEntity<String> createProfile(
            @ModelAttribute AthleteProfileDTO profileDTO) {

        // Extract the username from the Authentication object in the SecurityContext
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = userDetails.getUsername();

        try {

            athleteService.createOrUpdateProfile(username, profileDTO);
            return ResponseEntity.ok("Profile created/updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating/updating profile: " + e.getMessage());
        }
    }

    @GetMapping("/profile/{athleteId}")
    public ResponseEntity<Athlete> getAthleteProfile(@PathVariable Long athleteId) {
        try {
            Athlete athlete = athleteService.getAthleteProfile(athleteId);
            return ResponseEntity.ok(athlete);  // Return athlete profile as response
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);  // If athlete not found
        }
    }

}
