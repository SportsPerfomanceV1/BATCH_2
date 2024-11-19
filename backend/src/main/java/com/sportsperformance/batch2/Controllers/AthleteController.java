package com.sportsperformance.batch2.Controllers;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sportsperformance.batch2.DTO.AthleteProfileDTO;
import com.sportsperformance.batch2.DTO.EventResponseDTO;
import com.sportsperformance.batch2.DTO.RegistrationDTO;
import com.sportsperformance.batch2.DTO.RegistrationRequestDTO;
import com.sportsperformance.batch2.Services.AthleteService;
import com.sportsperformance.batch2.models.Athlete;
import com.sportsperformance.batch2.models.Event;
import com.sportsperformance.batch2.models.Registration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;
import java.util.NoSuchElementException;

@JsonIgnoreProperties({"parentField"})
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

    private AthleteProfileDTO mapToDTO(Athlete athlete) {
        AthleteProfileDTO dto = new AthleteProfileDTO();
        dto.setFirstName(athlete.getFirstName());
        dto.setLastName(athlete.getLastName());
        dto.setBirthDate(athlete.getBirthDate());
        dto.setGender(athlete.getGender());
        dto.setHeight(String.valueOf(athlete.getHeight()));
        dto.setWeight(String.valueOf(athlete.getWeight()));
        dto.setCategory(athlete.getCategory());

        if (athlete.getPhoto() != null) {
            // Encode the photo byte array to Base64
            String base64Image = Base64.getEncoder().encodeToString(athlete.getPhoto());
            dto.setPhotoBase64(base64Image);
        } else {
            dto.setPhotoBase64(null);
        }

        return dto;
    }



    @GetMapping("/profile")
    public ResponseEntity<AthleteProfileDTO> getAthleteProfile() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = userDetails.getUsername();
        try {
            Athlete athlete = athleteService.getAthleteProfile(username);
            AthleteProfileDTO athleteProfileDTO = mapToDTO(athlete);
            return ResponseEntity.ok(athleteProfileDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/registerForEvent/{eventId}")
    public ResponseEntity<String> registerForEvent(@PathVariable Long eventId, @RequestBody RegistrationRequestDTO requestDTO) throws Exception {
        // Extract the username from the Authentication object in the SecurityContext
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = userDetails.getUsername();
        // Extract username from the JWT token

        athleteService.registerForEvent(username, requestDTO, eventId);
        return ResponseEntity.ok("Registration successful");
    }

//    @GetMapping("/events")
//    public ResponseEntity<List<EventResponseDTO>> getAllEvents() {
//        try {
//            List<EventResponseDTO> events = athleteService.getAllEvents();
//            return ResponseEntity.ok(events);
//        } catch (Exception e) {
//            return ResponseEntity.status(400).body(null);
//        }
//    }

    @GetMapping("/events")
    public ResponseEntity<List<EventResponseDTO>> getAvailableEvents() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = userDetails.getUsername();
        try {
            List<EventResponseDTO> events = athleteService.getAvailableEvents(username);
            return ResponseEntity.ok(events);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }


    @GetMapping("/events/registered")
    public ResponseEntity<List<RegistrationDTO>> getRegisteredEvents() {
        try {
            // Get the current logged-in athlete's username
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String username = userDetails.getUsername();

//            List<Event> events = athleteService.getRegisteredEvents(username);
            List<RegistrationDTO> registrations = athleteService.getRegisteredEvents(username);
            return ResponseEntity.ok(registrations);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(null);
        }
    }


    @DeleteMapping("/registration/{registrationId}")
    public ResponseEntity<String> deleteRegistration(@PathVariable Long registrationId) {
        try {
            athleteService.deleteRegistrationById(registrationId);
            return ResponseEntity.ok("Registration deleted successfully.");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: Registration not found.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }




}