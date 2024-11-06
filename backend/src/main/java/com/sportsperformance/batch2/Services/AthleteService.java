package com.sportsperformance.batch2.Services;

import com.sportsperformance.batch2.DTO.AthleteProfileDTO;
import com.sportsperformance.batch2.Repositories.AthleteRepository;
import com.sportsperformance.batch2.models.Athlete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.Optional;
import java.util.UUID;

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

    public Athlete getAthleteProfile(Long athleteId) throws Exception {
        Optional<Athlete> athleteOptional = athleteRepository.findById(athleteId);
        if (athleteOptional.isEmpty()) {
            throw new Exception("Athlete with ID " + athleteId + " not found.");
        }
        return athleteOptional.get();
    }

}
