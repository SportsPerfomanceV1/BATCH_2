package com.sportsperformance.batch2.Services;

import com.sportsperformance.batch2.DTO.AthleteProfileDTO;
import com.sportsperformance.batch2.DTO.RegistrationRequestDTO;
import com.sportsperformance.batch2.Repositories.AthleteRepository;
import com.sportsperformance.batch2.Repositories.EventRepository;
import com.sportsperformance.batch2.Repositories.RegistrationRepository;
import com.sportsperformance.batch2.models.Athlete;
import com.sportsperformance.batch2.models.Registration;
import com.sportsperformance.batch2.models.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AthleteService {

    @Autowired
    private AthleteRepository athleteRepository;
    private final String uploadDir = "uploads/athlete_profiles/";

    public void createOrUpdateProfile(String username, AthleteProfileDTO profileDTO) throws Exception {
        Optional<Athlete> athleteOptional = athleteRepository.findByUsername(username);
        Athlete athlete = athleteOptional.orElseThrow(() -> new Exception("Athlete not found"));

        // Set profile details
        athlete.setFirstName(profileDTO.getFirstName());
        athlete.setLastName(profileDTO.getLastName());
        athlete.setBirthDate(profileDTO.getBirthDate());
        athlete.setGender(profileDTO.getGender());
        athlete.setHeight(Float.parseFloat(profileDTO.getHeight()));
        athlete.setWeight(Float.parseFloat(profileDTO.getWeight()));
        athlete.setCategory(profileDTO.getCategory());

        // Handle profile picture upload
        // Handle image file upload
        MultipartFile imageFile = profileDTO.getPhotoUrl();
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
                athlete.setPhotoUrl(file.getAbsolutePath()); // Store the file path in the event
            } catch (IOException e) {
                e.printStackTrace(); // Log the exception
                throw new Exception("Failed to upload image: " + e.getMessage());
            }
        }

        // Save the updated profile
        athleteRepository.save(athlete);
    }

    public Athlete getAthleteProfile(String athleteId) throws Exception {
        Optional<Athlete> athleteOptional = athleteRepository.findByUsername(athleteId);
        if (athleteOptional.isEmpty()) {
            throw new Exception("Athlete with ID " + athleteId + " not found.");
        }
        return athleteOptional.get();
    }
    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private RegistrationRepository registrationRepository;

    public void registerForEvent(String username, RegistrationRequestDTO requestDTO, Long eventId) throws Exception {
        // Find athlete by username
        Athlete athlete = athleteRepository.findByUsername(username)
                .orElseThrow(() -> new Exception("Athlete not found with username: " + username));

        // Find the event by eventId

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new Exception("Event not found with ID: " + eventId));

        // Create a new registration
        Registration registration = new Registration();
        registration.setAthlete(athlete);
        registration.setEvent(event);
        registration.setRegistrationDate(new Date());
        registration.setStatus("Pending"); // Initially pending
        registration.setRemarks(requestDTO.getRemarks());

        // Save the registration
        registrationRepository.save(registration);
    }

    // 1. Get All Events
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // 2. Get Registered Events for Athlete
    public List<Registration> getRegisteredEvents(String username) throws Exception {
        Athlete athlete = athleteRepository.findByUsername(username)
                .orElseThrow(() -> new Exception("Athlete not found"));

        List<Registration> registrations = registrationRepository.findByAthlete(athlete);
        return new ArrayList<>(registrations);
    }

}
