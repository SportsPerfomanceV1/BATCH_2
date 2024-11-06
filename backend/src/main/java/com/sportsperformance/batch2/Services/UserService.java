package com.sportsperformance.batch2.Services;

import com.sportsperformance.batch2.DTO.UserDTO;
import com.sportsperformance.batch2.Repositories.AdminRepository;
import com.sportsperformance.batch2.Repositories.AthleteRepository;
import com.sportsperformance.batch2.Repositories.CoachRepository;
import com.sportsperformance.batch2.models.Admin;
import com.sportsperformance.batch2.models.Athlete;
import com.sportsperformance.batch2.models.BaseUser;
import com.sportsperformance.batch2.models.Coach;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private AthleteRepository athleteRepository;

    @Autowired
    private CoachRepository coachRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Initialize default admin
    @PostConstruct
    public void initAdmin() {
        if (adminRepository.findByUsername("admin").isEmpty()) {
            Admin admin = new Admin();
            admin.setUsername("admin");
            admin.setEmail("admin@admin.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setCreatedAt(LocalDateTime.now());
            adminRepository.save(admin);
        }
    }

    // Register a user by role
    public void registerUser(UserDTO userDTO) {
        switch (userDTO.getRole().toLowerCase()) {
            case "athlete":
                if (athleteRepository.findByEmail(userDTO.getEmail()).isPresent()) {
                    throw new IllegalArgumentException("Email already exists");
                }
                Athlete athlete = new Athlete();
                athlete.setUsername(userDTO.getUsername());
                athlete.setEmail(userDTO.getEmail());
                athlete.setPassword(passwordEncoder.encode(userDTO.getPassword()));
                athlete.setCreatedAt(LocalDateTime.now());
                athleteRepository.save(athlete);
                break;

            case "coach":
                if (coachRepository.findByEmail(userDTO.getEmail()).isPresent()) {
                    throw new IllegalArgumentException("Email already exists");
                }
                Coach coach = new Coach();
                coach.setUsername(userDTO.getUsername());
                coach.setEmail(userDTO.getEmail());
                coach.setPassword(passwordEncoder.encode(userDTO.getPassword()));
                coach.setCreatedAt(LocalDateTime.now());
                coachRepository.save(coach);
                break;

            case "admin":
                throw new IllegalArgumentException("Admin registration is not allowed via this method.");
            default:
                throw new IllegalArgumentException("Invalid role: " + userDTO.getRole());
        }
    }

    // Retrieve a user by email or username for login
    public BaseUser findByEmailOrUsername(String identifier) {
        System.out.println("check3");

        // Check athlete repository by username
        Optional<BaseUser> athleteByUsername = athleteRepository.findByUsername(identifier).map(user -> (BaseUser) user);
        if (athleteByUsername.isPresent()) return athleteByUsername.get();

        // Check athlete repository by email
        Optional<BaseUser> athleteByEmail = athleteRepository.findByEmail(identifier).map(user -> (BaseUser) user);
        if (athleteByEmail.isPresent()) return athleteByEmail.get();

        // Check coach repository by username
        Optional<BaseUser> coachByUsername = coachRepository.findByUsername(identifier).map(user -> (BaseUser) user);
        if (coachByUsername.isPresent()) return coachByUsername.get();

        // Check coach repository by email
        Optional<BaseUser> coachByEmail = coachRepository.findByEmail(identifier).map(user -> (BaseUser) user);
        if (coachByEmail.isPresent()) return coachByEmail.get();

        // Check admin repository by username
        Optional<BaseUser> adminByUsername = adminRepository.findByUsername(identifier).map(user -> (BaseUser) user);
        if (adminByUsername.isPresent()) return adminByUsername.get();

        // Check admin repository by email
        return adminRepository.findByEmail(identifier).map(user -> (BaseUser) user).orElse(null);
    }


    /**
     * Checks if the provided password matches the stored hashed password.
     *
     * @param rawPassword   The raw password provided by the user.
     * @param storedPassword The hashed password retrieved from the database.
     * @return true if the passwords match, false otherwise.
     */
    public boolean checkPassword(String rawPassword, String storedPassword) {
        return passwordEncoder.matches(rawPassword, storedPassword);
    }

//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        BaseUser user = findByEmailOrUsername(username);
//        if(user instanceof Athlete){
//            return new org.springframework.security.core.userdetails.User(
//                    user.getUsername(), user.getPassword(),
//                    Collections.singleton(new SimpleGrantedAuthority("ATHLETE")));
//        } else if(user instanceof Coach){
//            return new org.springframework.security.core.userdetails.User(
//                    user.getUsername(), user.getPassword(),
//                    Collections.singleton(new SimpleGrantedAuthority("COACH")));
//        } else if(user instanceof Admin){
//            return new org.springframework.security.core.userdetails.User(
//                    user.getUsername(), user.getPassword(),
//                    Collections.singleton(new SimpleGrantedAuthority("ADMIN")));
//        }

//        return new org.springframework.security.core.userdetails.User(
//                user.getUsername(), user.getPassword(),
//                Collections.singleton(new SimpleGrantedAuthority("ROLE_" + user.getRole()))
//        );
//    }
}
