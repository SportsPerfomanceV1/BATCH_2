package com.sportsperformance.batch2.Controllers;

import com.sportsperformance.batch2.DTO.*;
import com.sportsperformance.batch2.Repositories.AssistanceRequestRepository;
import com.sportsperformance.batch2.Repositories.AthleteRepository;
import com.sportsperformance.batch2.Repositories.WeightPlanRepository;
import com.sportsperformance.batch2.Services.CoachService;
import com.sportsperformance.batch2.models.AssistanceRequest;
import com.sportsperformance.batch2.models.Athlete;
import com.sportsperformance.batch2.models.Coach;
import com.sportsperformance.batch2.Repositories.CoachRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/coach")
public class CoachController {

    @Autowired
    private CoachService coachService;

    // Get all coaches
    @GetMapping("/getallcoach")
    public ResponseEntity<List<CoachSummaryDTO>> getAllCoaches() {
        return ResponseEntity.ok(coachService.getAllCoaches());
    }

    // Get a specific coach by ID
    @GetMapping("/{id}")
    public ResponseEntity<CoachDTO> getCoachById(@PathVariable Long id) {
        return ResponseEntity.ok(coachService.getCoachById(id));
    }

    @GetMapping("/profile")
    public ResponseEntity<CoachDTO> getCoaachProfile() {
        return ResponseEntity.ok(coachService.getCoachProfile());
    }




    // Update coach profile
    @PutMapping(value = "/profile", consumes = "multipart/form-data")
    public ResponseEntity<CoachDTO> updateCoachProfile(
            @ModelAttribute CoachDTO coachDTO) throws IOException {

//        if (coachDTO.getImageFile() != null) {
//            coachDTO.setImageFile(imageFile);
//        }
        return ResponseEntity.ok(coachService.updateCoachProfileByUsername(coachDTO));
    }




    // Create an achievement
    @PostMapping("/addAchievement")
    public ResponseEntity<AchievementDTO> addAchievement(@RequestBody AchievementDTO achievementDTO) {
        return ResponseEntity.ok(coachService.addAchievement(achievementDTO));
    }

    // Update an achievement
    @PutMapping("/achievement/{achievementId}")
    public ResponseEntity<AchievementDTO> updateAchievement(
            @PathVariable Long achievementId,
            @RequestBody AchievementDTO achievementDTO) {
        return ResponseEntity.ok(coachService.updateAchievement(achievementId, achievementDTO));
    }

    // Delete an achievement
    @DeleteMapping("/achievement/{achievementId}")
    public ResponseEntity<Void> deleteAchievement(@PathVariable Long achievementId) {
        coachService.deleteAchievement(achievementId);
        return ResponseEntity.noContent().build();
    }

    // Get achievement by ID
    @GetMapping("/achievement/{achievementId}")
    public ResponseEntity<AchievementDTO> getAchievementById(@PathVariable Long achievementId) {
        return ResponseEntity.ok(coachService.getAchievementById(achievementId));
    }

    // Get all achievements by logged-in coach
    @GetMapping("/achievements")
    public ResponseEntity<List<AchievementDTO>> getAllAchievementsByLoggedInCoach() {
        return ResponseEntity.ok(coachService.getAllAchievementsByLoggedInCoach());
    }

    // Get all achievements by coachId
    @GetMapping("achievements/coach/{coachId}")
    public ResponseEntity<List<AchievementDTO>> getAllAchievementsByCoachId(@PathVariable Long coachId) {
        return ResponseEntity.ok(coachService.getAllAchievementsByCoachId(coachId));
    }


    @Autowired
    private AssistanceRequestRepository assistanceRequestRepository;

    @Autowired
    private AthleteRepository athleteRepository;

    // Get all requests for the logged-in coach
    @GetMapping("/getallassistancereq")
    public ResponseEntity<List<AssistanceRequestDTO>> getRequestsByLoggedInCoach() {
        return ResponseEntity.ok(coachService.getRequestsByLoggedInCoach());
    }

    // Accept a request
    @PutMapping("assistance/{requestId}/accept")
    public ResponseEntity<Void> acceptRequest(@PathVariable Long requestId) {
        coachService.acceptRequest(requestId);
        return ResponseEntity.noContent().build();
    }

    // Reject a request
    @PutMapping("assistance/{requestId}/reject")
    public ResponseEntity<Void> rejectRequest(@PathVariable Long requestId) {
        coachService.rejectRequest(requestId);
        return ResponseEntity.noContent().build();
    }


    @Autowired
    private WeightPlanRepository weightPlanRepository;

    @PostMapping("/createplan")
    public WeightPlanDTO createWeightPlan(@RequestBody WeightPlanDTO dto) {
        return coachService.createWeightPlan(dto);
    }

    @PutMapping("updateplan/{planId}")
    public WeightPlanDTO updateWeightPlan(@PathVariable Long planId, @RequestBody WeightPlanDTO dto) {
        return coachService.updateWeightPlan(planId, dto);
    }

    @DeleteMapping("deleteplan/{planId}")
    public void deleteWeightPlan(@PathVariable Long planId) {
        coachService.deleteWeightPlan(planId);
    }

    @PostMapping("/creatediet")
    public DailyDietDTO createDailyDiet(@RequestBody DailyDietDTO dto) {
        return coachService.createDailyDiet(dto);
    }

    @DeleteMapping("deletediet/{dietId}")
    public void deleteDailyDiet(@PathVariable Long dietId) {
        coachService.deleteDailyDiet(dietId);
    }


    @GetMapping("weightplan/athlete/{athleteId}")
    public WeightPlanDTO getWeightPlans(@PathVariable Long athleteId) {
        return coachService.getWeightPlanByAthlete(athleteId);
    }

    @GetMapping("diet/athlete/{athleteId}")
    public List<DailyDietDTO> getDailyDiets(@PathVariable Long athleteId) {
        return coachService.getDailyDietsByAthlete(athleteId);
    }





}