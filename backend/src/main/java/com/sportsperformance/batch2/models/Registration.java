package com.sportsperformance.batch2.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class Registration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int registrationId;

    @ManyToOne
    @JoinColumn(name = "eventId", nullable = false)
    private Event event;

    @ManyToOne
    @JoinColumn(name = "athleteId", nullable = false)
    private Athlete athlete;

    private Date registrationDate;
    private String status;
    private String remarks;

    // Getters and setters...
}
