package hu.f3fu1m.icalcv0.Database;

public class EntitiesBasicData {
    private int id;
    private int fileIdinFileBasicData;
    private String type;

    public EntitiesBasicData() {
    }

    public EntitiesBasicData(int  id,int fileIdinFileBasicData, String type) {
        this.id = id;
        this.fileIdinFileBasicData = fileIdinFileBasicData;
        this.type = type;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getFileIdinFileBasicData() {
        return fileIdinFileBasicData;
    }

    public void setFileIdinFileBasicData(int fileIdinFileBasicData) {
        this.fileIdinFileBasicData = fileIdinFileBasicData;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "EntitiesBasicData{" +
                "id=" + id +
                ", fileIdinFileBasicData=" + fileIdinFileBasicData +
                ", type='" + type + '\'' +
                '}';
    }
}
