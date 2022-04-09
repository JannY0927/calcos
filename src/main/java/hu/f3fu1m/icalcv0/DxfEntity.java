package hu.f3fu1m.icalcv0;



import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;	 


@Entity
public class DxfEntity {

    @GeneratedValue
    @Id
	private Long id;
    private String type;
	@OneToMany(mappedBy = "dxfEntity")
	@JsonIgnore
	private List<EntityProperty> entityProperties;
    @ManyToOne
	@JsonIgnore
    private DxfFile dxfFile;

    private DxfEntity() {   	
    }
    
    public DxfEntity(String type,List<EntityProperty> entityProperties) {
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
        System.out.println("Jani11");
	    ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();

        System.out.println("Jani12");
	    StringBuilder sb = new StringBuilder()
				.append("{")
				.append("\"type\": \"" + type + "\",")
				.append("\"entityProperties\": [");

        System.out.println("Jani13");
		entityProperties.forEach(ep -> {
			try {
				sb.append(ow.writeValueAsString(ep) + ",");
			} catch (JsonProcessingException e) {
		        System.out.println("Janicatcherror");
				e.printStackTrace();
			}
		});
        System.out.println("Jani14");
		sb.setLength(sb.length() - 1);
		sb.append("]");
		sb.append("}\n");
		return sb.toString();	
	}
    
}
