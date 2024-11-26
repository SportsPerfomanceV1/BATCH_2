package com.sportsperformance.batch2.Services;

import com.sportsperformance.batch2.DTO.*;
import com.sportsperformance.batch2.Repositories.*;
import com.sportsperformance.batch2.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    public void createOrUpdateProfile(String username, AthleteProfileDTO profileDTO) throws Exception {
        Optional<Athlete> athleteOptional = athleteRepository.findByUsername(username);
        Athlete athlete = athleteOptional.orElseThrow(() -> new Exception("Athlete not found"));

        // Set profile details
        athlete.setFirstName(profileDTO.getFirstName());
        athlete.setLastName(profileDTO.getLastName());
        athlete.setBirthDate(profileDTO.getBirthDate());
        athlete.setGender(profileDTO.getGender());
        athlete.setHeight(profileDTO.getHeight());
        athlete.setWeight(profileDTO.getWeight());
        athlete.setCategory(profileDTO.getCategory());
//        athlete.setCoach(profileDTO.getCoachId());

        // Handle image file
        MultipartFile imageFile = profileDTO.getPhotoUrl();
        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                athlete.setPhoto(imageFile.getBytes()); // Store image as a byte array
            } catch (IOException e) {
                throw new Exception("Failed to process image: " + e.getMessage());
            }
        }

        // Save the updated profile
        athleteRepository.save(athlete);
    }

//    private final String uploadDir = "uploads/athlete_profiles/";
//
//    public void createOrUpdateProfile(String username, AthleteProfileDTO profileDTO) throws Exception {
//        Optional<Athlete> athleteOptional = athleteRepository.findByUsername(username);
//        Athlete athlete = athleteOptional.orElseThrow(() -> new Exception("Athlete not found"));
//
//        // Set profile details
//        athlete.setFirstName(profileDTO.getFirstName());
//        athlete.setLastName(profileDTO.getLastName());
//        athlete.setBirthDate(profileDTO.getBirthDate());
//        athlete.setGender(profileDTO.getGender());
//        athlete.setHeight(Float.parseFloat(profileDTO.getHeight()));
//        athlete.setWeight(Float.parseFloat(profileDTO.getWeight()));
//        athlete.setCategory(profileDTO.getCategory());
//
//        // Handle profile picture upload
//        // Handle image file upload
//        MultipartFile imageFile = profileDTO.getPhotoUrl();
//        if (imageFile != null && !imageFile.isEmpty()) {
//            // Create the upload directory if it doesn't exist
//            File directory = new File(uploadDir);
//            if (!directory.exists()) {
//                boolean created = directory.mkdirs();
//                if (!created) {
//                    throw new Exception("Failed to create directory: " + uploadDir);
//                }
//            }
//
//            // Generate a unique filename
//            String fileName = UUID.randomUUID().toString() + "_" + imageFile.getOriginalFilename();
//            File file = new File(directory, fileName); // Create the file object
//
//            // Save the image file using InputStream and Files.copy
//            try (InputStream inputStream = imageFile.getInputStream()) {
//                Files.copy(inputStream, file.toPath(), StandardCopyOption.REPLACE_EXISTING);
//                athlete.setPhotoUrl(file.getAbsolutePath()); // Store the file path in the event
//            } catch (IOException e) {
//                e.printStackTrace(); // Log the exception
//                throw new Exception("Failed to upload image: " + e.getMessage());
//            }
//        }
//
//        // Save the updated profile
//        athleteRepository.save(athlete);
//    }

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

//    // 1. Get All Events
//    public List<Event> getAllEvents() {
//        return eventRepository.findAll();
//    }

