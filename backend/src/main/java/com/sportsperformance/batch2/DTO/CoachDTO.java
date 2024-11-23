package com.sportsperformance.batch2.DTO;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CoachDTO {
    private Long coachId;
    private String firstName;
    private String lastName;

    private MultipartFile imageFile; // Input for form submission
    private String imageBase64;      // Output for get requests
}
