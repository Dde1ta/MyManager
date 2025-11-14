package com.example.mymanager.controllers;

import com.example.mymanager.dto.TimeSlotDto;
import com.example.mymanager.entities.TimeSlot;
import com.example.mymanager.entities.User;
import com.example.mymanager.services.TimeSlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/schedule")
public class TimeSlotController extends BaseController {

    @Autowired
    private TimeSlotService timeSlotService;

    /**
     * GET /api/schedule
     * Fetches the user's entire weekly schedule, grouped by day.
     * This matches the structure of weeklyScheduleData.js
     */
    @GetMapping
    public Map<String, List<TimeSlotDto>> getFullSchedule() {
        User user = getAuthenticatedUser();
        return timeSlotService.getFullSchedule(user);
    }

    /**
     * POST /api/schedule
     * Adds a new time slot to the user's schedule.
     */
    @PostMapping
    public TimeSlotDto addTimeSlot(@RequestBody TimeSlotDto timeSlotDto) {
        User user = getAuthenticatedUser();
        TimeSlot newSlot = timeSlotService.addTimeSlot(timeSlotDto, user);
        return new TimeSlotDto(newSlot); // Return the created DTO
    }

    /**
     * PUT /api/schedule/{slotId}
     * Updates an existing time slot.
     */
    @PutMapping("/{slotId}")
    public TimeSlotDto updateTimeSlot(@PathVariable Long slotId, @RequestBody TimeSlotDto timeSlotDto) {
        User user = getAuthenticatedUser();
        TimeSlot updatedSlot = timeSlotService.updateTimeSlot(slotId, timeSlotDto, user);
        return new TimeSlotDto(updatedSlot);
    }

    /**
     * DELETE /api/schedule/{slotId}
     * Deletes an existing time slot.
     */
    @DeleteMapping("/{slotId}")
    public ResponseEntity<?> deleteTimeSlot(@PathVariable Long slotId) {
        User user = getAuthenticatedUser();
        timeSlotService.deleteTimeSlot(slotId, user);
        return ResponseEntity.ok().build();
    }
}