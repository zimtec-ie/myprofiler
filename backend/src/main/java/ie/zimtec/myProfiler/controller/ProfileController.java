package ie.zimtec.myProfiler.controller;

import ie.zimtec.myProfiler.exception.ProfileNotFoundException;
import ie.zimtec.myProfiler.model.Profile;
import ie.zimtec.myProfiler.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/* Dev tool Part 1 of 3:
 * Log the IP address and device of the user who logged in 
 * Can remove later
 * 
 * */
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import jakarta.servlet.http.HttpServletRequest;
/* end */


@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://zimtec.ie"})
public class ProfileController {
	
	/* Dev tool Part 2 of 3:
	 * Log the IP address and device of anyone who logged in to view the web application
	 * Can remove later
	 * 
	 * */
	private static final Logger logger = LoggerFactory.getLogger(ProfileController.class);
	@Autowired
    private HttpServletRequest request;
	/* end */
	
    @Autowired
    private ProfileRepository profileRepository;
    
    /* Generic Profile API's */
    @PostMapping("/profile")
    Profile newProfile(@RequestBody Profile newProfile) {
        return profileRepository.save(newProfile);
    }

    @GetMapping("/login")
    List<Profile> checkLoginDetails() {
    	/* Dev tool Part 3 of 3:
    	 * Log the IP address and device of the user who logged in 
    	 * Can remove later
    	 * 
    	 * */
    	String ipAddress = request.getRemoteAddr(); 
    	String userAgent = request.getHeader("User-Agent");
        logger.info("Someone has logged in from IP: " + ipAddress + " using device: " + userAgent);
        /* end */
        
        return profileRepository.findAll();
    }
    
    @GetMapping("/profiles")
    List<Profile> getAllProfiles() {        
        return profileRepository.findAll();
    }

    @GetMapping("/profile/{id}")
    Profile getProfileById(@PathVariable Long id) {
        return profileRepository.findById(id)
                .orElseThrow(() -> new ProfileNotFoundException(id));
    }

    @PutMapping("/profile/{id}")
    Profile updateProfile(@RequestBody Profile newProfile, @PathVariable Long id) {
        return profileRepository.findById(id)
                .map(profile -> {
                	profile.setPrivilege(newProfile.getPrivilege());
                	profile.setName(newProfile.getName());                	      	
                	profile.setEmail(newProfile.getEmail());
                	profile.setPassword(newProfile.getPassword());
                	profile.setImage(newProfile.getImage());
                    return profileRepository.save(profile);
                }).orElseThrow(() -> new ProfileNotFoundException(id));
    }

    @DeleteMapping("/profile/{id}")
    String deleteProfile(@PathVariable Long id){
        if(!profileRepository.existsById(id)){
            throw new ProfileNotFoundException(id);
        }
        profileRepository.deleteById(id);
        return  "Profile with id "+id+" has been deleted successfully.";
    }
    
    @PutMapping("/profile/{id}/image")
    Profile updateProfileImage(@PathVariable Long id, @RequestBody byte[] imageBytes) {
        return profileRepository.findById(id)
                .map(profile -> {
                    profile.setImage(imageBytes);
                    return profileRepository.save(profile);
                }).orElseThrow(() -> new ProfileNotFoundException(id));
    }
    
    @GetMapping("/profile/{id}/image")
    byte[] getProfileImage(@PathVariable Long id) {
        return profileRepository.findById(id)
                .map(profile -> {
                    byte[] image = profile.getImage();
                    if (image == null) {
                        return new byte[0]; 
                    }
                    return image;
                })
                .orElseThrow(() -> new ProfileNotFoundException(id));
    }  
    
