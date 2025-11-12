package com.example.mymanager.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    // !!! IMPORTANT: This MUST be a strong, random, and secret key!
    // For production, load this from application.properties
    private final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    private final long EXPIRATION_TIME = 1000 * 60 * 60 * 10; // 10 hours

    // --- Generate a token from UserDetails ---
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        // You can add more claims here (e.g., user.getId())

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername()) // This is the user's email
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SECRET_KEY)
                .compact();
    }

    // --- Validate a token ---
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
    // --- Add this new validation method ---
    // This just checks the signature and expiration, without comparing to a user
    public Boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(token);
            return !isTokenExpired(token);
        } catch (Exception e) {
            // You can log different exceptions here (MalformedJwtException, ExpiredJwtException, etc.)
            return false;
        }
    }

    // --- Extract username (email) from a token ---
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // --- Extract expiration date from a token ---
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // --- Check if a token is expired ---
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // --- Helper function to extract any claim ---
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // --- Helper function to get all claims from a token ---
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}