package hu.f3fu1m.icalcv0;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
public class DxfFile {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
    private String filename;
	@OneToMany(mappedBy = "dxfFile")
	@JsonIgnore
    private List<DxfEntity> entities;

	private DxfFile() {
	}
	
    public DxfFile(String filename) {
        this.filename = filename;
        this.entities = new ArrayList<>();
    }


	public String toJson() {
		StringBuilder sb = new StringBuilder().append("{\"filename\": \"" + filename + "\",\"entities\": [");
		entities.forEach(e -> sb.append(e.toJson() + ","));
		sb.setLength(sb.length() - 1);
		sb.append("]");
		sb.append("}");
		return sb.toString();
	}
    
	@Override
	public String toString() {
		return "DxfFile [filename=" + filename + ", entities=" + entities + "]";
	}

}

