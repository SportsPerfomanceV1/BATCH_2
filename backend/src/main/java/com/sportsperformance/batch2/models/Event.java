package com.sportsperformance.batch2.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@Entity
@Data
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int eventId;

    private String eventTitle;

    @ManyToOne
    @JoinColumn(name = "meetId", nullable = false)
    @JsonIgnoreProperties("event")
    private Meet meetId;

    private String category;
    private String location;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date eventDate;

    private String eventDescription;
    private String imageUrl;



    @OneToMany(mappedBy = "event")
    @JsonIgnoreProperties("event")
    private List<EventResult> eventResults;

    @OneToMany(mappedBy = "event")
    @JsonIgnoreProperties("event")
    private List<Registration> registrations;

    @OneToMany(mappedBy = "event")
    @JsonIgnoreProperties("event")
    private List<AssistanceRequest> assistanceRequests;

    // Getters and setters...
}
