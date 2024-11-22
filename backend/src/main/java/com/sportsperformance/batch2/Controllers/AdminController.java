package com.sportsperformance.batch2.Controllers;

import com.sportsperformance.batch2.DTO.CreateEventDTO;

import com.sportsperformance.batch2.DTO.MeetDTO;
import com.sportsperformance.batch2.Services.AdminService;
import com.sportsperformance.batch2.models.Athlete;
import com.sportsperformance.batch2.models.Event;
import com.sportsperformance.batch2.models.Meet;
import com.sportsperformance.batch2.models.Registration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @GetMapping("/test")
    public ResponseEntity<Map<String, String>> getMessage() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Hello from the backend!");
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "/createevent", consumes = "multipart/form-data")
    public ResponseEntity<Event> createEvent(@ModelAttribute CreateEventDTO eventDTO) {
        try {
            
            Event createdEvent = adminService.createEvent(eventDTO);
            return new ResponseEntity<>(createdEvent, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/createmeet")
    public ResponseEntity<Meet> createMeet(@RequestBody MeetDTO meetRequest) {
        try {
            // Extract the meetName from the request object
            String meetName = meetRequest.getMeetName();
            Meet createdMeet = adminService.createMeet(meetName);
            return new ResponseEntity<>(createdMeet, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/allMeet")
    public ResponseEntity<List<Meet>> getAllMeet() {
        return ResponseEntity.ok(adminService.getAllMeets());
    }

    @PutMapping("/registration/{registrationId}")
    public ResponseEntity<String> updateRegistrationStatus(
            @PathVariable Long registrationId,
            @RequestParam String status) {
        try {
            adminService.updateRegistrationStatus(registrationId, status);
            return ResponseEntity.ok("Registration updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error: " + e.getMessage());
        }
    }


    @GetMapping("/registrations")
    public ResponseEntity<List<Registration>> getAllRegistrations() {
        try {
            List<Registration> registrations = adminService.getAllRegistrations();
            return ResponseEntity.ok(registrations);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(null);
        }
    }

    @GetMapping("/athlete/{athleteId}")
    public ResponseEntity<Athlete> getAthlete(@PathVariable Long athleteId) {
        try {
            Athlete athlete = adminService.getAthleteById(athleteId);
            return ResponseEntity.ok(athlete);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(null);
        }
    }

    // 4. Fetch Event by ID
    @GetMapping("/event/{eventId}")
    public ResponseEntity<Event> getEvent(@PathVariable Long eventId) {
        try {
            Event event = adminService.getEventById(eventId);
            return ResponseEntity.ok(event);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(null);
        }
    }

}