//    public List<EventResponseDTO> getAllEvents() {
//        List<Event> events = eventRepository.findAll();
//        return events.stream()
//                .map(this::mapToDTO) // Convert each Event entity to EventResponseDTO
//                .toList();           // Collect results as a List
//    }

    public List<EventResponseDTO> getAvailableEvents(String username) {
        // Fetch athlete by username
        Athlete athlete = athleteRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Athlete not found"));

        // Fetch all events
        List<Event> events = eventRepository.findAll();

        // Fetch all event ids that the athlete has registered for
        List<Integer> registeredEventIds = registrationRepository.findEventIdsByAthleteId(athlete.getAthleteId());

        // Filter out events that the athlete has already registered for
        return events.stream()
                .filter(event -> !registeredEventIds.contains(event.getEventId()))
                .map(this::mapToDTO) // Map Event to DTO
                .toList();
    }






    // 2. Get Registered Events for Athlete
//    public List<Registration> getRegisteredEvents(String username) throws Exception {
//        Athlete athlete = athleteRepository.findByUsername(username)
//                .orElseThrow(() -> new Exception("Athlete not found"));
//
//        List<Registration> registrations = registrationRepository.findByAthlete(athlete);
//        return new ArrayList<>(registrations);
//    }



//    @Autowired
//    private RegistrationRepository registrationRepository;

    public List<RegistrationDTO> getRegisteredEvents(String username) throws Exception {
        // Fetch the athlete by username
        Athlete athlete = athleteRepository.findByUsername(username)
                .orElseThrow(() -> new Exception("Athlete not found"));

        // Get the registrations for the athlete
        List<Registration> registrations = registrationRepository.findByAthlete(athlete);

        // Map to DTOs
        return registrations.stream()
                .map(registration -> {
                    // Convert Athlete to AthleteProfileDTO
                    AthleteProfileDTO athleteProfile = new AthleteProfileDTO();
                    athleteProfile.setFirstName(registration.getAthlete().getFirstName());
                    athleteProfile.setLastName(registration.getAthlete().getLastName());
                    athleteProfile.setBirthDate(registration.getAthlete().getBirthDate());
                    athleteProfile.setGender(registration.getAthlete().getGender());
                    athleteProfile.setHeight(registration.getAthlete().getHeight());
                    athleteProfile.setWeight(registration.getAthlete().getWeight());
                    athleteProfile.setCategory(registration.getAthlete().getCategory());
                    athleteProfile.setPhotoBase64(Arrays.toString(registration.getAthlete().getPhoto()));
                    athleteProfile.setEmail(registration.getAthlete().getEmail());
                    athleteProfile.setUsername(registration.getAthlete().getUsername());


                    // Return a RegistrationDTO with the AthleteProfileDTO included
                    return new RegistrationDTO(
                            registration.getRegistrationId(),
                            registration.getEvent().getEventId(),
                            registration.getAthlete().getAthleteId(),
                            registration.getEvent().getEventTitle(),
                            registration.getRegistrationDate(),
                            registration.getStatus(),
                            registration.getRemarks(),
                            registration.getEvent().getMeetId().getMeetName(),
                            athleteProfile // Pass AthleteProfileDTO here
                    );
                })
                .collect(Collectors.toList());
    }


    private EventResponseDTO mapToDTO(Event event) {
        EventResponseDTO dto = new EventResponseDTO();
        dto.setEventTitle(event.getEventTitle());
        dto.setMeetId(event.getMeetId());
        dto.setCategory(event.getCategory());
        dto.setEventId(event.getEventId());

//        dto.setEventDescription(event.getEventDescription());
        dto.setLocation(event.getLocation());
        dto.setEventDate(event.getEventDate());
        dto.setEventDescription(event.getEventDescription());

        if (event.getImage() != null) {
            dto.setImageBase64(Base64.getEncoder().encodeToString(event.getImage()));
        }

        return dto;
    }
