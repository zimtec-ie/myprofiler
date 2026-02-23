package ie.zimtec.myProfiler.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Column;


@Entity
public class Profile {
	
	/* Variables */
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;
    private String privilege;
    private String name;  
    private String email;
    private String password;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;
    
    @Lob
    @Column(columnDefinition = "TEXT")
    private String welcomeNote;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String toDoList;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String reminder;

    
    /* Getter and Setter methods */
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    public String getPrivilege() {
        return privilege;
    }
    
   	public void setPrivilege(String privilege) {
		this.privilege = privilege;
	}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
    
	public String getWelcomeNote() {
		return welcomeNote;
	}

	public void setWelcomeNote(String welcomeNote) {
		this.welcomeNote = welcomeNote;
	}
    
	public String getToDoList() {
		return toDoList;
	}

	public void setToDoList(String toDoList) {
		this.toDoList = toDoList;
	}
    
	public String getReminder() {
		return reminder;
	}
	
	public void setReminder(String reminder) {
		this.reminder = reminder;
	}
	
}

