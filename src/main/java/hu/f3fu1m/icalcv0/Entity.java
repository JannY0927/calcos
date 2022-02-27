package hu.f3fu1m.icalcv0;

import java.util.List;

public class Entity {
    String type;
    List<EntityProperty> entityProperties;

    public Entity() {
        this.type = type;
        this.entityProperties = entityProperties;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<EntityProperty> getEntityProperties() {
        return entityProperties;
    }

    public void setEntityProperties(List<EntityProperty> entityProperties) {
        this.entityProperties = entityProperties;
    }

    /*@Override
    public String toString() {
        String concatEntProp = null;

        //this.entityProperties.forEach((id)-> id.toString());


        for (int i=0;i<this.entityProperties.size();i++) {
            concatEntProp = entityProperties.get(i).getPropertyType() + ' ' + entityProperties.get(i).getValue() + "||";
        }

        return "Entities{type=" + this.type + "Prop" + concatEntProp + "}";
    }*/
}
