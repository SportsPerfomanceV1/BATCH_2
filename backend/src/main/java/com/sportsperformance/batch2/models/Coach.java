package com.sportsperformance.batch2.models;


import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "coaches")
@Data
public class Coach extends BaseUser {
    private String specialty;
    private int experienceYears;

    // Getters and Setters

}