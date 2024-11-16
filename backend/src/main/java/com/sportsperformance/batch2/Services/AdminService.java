package com.sportsperformance.batch2.Services;

import com.sportsperformance.batch2.DTO.AthleteResultDTO;
import com.sportsperformance.batch2.DTO.CreateEventDTO;
import com.sportsperformance.batch2.DTO.EventResultDTO;
import com.sportsperformance.batch2.DTO.EventWithPendingResultDTO;
import com.sportsperformance.batch2.Repositories.*;
import com.sportsperformance.batch2.models.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AdminService {
    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private MeetRepository meetRepository;

    private final String uploadDir = "uploads/images/"; // Directory to save images

    public Event createEvent(CreateEventDTO eventDTO) throws Exception {
        // Find the meet by ID
        Optional<Meet> meetOptional = meetRepository.findById(eventDTO.getMeetId());
        if (meetOptional.isEmpty()) {
            throw new Exception("Meet with ID " + eventDTO.getMeetId() + " not found.");
        }

        // Convert DTO to Entity
        Event event = new Event();
        event.setEventTitle(eventDTO.getEventTitle());
        event.setEventDate(eventDTO.getEventDate());
        event.setMeetId(meetOptional.get());
        event.setLocation(eventDTO.getLocation());
        event.setCategory(eventDTO.getCategory());
        event.setEventDescription(eventDTO.getEventDescription());

        // Handle image file upload
        MultipartFile imageFile = eventDTO.getImage();
        if (imageFile != null && !imageFile.isEmpty()) {
            // Create the upload directory if it doesn't exist
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                boolean created = directory.mkdirs();
                if (!created) {
                    throw new Exception("Failed to create directory: " + uploadDir);
                }
            }

            // Generate a unique filename
            String fileName = UUID.randomUUID().toString() + "_" + imageFile.getOriginalFilename();
            File file = new File(directory, fileName); // Create the file object

            // Save the image file using InputStream and Files.copy
            try (InputStream inputStream = imageFile.getInputStream()) {
                Files.copy(inputStream, file.toPath(), StandardCopyOption.REPLACE_EXISTING);
                event.setImageUrl(file.getAbsolutePath()); // Store the file path in the event
            } catch (IOException e) {
                e.printStackTrace(); // Log the exception
                throw new Exception("Failed to upload image: " + e.getMessage());
            }
        }

        // Save and return the event
        return eventRepository.save(event);
    }

    // Method to create a new meet
    public Meet createMeet(String meetName) {
        Meet meet = new Meet();
        meet.setMeetName(meetName);
        return meetRepository.save(meet);
    }

    // Method to get a meet by ID
    public Optional<Meet> getMeetById(long meetId) {
        return meetRepository.findById(meetId);
    }

    // Method to get all meets
    public List<Meet> getAllMeets() {
        return meetRepository.findAll();
    }

    @Autowired
    private RegistrationRepository registrationRepository;

    // 1. Update Registration Status (Approve/Reject)
    public void updateRegistrationStatus(Long registrationId, String status) throws Exception {
        Registration registration = registrationRepository.findById(registrationId)
                .orElseThrow(() -> new Exception("Registration not found"));

        registration.setStatus(status);

        registrationRepository.save(registration);
    }

    // 2. Get All Registrations
    public List<Registration> getAllRegistrations() {
        return registrationRepository.findAll();
    }
    @Autowired
    private AthleteRepository athleteRepository;

    // 3. Get Athlete by ID
    public Athlete getAthleteById(Long athleteId) throws Exception {
        return athleteRepository.findById(athleteId)
                .orElseThrow(() -> new Exception("Athlete not found"));
    }

    // 4. Get Event by ID
    public Event getEventById(Long eventId) throws Exception {
        return eventRepository.findById(eventId)
                .orElseThrow(() -> new Exception("Event not found"));
    }


    // Update in EventService
    public List<EventWithPendingResultDTO> getEventsWithPendingResults() {
        LocalDate today = LocalDate.now();
        return eventRepository.findAll().stream()
                .filter(event -> event.getEventDate()
                        .toInstant()
                        .atZone(ZoneId.systemDefault())
                        .toLocalDate()
                        .isBefore(today)
                        && event.getEventResults().isEmpty())
                .map(event -> {
                    EventWithPendingResultDTO dto = new EventWithPendingResultDTO();
                    dto.setEventId(event.getEventId());
                    dto.setEventTitle(event.getEventTitle());
                    dto.setCategory(event.getCategory());
                    dto.setLocation(event.getLocation());
                    dto.setEventDate(event.getEventDate().toString());
                    return dto;
                })
                .collect(Collectors.toList());
    }
    public List<AthleteResultDTO> getAthletesForEvent(Long eventId) {
        List<Registration> registrations = registrationRepository.findByEvent_EventIdAndStatus(eventId, "Approved");
        return registrations.stream().map(reg -> {
            AthleteResultDTO dto = new AthleteResultDTO();
            dto.setAthleteId(reg.getAthlete().getAthleteId());
            String name = reg.getAthlete().getFirstName() + reg.getAthlete().getLastName();
            dto.setAthleteName(name);
            dto.setAthletePicture(reg.getAthlete().getPhotoUrl());
            reg.getEvent().getEventResults().stream()
                    .filter(result -> result.getAthlete().getAthleteId() == reg.getAthlete().getAthleteId())
                    .findFirst()
                    .ifPresent(result -> {
                        dto.setScore(result.getScore());
                        dto.setComment(result.getComment());
                    });
            return dto;
        }).collect(Collectors.toList());
    }
    @Autowired
    private EventResultRepository eventResultRepository;

