package hu.f3fu1m.icalcv0;



import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table
@Getter
@Setter
public class DxfEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
    
}
