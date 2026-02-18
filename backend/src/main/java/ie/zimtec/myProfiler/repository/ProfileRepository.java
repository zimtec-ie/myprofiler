package ie.zimtec.myProfiler.repository;

import ie.zimtec.myProfiler.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProfileRepository extends JpaRepository<Profile, Long> {
}