//    @Transactional
//    public void saveEventResult(Long eventId, List<EventResultDTO> eventResults) throws Exception {
//        // Fetch the event by ID
//        Event event = eventRepository.findById(eventId)
//                .orElseThrow(() -> new Exception("Event not found with ID: " + eventId));
//
//        for (EventResultDTO resultDTO : eventResults) {
//            // Validate if the athlete was registered and approved for the event
//            Registration registration = registrationRepository
//                    .findByEvent_EventIdAndAthlete_AthleteIdAndStatus(eventId, resultDTO.getAthleteId(), "Approved")
//                    .orElseThrow(() -> new Exception("Athlete not registered or not approved for this event"));
//
//            // Check if the result already exists
//            EventResult existingResult = eventResultRepository
//                    .findByEvent_EventIdAndAthlete_AthleteId(eventId, resultDTO.getAthleteId());
//
//            if (existingResult != null) {
//                // Update existing result
//                existingResult.setScore(resultDTO.getScore());
//                existingResult.setComment(resultDTO.getComment());
//                eventResultRepository.save(existingResult);
//            } else {
//                // Create a new result
//                EventResult newResult = new EventResult();
//                newResult.setEvent(event);
//                newResult.setAthlete(registration.getAthlete());
//                newResult.setScore(resultDTO.getScore());
//                newResult.setComment(resultDTO.getComment());
//                eventResultRepository.save(newResult);
//            }
//        }
//    }

    @Transactional
    public void saveEventResult(Long eventId, List<AthleteResultDTO> results) throws Exception {
        // Fetch the event by ID
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new Exception("Event not found with ID: " + eventId));

        for (AthleteResultDTO resultDTO : results) {
            // Validate if the athlete was registered and approved for the event
            Registration registration = registrationRepository
                    .findByEvent_EventIdAndAthlete_AthleteIdAndStatus(eventId, resultDTO.getAthleteId(), "Approved")
                    .orElseThrow(() -> new Exception("Athlete not registered or approved for this event"));

            // Check if the result already exists
            Optional<EventResult> existingResultOpt = eventResultRepository
                    .findByEvent_EventIdAndAthlete_AthleteId(eventId, resultDTO.getAthleteId());

            EventResult eventResult = existingResultOpt.orElse(new EventResult());
            eventResult.setEvent(event);
            eventResult.setAthlete(registration.getAthlete());
            eventResult.setScore(resultDTO.getScore());
            eventResult.setComment(resultDTO.getComment());

            // Save or update the result
            eventResultRepository.save(eventResult);
        }
    }

}
