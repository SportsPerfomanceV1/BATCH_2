package com.sportsperformance.batch2.controllers;

import com.sportsperformance.batch2.dto.UserDTO;
import com.sportsperformance.batch2.models.Athlete;
import com.sportsperformance.batch2.models.Coach;
import com.sportsperformance.batch2.models.Admin;
import com.sportsperformance.batch2.services.AthleteService;
import com.sportsperformance.batch2.services.CoachService;
import com.sportsperformance.batch2.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AthleteService athleteService;

    @Autowired
    private CoachService coachService;

    @Autowired
    private AdminService adminService;

    // Register Athlete
    @PostMapping("/register/athlete")
    public ResponseEntity<?> registerAthlete(@RequestBody Athlete athlete) {
        // No password encoding
        Athlete createdAthlete = athleteService.createAthlete(athlete);
        return ResponseEntity.ok(createdAthlete); // Return created athlete details
    }

    // Register Coach
    @PostMapping("/register/coach")
    public ResponseEntity<?> registerCoach(@RequestBody Coach coach) {
        // No password encoding
        Coach createdCoach = coachService.createCoach(coach);
        return ResponseEntity.ok(createdCoach); // Return created coach details
    }

    // Register Admin
    @PostMapping("/register/admin")
    public ResponseEntity<?> registerAdmin(@RequestBody Admin admin) {
        // No password encoding
        Admin createdAdmin = adminService.createAdmin(admin);
        return ResponseEntity.ok(createdAdmin); // Return created admin details
    }

    // Login for Athlete, Coach, and Admin
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO request) {
        String role = request.getRole().toLowerCase();
        boolean valid = false;
        Object user = null;

        switch (role) {
            case "athlete":
                Athlete athlete = athleteService.getAthleteByEmail(request.getUsername());
                valid = athlete != null && request.getPassword().equals(athlete.getPassword());
                if (valid) user = athlete;
                break;

            case "coach":
                Coach coach = coachService.getCoachByEmail(request.getUsername());
                valid = coach != null && request.getPassword().equals(coach.getPassword());
                if (valid) user = coach;
                break;

            case "admin":
                Admin admin = adminService.getAdminByEmail(request.getUsername());
                valid = admin != null && request.getPassword().equals(admin.getPassword());
                if (valid) user = admin;
                break;

            default:
                return ResponseEntity.badRequest().body("Invalid role provided.");
        }

        if (valid) {
            return ResponseEntity.ok(user); // Return user details on successful login
        } else {
            return ResponseEntity.status(401).body("Invalid email or password.");
        }
    }
}


//
//import com.sportsperformance.batch2.dto.UserDTO;
//import com.sportsperformance.batch2.dto.JwtResponseDTO;
//import com.sportsperformance.batch2.models.Athlete;
//import com.sportsperformance.batch2.models.Coach;
//import com.sportsperformance.batch2.models.Admin;
//import com.sportsperformance.batch2.services.AthleteService;
//import com.sportsperformance.batch2.services.CoachService;
//import com.sportsperformance.batch2.services.AdminService;
//import com.sportsperformance.batch2.services.JwtService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/auth")
//public class AuthController {
//
//    @Autowired
//    private AthleteService athleteService;
//
//    @Autowired
//    private CoachService coachService;
//
//    @Autowired
//    private AdminService adminService;
//
//    @Autowired
//    private JwtService jwtService;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    // Register Athlete
//    @PostMapping("/register/athlete")
//    public ResponseEntity<?> registerAthlete(@RequestBody Athlete athlete) {
//        athlete.setPassword(passwordEncoder.encode(athlete.getPassword()));
//        Athlete createdAthlete = athleteService.createAthlete(athlete);
//        String token = jwtService.generateToken(createdAthlete);
//        return ResponseEntity.ok(new JwtResponseDTO(token));
//    }
//
//    // Register Coach
//    @PostMapping("/register/coach")
//    public ResponseEntity<?> registerCoach(@RequestBody Coach coach) {
//        coach.setPassword(passwordEncoder.encode(coach.getPassword()));
//        Coach createdCoach = coachService.createCoach(coach);
//        String token = jwtService.generateToken(createdCoach);
//        return ResponseEntity.ok(new JwtResponseDTO(token));
//    }
//
//    // Register Admin
//    @PostMapping("/register/admin")
//    public ResponseEntity<?> registerAdmin(@RequestBody Admin admin) {
//        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
//        Admin createdAdmin = adminService.createAdmin(admin);
//        String token = jwtService.generateToken(createdAdmin);
//        return ResponseEntity.ok(new JwtResponseDTO(token));
//    }
//
//    // Login for Athlete, Coach, and Admin
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody UserDTO request) {
//        String role = request.getRole().toLowerCase();
//        boolean valid = false;
//        String token = null;
//
//        switch (role) {
//            case "athlete":
//                Athlete athlete = athleteService.getAthleteByEmail(request.getUsername());
//                valid = athlete != null && passwordEncoder.matches(request.getPassword(), athlete.getPassword());
//                if (valid) token = jwtService.generateToken(athlete);
//                break;
//
//            case "coach":
//                Coach coach = coachService.getCoachByEmail(request.getUsername());
//                valid = coach != null && passwordEncoder.matches(request.getPassword(), coach.getPassword());
//                if (valid) token = jwtService.generateToken(coach);
//                break;
//
//            case "admin":
//                Admin admin = adminService.getAdminByEmail(request.getUsername());
//                valid = admin != null && passwordEncoder.matches(request.getPassword(), admin.getPassword());
//                if (valid) token = jwtService.generateToken(admin);
//                break;
//
//            default:
//                return ResponseEntity.badRequest().body("Invalid role provided.");
//        }
//
//        if (valid) {
//            return ResponseEntity.ok(new JwtResponseDTO(token));
//        } else {
//            return ResponseEntity.status(401).body("Invalid email or password.");
//        }
//    }
//}
