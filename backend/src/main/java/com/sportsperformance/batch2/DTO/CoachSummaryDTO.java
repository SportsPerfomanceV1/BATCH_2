package com.sportsperformance.batch2.DTO;

import lombok.Data;

@Data
public class CoachSummaryDTO {
    private Long coachId;
    private String firstName;
    private String lastName;
    private String imageBase64; // Include image as Base64 for summary
}