    /* Admin Profile API's */
    	/* Welcome Note */
    @GetMapping("/profile/{id}/welcomenote")
	String getWelcomeNote(@PathVariable Long id) {
		return profileRepository.findById(id).map(profile -> {
			String profileName = profile.getName();
			String welcomeNote = profile.getWelcomeNote();
			String defaultNote = "<h1>Welcome " + profileName + ",</h1>\r\n" 
								+ "<p>Follow these steps to start:</p>\r\n"
								+ "<ol>\r\n" 
								+ 	"<li>Click on \"Add Profile\" to add a new profile.</li>\r\n"
								+ 	"<li>Click on \"Profile List\" to view all profiles.</li>\r\n" 
								+ "</ol>"
			                    + "<p style=\"text-align: center;\"><b>Happy profiling!</b></p>";
			if (welcomeNote == null) {
				return defaultNote;
			}
			return welcomeNote;
		}).orElseThrow(() -> new ProfileNotFoundException(id));
	}

	@PutMapping("/profile/{id}/welcomenote")
	Profile updateWelcomeNote(@PathVariable Long id, @RequestBody String welcomeNote) {
		return profileRepository.findById(id).map(profile -> {
			profile.setWelcomeNote(welcomeNote);
			return profileRepository.save(profile);
		}).orElseThrow(() -> new ProfileNotFoundException(id));
	}
	
	@DeleteMapping("/profile/{id}/welcomenote")
	String deleteWelcomeNote(@PathVariable Long id) {
        Profile profile = profileRepository.findById(id).orElseThrow(() -> new ProfileNotFoundException(id));
        profile.setWelcomeNote(null);
        profileRepository.save(profile);
        return  "The Welcome Note for Profile "+id+" has been deleted successfully.";
    }

	/* To-Do List */
	@GetMapping("/profile/{id}/todolist")
	String getToDoList(@PathVariable Long id) {
		return profileRepository.findById(id).map(profile -> {
			String toDoList = profile.getToDoList();
			String defaultList = "<h1>To-Do List</h1>\r\n" 
								+ "<ul>\r\n" 
								+ 	"<li>Add Profile for new employee: standard profile</li>\r\n"
								+ 	"<li>Check profile list for new Manager: update to Admin privileges.</li>\r\n" 
								+ 	"<li>Reset password for user ID 01</li>\r\n"
								+ "</ul>";
			if (toDoList == null) {
				return defaultList;
			}
			return toDoList;
		}).orElseThrow(() -> new ProfileNotFoundException(id));
	}

	@PutMapping("/profile/{id}/todolist")
	Profile updateToDoList(@PathVariable Long id, @RequestBody String toDoList) {
		return profileRepository.findById(id).map(profile -> {
			profile.setToDoList(toDoList);
			return profileRepository.save(profile);
		}).orElseThrow(() -> new ProfileNotFoundException(id));
	}
	
	@DeleteMapping("/profile/{id}/todolist")
	String deleteToDoList(@PathVariable Long id) {
        Profile profile = profileRepository.findById(id).orElseThrow(() -> new ProfileNotFoundException(id));
        profile.setToDoList(null);
        profileRepository.save(profile);
        return  "The To-Do List for Profile "+id+" has been deleted successfully.";
    }
	
	/* Reminder */
	@GetMapping("/profile/{id}/reminder")
	String getReminder(@PathVariable Long id) {
		return profileRepository.findById(id).map(profile -> {
			String reminder = profile.getReminder();
			String noReminder = "";
			if (reminder == null) {
				return noReminder;
			}
			return reminder;
		}).orElseThrow(() -> new ProfileNotFoundException(id));
	}
	
	@PutMapping("/profile/{id}/reminder")
	Profile updateReminder(@PathVariable Long id, @RequestBody String reminder) {
		return profileRepository.findById(id).map(profile -> {
			profile.setReminder(reminder);
			return profileRepository.save(profile);
		}).orElseThrow(() -> new ProfileNotFoundException(id));
	}
	
	@DeleteMapping("/profile/{id}/reminder")
	String deleteReminder(@PathVariable Long id) {
		Profile profile = profileRepository.findById(id).orElseThrow(() -> new ProfileNotFoundException(id));
		profile.setReminder(null);
		profileRepository.save(profile);
		return "The Reminder for Profile " + id + " has been deleted successfully.";
	}

	
}