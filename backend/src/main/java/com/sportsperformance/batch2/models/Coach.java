package com.sportsperformance.batch2.models;


import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "coaches")
@Data
public class Coach extends BaseUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long coachId;

    private String firstName;
    private String lastName;

    @OneToMany(mappedBy = "coach")
    private List<Athlete> athletes;

    @OneToMany(mappedBy = "coach")
    private List<Achievement> achievements;

    @OneToMany(mappedBy = "coach")
    private List<AssistanceRequest> assistanceRequests;

    @Lob
    @Column(name = "image", columnDefinition = "BLOB")
    private byte[] image;

}