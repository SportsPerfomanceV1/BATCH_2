package com.sportsperformance.batch2.DTO;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class CoachDTO {
    private Long coachId;
    private String firstName;
    private String lastName;
//    private List<AchievementDTO> achievements;

    private MultipartFile imageFile; // Input for form submission
    private String imageBase64;      // Output for get requests
}
