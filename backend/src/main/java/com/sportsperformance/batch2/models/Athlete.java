package com.sportsperformance.batch2.models;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

//@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "athletes")
@Data
public class Athlete extends BaseUser {
    private String sport;
    private String achievements;

    // Getters and Setters

}