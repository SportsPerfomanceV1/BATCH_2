package com.sportsperformance.batch2.Services;

import com.sportsperformance.batch2.DTO.*;
import com.sportsperformance.batch2.Repositories.*;
import com.sportsperformance.batch2.models.*;
import com.sportsperformance.batch2.util.ImageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.PrivateKey;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CoachService {

    @Autowired
    private CoachRepository coachRepository;

    // Get all coaches
    public List<CoachSummaryDTO> getAllCoaches() {
        return coachRepository.findAll()
                .stream()
                .map(coach -> {
                    CoachSummaryDTO summary = new CoachSummaryDTO();
                    summary.setCoachId(coach.getCoachId());
                    summary.setFirstName(coach.getFirstName());
                    summary.setLastName(coach.getLastName());
                    summary.setImageBase64(ImageUtil.convertToBase64(coach.getImage()));
                    return summary;
                })
                .collect(Collectors.toList());
    }

    // Get coach by ID
    public CoachDTO getCoachById(Long id) {
        Coach coach = coachRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Coach not found"));

        CoachDTO dto = new CoachDTO();
        dto.setCoachId(coach.getCoachId());
        dto.setFirstName(coach.getFirstName());
        dto.setLastName(coach.getLastName());
        dto.setImageBase64(ImageUtil.convertToBase64(coach.getImage()));
        return dto;
    }

    public CoachDTO getCoachProfile() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = userDetails.getUsername();

        // Find the coach by username
        Coach coach = coachRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Coach not found with username: " + username));

        CoachDTO dto = new CoachDTO();
        dto.setCoachId(coach.getCoachId());
        dto.setFirstName(coach.getFirstName());
        dto.setLastName(coach.getLastName());
        dto.setImageBase64(ImageUtil.convertToBase64(coach.getImage()));
        return dto;
    }

    // Update coach profile by username
    public CoachDTO updateCoachProfileByUsername(CoachDTO coachDTO) throws IOException {
        // Fetch username from security context
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = userDetails.getUsername();

        // Find the coach by username
        Coach coach = coachRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Coach not found with username: " + username));

        // Update coach details
        coach.setFirstName(coachDTO.getFirstName());
        coach.setLastName(coachDTO.getLastName());

        if (coachDTO.getImageFile() != null && !coachDTO.getImageFile().isEmpty()) {
            coach.setImage(coachDTO.getImageFile().getBytes());
        }

        coachRepository.save(coach);

        // Prepare response DTO
        CoachDTO updatedCoachDTO = new CoachDTO();
//        updatedCoachDTO.setCoachId(coach.getCoachId());
        updatedCoachDTO.setFirstName(coach.getFirstName());
        updatedCoachDTO.setLastName(coach.getLastName());
        updatedCoachDTO.setImageBase64(coach.getImage() != null ?
                Base64.getEncoder().encodeToString(coach.getImage()) : null);

        return updatedCoachDTO;
    }

    @Autowired
    private AchievementRepository achievementRepository;



    // Fetch username from SecurityContext
    private String getLoggedInUsername() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userDetails.getUsername();
    }

    // Add an achievement for the logged-in coach
    public AchievementDTO addAchievement(AchievementDTO achievementDTO) {
        String username = getLoggedInUsername();

        Coach coach = coachRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Coach not found with username: " + username));

        Achievement achievement = new Achievement();
        achievement.setCoach(coach);
        achievement.setTitle(achievementDTO.getTitle());
        achievement.setDescription(achievementDTO.getDescription());
        achievement.setAchievedDate(achievementDTO.getAchievedDate());

        Achievement savedAchievement = achievementRepository.save(achievement);

        return mapToDTO(savedAchievement);
    }

    // Update an achievement
    public AchievementDTO updateAchievement(Long achievementId, AchievementDTO achievementDTO) {
        Achievement achievement = achievementRepository.findById(achievementId)
                .orElseThrow(() -> new RuntimeException("Achievement not found with ID: " + achievementId));

        achievement.setTitle(achievementDTO.getTitle());
        achievement.setDescription(achievementDTO.getDescription());
        achievement.setAchievedDate(achievementDTO.getAchievedDate());

        Achievement updatedAchievement = achievementRepository.save(achievement);

        return mapToDTO(updatedAchievement);
    }

    // Delete an achievement
    public void deleteAchievement(Long achievementId) {
        Achievement achievement = achievementRepository.findById(achievementId)
                .orElseThrow(() -> new RuntimeException("Achievement not found with ID: " + achievementId));

        achievementRepository.delete(achievement);
    }

    // Get achievement by ID
    public AchievementDTO getAchievementById(Long achievementId) {
        Achievement achievement = achievementRepository.findById(achievementId)
                .orElseThrow(() -> new RuntimeException("Achievement not found with ID: " + achievementId));

        return mapToDTO(achievement);
    }

    // Get all achievements for the logged-in coach
    public List<AchievementDTO> getAllAchievementsByLoggedInCoach() {
        String username = getLoggedInUsername();

        Coach coach = coachRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Coach not found with username: " + username));

        return achievementRepository.findByCoach(coach).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // Get all achievements by coachId
    public List<AchievementDTO> getAllAchievementsByCoachId(Long coachId) {
        Coach coach = coachRepository.findById(coachId)
                .orElseThrow(() -> new RuntimeException("Coach not found with ID: " + coachId));

        return achievementRepository.findByCoach(coach).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // Utility: Map Achievement entity to DTO
    private AchievementDTO mapToDTO(Achievement achievement) {
        AchievementDTO achievementDTO = new AchievementDTO();
        achievementDTO.setAchievementId(achievement.getAchievementId());
        achievementDTO.setTitle(achievement.getTitle());
        achievementDTO.setDescription(achievement.getDescription());
        achievementDTO.setAchievedDate(achievement.getAchievedDate());
        return achievementDTO;
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

    @Autowired
    private AthleteRepository athleteRepository;

    @Autowired
    private AssistanceRequestRepository assistanceRequestRepository;

    // Accept a request
    public void acceptRequest(Long requestId) {
        AssistanceRequest request = assistanceRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found with ID: " + requestId));

        request.setStatus("Accepted");

        Athlete athlete = request.getAthlete();
        athlete.setCoach(request.getCoach());

        athleteRepository.save(athlete);
        assistanceRequestRepository.save(request);
    }

    public void rejectRequest(Long requestId) {
        AssistanceRequest request = assistanceRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found with ID: " + requestId));

        request.setStatus("Rejected");

        assistanceRequestRepository.save(request);
    }

    public List<AssistanceRequestDTO> getRequestsByLoggedInCoach() {
        String username = getLoggedInUsername();

        Coach coach = coachRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Coach not found with username: " + username));

        return assistanceRequestRepository.findByCoach(coach).stream()
                .map(request -> {
                    AssistanceRequestDTO dto = mapToDTO(request);
                    dto.setAthleteId((Long) request.getAthlete().getAthleteId()); // Include athleteId in the response
                    return dto;
                })
                .collect(Collectors.toList());
    }


    @Autowired
    private WeightPlanRepository weightPlanRepository;

    public WeightPlanDTO createWeightPlan(WeightPlanDTO dto) {
        Athlete athlete = athleteRepository.findById(dto.getAthleteId())
                .orElseThrow(() -> new RuntimeException("Athlete not found"));

        WeightPlan weightPlan = new WeightPlan();
        weightPlan.setAthlete(athlete);
        weightPlan.setStartWeight(dto.getStartWeight());
        weightPlan.setTargetWeight(dto.getTargetWeight());
        weightPlan.setPreference(dto.getPreference());
        weightPlan.setDailyCalorieGoal(dto.getDailyCalorieGoal());

        weightPlan = weightPlanRepository.save(weightPlan);

        return mapToDTO(weightPlan);
    }

    public List<WeightPlanDTO> getWeightPlansByAthlete(Long athleteId) {
        return weightPlanRepository.findByAthleteAthleteId(athleteId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public WeightPlanDTO updateWeightPlan(Long planId, WeightPlanDTO dto) {
        WeightPlan weightPlan = weightPlanRepository.findById(planId)
                .orElseThrow(() -> new RuntimeException("WeightPlan not found"));

        weightPlan.setStartWeight(dto.getStartWeight());
        weightPlan.setTargetWeight(dto.getTargetWeight());
        weightPlan.setPreference(dto.getPreference());
        weightPlan.setDailyCalorieGoal(dto.getDailyCalorieGoal());

        weightPlan = weightPlanRepository.save(weightPlan);

        return mapToDTO(weightPlan);
    }

    public void deleteWeightPlan(Long planId) {
        weightPlanRepository.deleteById(planId);
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

    @Autowired
    private DailyDietRepository dailyDietRepository;

    public DailyDietDTO createDailyDiet(DailyDietDTO dto) {
        Athlete athlete = athleteRepository.findById(dto.getAthleteId())
                .orElseThrow(() -> new RuntimeException("Athlete not found"));

        DailyDiet dailyDiet = new DailyDiet();
        dailyDiet.setAthlete(athlete);
        dailyDiet.setDate(dto.getDate());
        dailyDiet.setCalories(dto.getCalories());
        dailyDiet.setCurrentWeight(dto.getCurrentWeight());

        if (dto.getWeightPlanId() != null) {
            WeightPlan weightPlan = weightPlanRepository.findById(dto.getWeightPlanId())
                    .orElseThrow(() -> new RuntimeException("WeightPlan not found"));
            dailyDiet.setWeightPlan(weightPlan);
        }

        dailyDiet = dailyDietRepository.save(dailyDiet);

        return mapToDTO(dailyDiet);
    }

    public List<DailyDietDTO> getDailyDietsByAthlete(Long athleteId) {
        return dailyDietRepository.findByAthleteAthleteIdOrderByDateDesc(athleteId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public void deleteDailyDiet(Long dietId) {
        dailyDietRepository.deleteById(dietId);
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

}
