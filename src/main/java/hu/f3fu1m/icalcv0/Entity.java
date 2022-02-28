package hu.f3fu1m.icalcv0;

import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

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

	@Override
	public String toString() {
		return "Entity [type=" + type + ", entityProperties=" + entityProperties + "]";
	}
	
	public String toJson() {
	    ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();

	    StringBuilder sb = new StringBuilder()
				.append("{")
				.append("\"type\": \"" + type + "\",")
				.append("\"entityProperties\": [");
		entityProperties.forEach(ep -> {
			try {
				sb.append(ow.writeValueAsString(ep) + ",");
			} catch (JsonProcessingException e) {
				e.printStackTrace();
			}
		});
		sb.setLength(sb.length() - 1);
		sb.append("]");
		sb.append("}\n");
		return sb.toString();	
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
