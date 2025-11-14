package com.example.mymanager.repositories;

import com.example.mymanager.entities.TimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimeSlotRepository extends JpaRepository<TimeSlot, Long> {

    // Find all slots for a specific user
    List<TimeSlot> findByUserId(Long userId);

    // Find all slots for a specific user and day
    List<TimeSlot> findByUserIdAndDayOfWeek(Long userId, String dayOfWeek);
}