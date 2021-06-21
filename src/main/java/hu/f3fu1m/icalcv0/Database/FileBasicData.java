package hu.f3fu1m.icalcv0.Database;

public class FileBasicData {
    private int id;
    private String name;

    public FileBasicData() {
    }

    public FileBasicData(int id,String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "FileBasicData{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