//    @Autowired
//    EventRepository eventRepository;
//    @GetMapping("/events/{id}")
//    public ResponseEntity<EventResponseDTO> getEvent(@PathVariable Long id) {
//        Optional<Event> eventOptional = eventRepository.findById(id);
//        if (eventOptional.isPresent()) {
//            EventResponseDTO dto = mapToDTO(eventOptional.get());
//            return ResponseEntity.ok(dto);
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//        }
//    }

    public void deleteRegistrationById(Long registrationId) {
        if (!registrationRepository.existsById(registrationId)) {
            throw new NoSuchElementException("Registration not found.");
        }
        registrationRepository.deleteById(registrationId);
    }

    @Autowired
    private AssistanceRequestRepository assistanceRequestRepository;



    @Autowired
    private CoachRepository coachRepository;

    // Fetch the logged-in user's username
    private String getLoggedInUsername() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userDetails.getUsername();
    }


    public AssistanceRequestDTO createRequest(AssistanceRequestDTO dto) {
        String username = getLoggedInUsername();

        Athlete athlete = athleteRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Athlete not found with username: " + username));

        Coach coach = coachRepository.findById((long) dto.getCoachId())
                .orElseThrow(() -> new RuntimeException("Coach not found with ID: " + dto.getCoachId()));

        AssistanceRequest request = new AssistanceRequest();
        request.setAthlete(athlete);
        request.setCoach(coach);
        request.setStatus("Pending");
        request.setRequestDate(new Date());
        request.setRemarks(dto.getRemarks());

        AssistanceRequest savedRequest = assistanceRequestRepository.save(request);

        return mapToDTO(savedRequest);
    }


    private AssistanceRequestDTO mapToDTO(AssistanceRequest request) {
        AssistanceRequestDTO dto = new AssistanceRequestDTO();
        dto.setAssistanceRequestId(request.getAssistanceRequestId());
        dto.setCoachId((Long) request.getCoach().getCoachId());
        dto.setAthleteId((Long) request.getAthlete().getAthleteId()); // Set athleteId
        dto.setStatus(request.getStatus());
        dto.setRemarks(request.getRemarks());
        dto.setRequestDate(request.getRequestDate());
        return dto;
    }

    public List<AssistanceRequestDTO> getRequestsByLoggedInAthlete() {
        String username = getLoggedInUsername();

        Athlete athlete = athleteRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Athlete not found with username: " + username));

        return assistanceRequestRepository.findByAthlete(athlete).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }


    @Autowired
    private WeightPlanRepository weightPlanRepository;

    @Autowired
    private DailyDietRepository dailyDietRepository;

//    public List<DailyDietDTO> getDailyDietsByLoggedInAthlete(String username) {
//        Athlete athlete = athleteRepository.findByUsername(username)
//                .orElseThrow(() -> new RuntimeException("Athlete not found"));
//
//        return dailyDietRepository.findByAthleteAthleteIdOrderByDateDesc(athlete.getAthleteId()).stream()
//                .map(this::mapToDTO)
//                .collect(Collectors.toList());
//    }
//
//    public List<WeightPlanDTO> getWeightPlansByLoggedInAthlete(String username) {
//        Athlete athlete = athleteRepository.findByUsername(username)
//                .orElseThrow(() -> new RuntimeException("Athlete not found"));
//
//        return weightPlanRepository.findByAthleteAthleteId(athlete.getAthleteId()).stream()
//                .map(this::mapToDTO)
//                .collect(Collectors.toList());
//    }
public List<DailyDietDTO> getDailyDietsByLoggedInAthlete(String username) {
    Athlete athlete = athleteRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("Athlete not found"));

    return dailyDietRepository.findByAthleteAthleteIdOrderByDateDesc(athlete.getAthleteId()).stream()
            .map(this::mapToDTO)
            .collect(Collectors.toList());
}


    public WeightPlanDTO getWeightPlanByLoggedInAthlete(String username) {
        Athlete athlete = athleteRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Athlete not found"));

        WeightPlan weightPlan = athlete.getWeightPlan();
        if (weightPlan == null) {
            throw new RuntimeException("No WeightPlan found for the athlete");
        }

        return mapToDTO(weightPlan);
    }


    private DailyDietDTO mapToDTO(DailyDiet dailyDiet) {
        DailyDietDTO dto = new DailyDietDTO();
        dto.setDietId(dailyDiet.getDietId());
        dto.setAthleteId(dailyDiet.getAthlete().getAthleteId());
        dto.setDate(dailyDiet.getDate());
        dto.setCalories(dailyDiet.getCalories());
        dto.setCurrentWeight(dailyDiet.getCurrentWeight());
        dto.setWeightPlanId(dailyDiet.getWeightPlan() != null ? dailyDiet.getWeightPlan().getPlanId() : null);
        return dto;
    }

    private WeightPlanDTO mapToDTO(WeightPlan weightPlan) {
        WeightPlanDTO dto = new WeightPlanDTO();
        dto.setPlanId(weightPlan.getPlanId());
        dto.setAthleteId(weightPlan.getAthlete().getAthleteId());
        dto.setStartWeight(weightPlan.getStartWeight());
        dto.setTargetWeight(weightPlan.getTargetWeight());
        dto.setPreference(weightPlan.getPreference());
        dto.setDailyCalorieGoal(weightPlan.getDailyCalorieGoal());
        return dto;
    }






    // Result

    @Autowired
    EventResultRepository eventResultRepository;

