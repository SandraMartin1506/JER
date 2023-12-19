import java.util.concurrent.atomic.AtomicLong;

public class User {
    private static AtomicLong idGenerator = new AtomicLong(0);

    private long id;
    private String name;
    private String password;
    private int victoryP1;
    private int victoryP2;
    private int totalVictories;

    // Constructor
    public User(String name, String password) {
        this.id = idGenerator.incrementAndGet();
        this.name = name;
        this.password = password;
        this.victoryP1 = 0;
        this.victoryP2 = 0;
        this.totalVictories = 0;
    }

    // Getters
    public long getId() {
        return id;
    }

    public String GetUserName() {
        return name;
    }

    public String GetPassword() {
        return password;
    }

    public int GetVictoryP1() {
        return victoryP1;
    }

    public int GetVictoryP2() {
        return victoryP2;
    }

    // Setters
    public void AddVictoryP1() {
        victoryP1++;
        totalVictories++;
    }

    public void AddVictoryP2() {
        victoryP2++;
        totalVictories++;
    }
	public void setId(long id) {
		this.id = id;
	}

}
