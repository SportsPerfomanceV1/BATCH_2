package com.sportsperformance.batch2.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class AssistanceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int assistanceRequestId;

    @ManyToOne
    @JoinColumn(name = "eventId", nullable = false)
    private Event event;

    @ManyToOne
    @JoinColumn(name = "athleteId", nullable = false)
    private Athlete athlete;

    @ManyToOne
    @JoinColumn(name = "coachId", nullable = false)
    private Coach coach;

    private String eventTitle;
    private String meetName;
    private String status;
    private Date eventDate;
    private Date requestDate;
    private String location;
    private String remarks;

    // Getters and setters...
}

