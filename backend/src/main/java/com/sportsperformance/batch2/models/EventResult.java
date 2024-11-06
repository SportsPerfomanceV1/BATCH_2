package com.sportsperformance.batch2.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class EventResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int resultId;

    @ManyToOne
    @JoinColumn(name = "eventId", nullable = false)
    private Event event;

    @ManyToOne
    @JoinColumn(name = "athleteId", nullable = false)
    private Athlete athlete;

    private float score;

    // Getters and setters...
}
