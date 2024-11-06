package com.sportsperformance.batch2.Controllers;

import com.sportsperformance.batch2.DTO.CreateEventDTO;
import com.sportsperformance.batch2.Services.AdminService;
import com.sportsperformance.batch2.models.Event;
import com.sportsperformance.batch2.models.Meet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

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
    public ResponseEntity<Meet> createMeet(String meetName) {
        try {
            Meet createdMeet = adminService.createMeet(meetName);
            return new ResponseEntity<>(createdMeet, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
