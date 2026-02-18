package ie.zimtec.myProfiler.exception;

public class ProfileNotFoundException extends RuntimeException{
  
	private static final long serialVersionUID = 1L;

	public ProfileNotFoundException(Long id){
        super("Could not found the profile with id "+ id);
    }
}
