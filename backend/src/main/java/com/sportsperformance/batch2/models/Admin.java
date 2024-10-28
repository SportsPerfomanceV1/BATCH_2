package com.sportsperformance.batch2.models;


import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "admins")
@Data
public class Admin extends BaseUser {

    // Additional fields specific to Admins if needed
    private String name;
}
