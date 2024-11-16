package com.sportsperformance.batch2.DTO;

import lombok.Data;

@Data
public class AthleteResultDTO {
    private Long athleteId;
    private String athleteName;
    private String athletePicture;
    private float score; // Existing score, if any
    private String comment; // Existing comment, if any
}
