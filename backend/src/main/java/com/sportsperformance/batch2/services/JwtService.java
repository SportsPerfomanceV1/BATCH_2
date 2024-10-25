//package com.sportsperformance.batch2.services;
//
//import com.sportsperformance.batch2.models.Admin;
//import com.sportsperformance.batch2.models.Athlete;
//import com.sportsperformance.batch2.models.Coach;
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import io.jsonwebtoken.SignatureException;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//import java.util.Date;
//import java.util.function.Function;
//
//@Service
//public class JwtService {
//
//    @Value("${jwt.secret}")
//    private String secretKey;
//
//    @Value("${jwt.expiration}")
//    private long expirationTime; // in milliseconds
//
//    // Generate JWT token
//    public String generateToken(Object user) {
//        String userId = getUserId(user);
//        String userRole = getUserRole(user);
//
//        return Jwts.builder()
//                .setSubject(userId)
//                .claim("role", userRole)
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
//                .signWith(SignatureAlgorithm.HS512, secretKey)
//                .compact();
//    }
//
//    // Extract claims from JWT token
//    private Claims extractAllClaims(String token) {
//        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
//    }
//
//    // Extract specific claim
//    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
//        final Claims claims = extractAllClaims(token);
//        return claimsResolver.apply(claims);
//    }
//
//    // Extract username (user ID) from token
//    public String extractUserId(String token) {
//        return extractClaim(token, Claims::getSubject);
//    }
//
//    // Extract role from token
//    public String extractUserRole(String token) {
//        return extractClaim(token, claims -> claims.get("role", String.class));
//    }
//
//    // Validate token expiration and user
//    public boolean validateToken(String token, String userId) {
//        final String extractedUserId = extractUserId(token);
//        return (extractedUserId.equals(userId) && !isTokenExpired(token));
//    }
//
//    // Check if token is expired
//    private boolean isTokenExpired(String token) {
//        return extractClaim(token, Claims::getExpiration).before(new Date());
//    }
//
//    // Helper methods for user properties
//    private String getUserId(Object user) {
//        if (user instanceof Athlete) return ((Athlete) user).getAthleteId().toString();
//        if (user instanceof Coach) return ((Coach) user).getCoachId().toString();
//        if (user instanceof Admin) return ((Admin) user).getAdminId().toString();
//        throw new IllegalArgumentException("Unknown user type.");
//    }
//
//    private String getUserRole(Object user) {
//        if (user instanceof Athlete) return "athlete";
//        if (user instanceof Coach) return "coach";
//        if (user instanceof Admin) return "admin";
//        throw new IllegalArgumentException("Unknown user type.");
//    }
//}
