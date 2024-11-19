package com.sportsperformance.batch2.DTO;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
@Data
public class AthleteProfileDTO {

    private String firstName;
    private String lastName;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date birthDate;
    private String gender;
    private float height;
    private float weight;
    private String category;
    private String email;
    private String username;

    private MultipartFile photoUrl; // For incoming file uploads
    private String photoBase64;     // For outgoing Base64-encoded image
}

