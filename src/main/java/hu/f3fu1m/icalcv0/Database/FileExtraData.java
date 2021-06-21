package hu.f3fu1m.icalcv0.Database;

public class FileExtraData {
    private int id;
    private int fileIdinFileBasicData;
    private String type;
    private String value;

    public FileExtraData() {
    }

    public FileExtraData(int id,int fileIdinFileBasicData, String type, String value) {
        this.id = id;
        this.fileIdinFileBasicData = fileIdinFileBasicData;
        this.type = type;
        this.value = value;
    }

    public int getFileIdinFileBasicData() {
        return fileIdinFileBasicData;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "FileExtraData{" +
                "id=" + id +
                ", fileIdinFileBasicData=" + fileIdinFileBasicData +
                ", type='" + type + '\'' +
                ", value='" + value + '\'' +
                '}';
    }
}
