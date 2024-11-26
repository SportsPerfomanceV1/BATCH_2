package com.sportsperformance.batch2.DTO;

import lombok.Data;

import java.util.Date;

@Data
public class EventResultDTO {
    private Long athleteId;
    private String athleteName;

    private float score;
    private String comment;
    private String eventName; // New field for event name
    private String meetName;  // New field for meet name
    private Date eventDate;
}
