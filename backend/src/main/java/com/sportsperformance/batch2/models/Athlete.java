package com.sportsperformance.batch2.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;
import java.util.List;

//@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "athletes")
@Data
public class Athlete extends BaseUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long athleteId;

    @ManyToOne
    @JoinColumn(name = "coachId", insertable = false, updatable = false)
    private Coach coach;

    private String firstName;
    private String lastName;
    private Date birthDate;
    private String gender;
    private float height;
    private float weight;
    private String category;
    private String photoUrl;

    @JsonIgnoreProperties("athlete")
    @OneToMany(mappedBy = "athlete")
    private List<EventResult> eventResults;

    @OneToMany(mappedBy = "athlete")
    @JsonIgnoreProperties("athlete")
    private List<Registration> registrations;

    @OneToMany(mappedBy = "athlete")
    @JsonIgnoreProperties("athlete")
    private List<DailyDiet> dailyDiets;

    @OneToMany(mappedBy = "athlete")
    @JsonIgnoreProperties("athlete")
    private List<AssistanceRequest> assistanceRequests;

    @OneToMany(mappedBy = "athlete")
    @JsonIgnoreProperties("athlete")
    private List<WeightPlan> weightPlans;


    // Getters and Setters

}