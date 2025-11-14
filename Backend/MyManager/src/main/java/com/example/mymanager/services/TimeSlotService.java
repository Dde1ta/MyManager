package com.example.mymanager.services;

import com.example.mymanager.dto.TimeSlotDto;
import com.example.mymanager.entities.TimeSlot;
import com.example.mymanager.entities.User;
import com.example.mymanager.repositories.TimeSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TimeSlotService {

    @Autowired
    private TimeSlotRepository timeSlotRepository;

    /**
     * Gets all schedule slots for a user, grouped by day of the week.
     */
    public Map<String, List<TimeSlotDto>> getFullSchedule(User user) {
        List<TimeSlot> slots = timeSlotRepository.findByUserId(user.getId());

        // Group the flat list of slots into a Map<String, List<TimeSlotDto>>
        return slots.stream()
                .map(TimeSlotDto::new) // Convert to DTO
                .collect(Collectors.groupingBy(TimeSlotDto::getDayOfWeek));
    }

    /**
     * Adds a new time slot for a user.
     */
    public TimeSlot addTimeSlot(TimeSlotDto dto, User user) {
        TimeSlot newSlot = new TimeSlot();
        newSlot.setUser(user);
        newSlot.setDayOfWeek(dto.getDayOfWeek());
        newSlot.setTime(dto.getTime());
        newSlot.setSubject(dto.getSubject());
        newSlot.setBgColor(dto.getBgColor());
        newSlot.setBarColor(dto.getBarColor());
        newSlot.setPosition(dto.getPosition());

        return timeSlotRepository.save(newSlot);
    }

    /**
     * Updates an existing time slot.
     */
    public TimeSlot updateTimeSlot(Long slotId, TimeSlotDto dto, User user) {
        TimeSlot existingSlot = timeSlotRepository.findById(slotId)
                .orElseThrow(() -> new RuntimeException("TimeSlot not found"));

        // Check ownership
        if (!existingSlot.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access Denied");
        }

        // Update fields
        existingSlot.setTime(dto.getTime());
        existingSlot.setSubject(dto.getSubject());
        existingSlot.setBgColor(dto.getBgColor());
        existingSlot.setBarColor(dto.getBarColor());
        existingSlot.setPosition(dto.getPosition());
        // We don't allow changing the dayOfWeek, treat it as a new slot if so.
        // Or we could, but the logic in WeeklyPage.jsx seems to imply you'd
        // delete and re-add on a different day.

        return timeSlotRepository.save(existingSlot);
    }

    /**
     * Deletes a time slot.
     */
    public void deleteTimeSlot(Long slotId, User user) {
        TimeSlot existingSlot = timeSlotRepository.findById(slotId)
                .orElseThrow(() -> new RuntimeException("TimeSlot not found"));

        // Check ownership
        if (!existingSlot.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access Denied");
        }

        timeSlotRepository.delete(existingSlot);
    }
}