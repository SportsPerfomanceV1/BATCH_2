package com.sportsperformance.batch2.models;


import javax.persistence.*;

@Entity
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long adminId;
    @Column(name = "email")
    private String email;
    private String password;

    // Getters and Setters

    public Long getAdminId() {
        return adminId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        email = email;
    }

    public void setAdminId(Long adminId) {
        this.adminId = adminId;
    }
//
//    public String getUsername() {
//        return username;
//    }

//    public void setUsername(String username) {
//        this.username = username;
//    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
