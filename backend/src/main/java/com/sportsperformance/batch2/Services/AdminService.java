package com.sportsperformance.batch2.Services;

import com.sportsperformance.batch2.DTO.CreateEventDTO;
import com.sportsperformance.batch2.Repositories.AthleteRepository;
import com.sportsperformance.batch2.Repositories.EventRepository;
import com.sportsperformance.batch2.Repositories.MeetRepository;
import com.sportsperformance.batch2.Repositories.RegistrationRepository;
import com.sportsperformance.batch2.models.Athlete;
import com.sportsperformance.batch2.models.Event;
import com.sportsperformance.batch2.models.Meet;
import com.sportsperformance.batch2.models.Registration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

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
}
