package com.example.mymanager.security;

import com.example.mymanager.services.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        try {
            // 1. Get the JWT from the Authorization header
            String jwt = parseJwt(request);

            // 2. If the token is valid
            if (jwt != null && jwtUtil.validateToken(jwt)) { // We update validateToken later

                // 3. Get the username (email) from the token
                String email = jwtUtil.extractUsername(jwt);

                // 4. Load the user's details from the database
                UserDetails userDetails = userDetailsService.loadUserByUsername(email);

                // 5. Create an authentication token
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // 6. Set the user in the Spring Security Context
                // This makes the user "authenticated" for this request
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            // We can add logging here
            logger.error("Cannot set user authentication: {}", e);
        }

        // 7. Continue the filter chain
        filterChain.doFilter(request, response);
    }

    // Helper method to parse the "Bearer <token>" header
    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");

        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7); // Return the token part
        }

        return null;
    }
}