//    public List<EventResultDTO> getTopPerformanceByLoggedInAthlete(String username) {
//        List<EventResult> results = eventResultRepository.findByAthleteUsernameOrderByEvent_EventDateDesc(username);
//        return results.stream()
//                .map(this::toEventResultDTO)
//                .collect(Collectors.toList());
//    }

    public List<EventResultDTO> getTopPerformanceByLoggedInAthlete(String username) {
        List<EventResult> results = eventResultRepository.findByAthleteUsernameOrderByEvent_EventDateDesc(username);
        return results.stream()
                .map(this::toEventResultDTO) // Include eventName and meetName mapping
                .collect(Collectors.toList());
    }


    public List<EventResultDTO> getResultsByAthleteId(Long athleteId) {
        List<EventResult> results = eventResultRepository.findByAthleteId(athleteId);
        return results.stream()
                .map(this::toEventResultDTO)
                .collect(Collectors.toList());
    }

    public List<EventResultDTO> getResultsByEventId(Integer eventId) {
        List<EventResult> results = eventResultRepository.findByEventId(eventId);
        return results.stream()
                .map(this::toEventResultDTO)
                .collect(Collectors.toList());
    }

//    public EventResultDTO getResultByAthleteIdAndEventId(Long athleteId, Integer eventId) {
//        EventResult result = eventResultRepository.findByAthleteIdAndEventId(athleteId, eventId)
//                .orElseThrow(() -> new RuntimeException("Result not found"));
//        return toEventResultDTO(result);
//    }

    public EventResultDTO getResultByEventId(Integer eventId) {
        // Get the current logged-in user (assuming the username is stored in the security context)
        String username = getLoggedInUsername();  // Assuming username is used to identify the athlete

        // Fetch the athlete using the username
        Athlete athlete = athleteRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Athlete not found"));

        // Fetch the result for the athlete and event
        EventResult result = eventResultRepository.findByAthleteIdAndEventId(athlete.getAthleteId(), eventId)
                .orElseThrow(() -> new RuntimeException("Result not found"));

        return toEventResultDTO(result);
    }

    public List<EventResultDTO> getLeaderboardByEventId(Integer eventId) {
        List<EventResultDTO> leaderboard = getResultsByEventId(eventId);

        if (leaderboard == null || leaderboard.isEmpty()) {
            // You can return an empty list if no leaderboard data is found
            return Collections.emptyList();
        }

        return leaderboard;
    }

    private EventResultDTO toEventResultDTO(EventResult result) {
        EventResultDTO dto = new EventResultDTO();
        dto.setAthleteId(result.getAthlete().getAthleteId());
        dto.setScore(result.getScore());
        dto.setEventDate(result.getEvent().getEventDate());
        dto.setComment(result.getComment());
        dto.setAthleteName(result.getAthlete().getFirstName() + " " + result.getAthlete().getLastName());
        dto.setEventName(result.getEvent().getEventTitle()); // Map event name
        dto.setMeetName(result.getEvent().getMeetId().getMeetName());   // Map meet name
        return dto;
    }

    public List<EventResultDTO> getTop5PerformancesByLoggedInAthlete(String username) {
        Pageable top5 = PageRequest.of(0, 5); // Fetch only 5 results
        List<EventResult> results = eventResultRepository.findTop5ByAthlete_UsernameOrderByScoreDesc(username, top5);
        return results.stream()
                .map(this::toEventResultDTO)
                .collect(Collectors.toList());
    }



    public EventResultDTO getTopPerformanceByAthleteId(Long athleteId) {
        List<EventResult> results = eventResultRepository.findTopPerformanceByAthleteId(athleteId);

        if (results.isEmpty()) {
            throw new RuntimeException("No performance found for the athlete with ID: " + athleteId);
        }

        // Fetch the top performance (highest score)
        EventResult topPerformance = results.get(0);

        return toEventResultDTO(topPerformance);
    }

    public List<EventResultDTO> getAllResultsByLoggedInAthlete(String username, int page, int size) {
        Pageable pageable = PageRequest.of(page, size); // Pagination parameters

        List<EventResult> results = eventResultRepository.findAllByAthleteUsernameOrderByEventDateDesc(username, pageable);
        if (results.isEmpty()) {
            throw new RuntimeException("No performance");
        }
        return results.stream()
                .map(this::toEventResultDTO)
                .collect(Collectors.toList());
    }


    public List<EventResponseDTO> getApprovedRegistrationsWithoutResults(String username) {
        // Get the current date
        Date currentDate = new Date();

        // Fetch the athlete using the username
        Athlete athlete = athleteRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Athlete not found"));

        // Fetch events based on approved registrations, past date, and no result
        List<Registration> approvedRegistrations = registrationRepository.findByAthlete_AthleteIdAndStatus(athlete.getAthleteId(), "Approved");

        return approvedRegistrations.stream()
                .filter(reg -> reg.getEvent().getEventDate().before(currentDate) &&
                        eventResultRepository.findByEventAndAthlete(reg.getEvent(), reg.getAthlete()).isEmpty())
                .map(reg -> {
                    Event event = reg.getEvent();
                    EventResponseDTO dto = new EventResponseDTO();
                    dto.setEventTitle(event.getEventTitle());
                    dto.setEventId(event.getEventId());
                    dto.setCategory(event.getCategory());
                    dto.setLocation(event.getLocation());
                    dto.setEventDate(event.getEventDate());
                    dto.setEventDescription(event.getEventDescription());
                    dto.setMeetId(event.getMeetId());
                    if (event.getImage() != null) {
                        dto.setImageBase64(Base64.getEncoder().encodeToString(event.getImage()));
                    } else {
                        dto.setImageBase64(null); // Or set a default placeholder image if applicable
                    }

                    dto.setMeetName(event.getMeetId().getMeetName());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    public List<EventResponseDTO> getApprovedRegistrationsWithResults(String username) {
        // Get the current date
        Date currentDate = new Date();

        // Fetch the athlete using the username
        Athlete athlete = athleteRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Athlete not found"));

        // Fetch events based on approved registrations, past date, and published results
        List<Registration> approvedRegistrations = registrationRepository.findByAthlete_AthleteIdAndStatus(athlete.getAthleteId(), "Approved");

        return approvedRegistrations.stream()
                .filter(reg -> reg.getEvent().getEventDate().before(currentDate) &&
                        !eventResultRepository.findByEventAndAthlete(reg.getEvent(), reg.getAthlete()).isEmpty())
                .map(reg -> {
                    Event event = reg.getEvent();
                    EventResponseDTO dto = new EventResponseDTO();
                    dto.setEventTitle(event.getEventTitle());
                    dto.setEventId(event.getEventId());
                    dto.setCategory(event.getCategory());
                    dto.setLocation(event.getLocation());
                    dto.setEventDate(event.getEventDate());
                    dto.setEventDescription(event.getEventDescription());
                    dto.setMeetId(event.getMeetId());
                    if (event.getImage() != null) {
                        dto.setImageBase64(Base64.getEncoder().encodeToString(event.getImage()));
                    } else {
                        dto.setImageBase64(null); // Or set a default placeholder image if applicable
                    }

                    dto.setMeetName(event.getMeetId().getMeetName());
                    return dto;
                })
                .collect(Collectors.toList());
    }




}
