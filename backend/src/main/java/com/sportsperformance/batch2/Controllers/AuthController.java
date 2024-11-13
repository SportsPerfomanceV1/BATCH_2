package com.sportsperformance.batch2.Controllers;

import com.sportsperformance.batch2.DTO.LoginDTO;
import com.sportsperformance.batch2.DTO.UserDTO;
import com.sportsperformance.batch2.Services.UserService;
import com.sportsperformance.batch2.models.Athlete;
import com.sportsperformance.batch2.models.BaseUser;
import com.sportsperformance.batch2.models.Coach;
import com.sportsperformance.batch2.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;



    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserDTO userDTO) {
        System.out.println("check perfect");
        try {
            userService.registerUser(userDTO);
            return ResponseEntity.ok("User registered successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<String> authenticate(@RequestBody LoginDTO loginDTO) {
        BaseUser user = userService.findByEmailOrUsername(loginDTO.getUsernameEmail());
        System.out.println("check0");

        if (user != null && userService.checkPassword(loginDTO.getPassword(), user.getPassword())) {
            System.out.println("check1");
            if(user instanceof Athlete){
//
//                String token = jwtUtil.generateToken(user.getUsername(), "ATHLETE");
//                return ResponseEntity.ok(token);

                String token = jwtUtil.generateToken(user.getUsername(), "ATHLETE");

// Create a JSON response including both the token and role
                Map<String, String> response = new HashMap<>();
                response.put("token", token);
                response.put("role", "ATHLETE");

                try {
                    // Convert map to JSON
                    ObjectMapper mapper = new ObjectMapper();
                    String jsonResponse = mapper.writeValueAsString(response);

                    // Return as ResponseEntity<String>
                    return ResponseEntity.ok(jsonResponse);
                } catch (Exception e) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error generating response");
                }
            } else if(user instanceof Coach){
                String token = jwtUtil.generateToken(user.getUsername(), "COACH");
//                return ResponseEntity.ok(token);

                Map<String, String> response = new HashMap<>();
                response.put("token", token);
                response.put("role", "COACH");

                try {
                    // Convert map to JSON
                    ObjectMapper mapper = new ObjectMapper();
                    String jsonResponse = mapper.writeValueAsString(response);

                    // Return as ResponseEntity<String>
                    return ResponseEntity.ok(jsonResponse);
                } catch (Exception e) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error generating response");
                }

            } else{
                String token = jwtUtil.generateToken(user.getUsername(), "ADMIN");
//                return ResponseEntity.ok(token);
                Map<String, String> response = new HashMap<>();
                response.put("token", token);
                response.put("role", "ADMIN");

                try {
                    // Convert map to JSON
                    ObjectMapper mapper = new ObjectMapper();
                    String jsonResponse = mapper.writeValueAsString(response);

                    // Return as ResponseEntity<String>
                    return ResponseEntity.ok(jsonResponse);
                } catch (Exception e) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error generating response");
                }
            }
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}
