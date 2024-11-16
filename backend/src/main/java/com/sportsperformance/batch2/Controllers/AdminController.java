package com.sportsperformance.batch2.Controllers;

import com.sportsperformance.batch2.DTO.AthleteResultDTO;
import com.sportsperformance.batch2.DTO.CreateEventDTO;

import com.sportsperformance.batch2.DTO.EventWithPendingResultDTO;
import com.sportsperformance.batch2.DTO.MeetDTO;
import com.sportsperformance.batch2.Services.AdminService;
import com.sportsperformance.batch2.models.*;
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
//
//    @GetMapping("/events/pending-results")
//    public ResponseEntity<List<EventWithPendingResultDTO>> getEventsWithPendingResults() {
//        return ResponseEntity.ok(adminService.getEventsWithPendingResults());
//    }
//
//    @GetMapping("/events/{eventId}/athletes")
//    public ResponseEntity<List<AthleteResultDTO>> getAthletesForEvent(@PathVariable int eventId) {
//        return ResponseEntity.ok(adminService.getAthletesForEvent(eventId));
//    }
//
//    @PostMapping("/events/{eventId}/publish-results")
//    public ResponseEntity<String> publishResults(
//            @PathVariable Long eventId,
//            @RequestBody List<AthleteResultDTO> results) {
//        // Save each result to the database
//        results.forEach(result -> {
//            EventResult eventResult = new EventResult();
//            try {
//                eventResult.setEvent(adminService.getEventById(eventId));
//            } catch (Exception e) {
//                throw new RuntimeException(e);
//            }
//            try {
//                eventResult.setAthlete(adminService.getAthleteById(result.getAthleteId()));
//            } catch (Exception e) {
//                throw new RuntimeException(e);
//            }
//            eventResult.setScore(result.getScore());
//            eventResult.setComment(result.getComment());
//            adminService.saveEventResult(eventResult);
//        });
//        return ResponseEntity.ok("Results published successfully!");
//    }



    // Endpoint to get events with pending results
    @GetMapping("/events/pending-results")
    public ResponseEntity<List<EventWithPendingResultDTO>> getEventsWithPendingResults() {
        List<EventWithPendingResultDTO> pendingResults = adminService.getEventsWithPendingResults();
        return ResponseEntity.ok(pendingResults);
    }

    // Endpoint to get athletes for a specific event
    @GetMapping("/events/{eventId}/athletes")
    public ResponseEntity<List<AthleteResultDTO>> getAthletesForEvent(@PathVariable Long eventId) {
        try {
            List<AthleteResultDTO> athletes = adminService.getAthletesForEvent(eventId);
            return ResponseEntity.ok(athletes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Endpoint to publish results for a specific event
    @PostMapping("/events/{eventId}/publish-results")
    public ResponseEntity<String> publishResults(
            @PathVariable Long eventId,
            @RequestBody List<AthleteResultDTO> results) {
        try {
            adminService.saveEventResult(eventId, results);
            return ResponseEntity.ok("Results published successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
