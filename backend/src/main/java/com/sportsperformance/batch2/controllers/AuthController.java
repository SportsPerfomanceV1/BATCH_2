package com.sportsperformance.batch2.Controllers;

import com.sportsperformance.batch2.DTO.LoginDTO;
import com.sportsperformance.batch2.DTO.UserDTO;
import com.sportsperformance.batch2.Services.UserService;
import com.sportsperformance.batch2.models.BaseUser;
import com.sportsperformance.batch2.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
            String token = jwtUtil.generateToken(user.getUsername());
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}
