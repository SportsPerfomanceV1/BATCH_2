package com.sportsperformance.batch2.Repositories;

import com.sportsperformance.batch2.models.EventResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EventResultRepository extends JpaRepository<EventResult, Integer> {
    Optional<EventResult> findByEvent_EventIdAndAthlete_AthleteId(Long eventId, Long athleteId);
}
