package hu.f3fu1m.icalcv0.Database;

public class EntitiesAttrData {
        private int id;
        private int entIdinEntitiesBasicData;
        private String seqType;
        private String seqValue;

    public EntitiesAttrData() {
    }

    public EntitiesAttrData(int id, int entIdinEntitiesBasicData, String seqType, String seqValue) {
        this.id = id;
        this.entIdinEntitiesBasicData = entIdinEntitiesBasicData;
        this.seqType = seqType;
        this.seqValue = seqValue;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getEntIdinEntitiesBasicData() {
        return entIdinEntitiesBasicData;
    }

    public void setEntIdinEntitiesBasicData(int entIdinEntitiesBasicData) {
        this.entIdinEntitiesBasicData = entIdinEntitiesBasicData;
    }

    public String getSeqType() {
        return seqType;
    }

    public void setSeqType(String seqType) {
        this.seqType = seqType;
    }

    public String getSeqValue() {
        return seqValue;
    }

    public void setSeqValue(String seqValue) {
        this.seqValue = seqValue;
    }

    @Override
    public String toString() {
        return "EntitiesAttrData{" +
                "id=" + id +
                ", entIdinEntitiesBasicData=" + entIdinEntitiesBasicData +
                ", seqType='" + seqType + '\'' +
                ", seqValue='" + seqValue + '\'' +
                '}';
    }
}
