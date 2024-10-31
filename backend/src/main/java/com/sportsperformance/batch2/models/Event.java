package com.sportsperformance.batch2.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity
@Data
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int eventId;

    private String eventTitle;
    private String meetName;
    private String category;
    private String location;
    private Date eventDate;



    @OneToMany(mappedBy = "event")
    private List<EventResult> eventResults;

    @OneToMany(mappedBy = "event")
    private List<Registration> registrations;

    @OneToMany(mappedBy = "event")
    private List<AssistanceRequest> assistanceRequests;

    // Getters and setters...
}
