package hu.f3fu1m.icalcv0;

public class EntityProperty  {
    private String propertyType;
    private String value;



    public EntityProperty() {
        this.propertyType = propertyType;
        this.value = value;
    }

    public String getPropertyType() {
        return propertyType;
    }

    public void setPropertyType(String propertyType) {
        this.propertyType = propertyType;
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "EntityProperty{" +
                "id=" + propertyType +
                ", value='" + value + '\'' +
                '}';
    }

    public void setValue(String value) {
        this.value = value;
    }
}
