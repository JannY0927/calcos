package hu.f3fu1m.icalcv0;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class DxfFile {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE	)
	private Long id;
	
    private String filename;
	@OneToMany(mappedBy = "dxfFile")
	@JsonIgnore
    private List<DxfEntity> entities;


	//private EntityPropertyRepository entityPrRepo;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<DxfEntity> getEntities() {
		return entities;
	}

	public void setEntities(List<DxfEntity> entities) {
		this.entities = entities;
	}

	private DxfFile() {
	}
	
    public DxfFile(String filename) {
        this.filename = filename;
        this.entities = new ArrayList<>();
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    
    public void readFile(String name) throws IOException {
        boolean isEntities = false;
        boolean isStartEnt = false;
        boolean isMainType;
        boolean isPropertyType = true;
        boolean waitNextRow;
        /*A feldolgozandó felület mérete. ezt meg kell keresni és át kell adni. Ez alapján lehet arányosítani a rajztábla méretét
        drawing.header['$EXTMIN'] = (0, 0, 0) drawing.header['$EXTMAX'] = (100, 100, 0)*/
        DxfEntity entity;
        List<EntityProperty> entityProperties = null;
        EntityProperty entityProperty;

        System.out.println("Mit nem talál: "+name);

        BufferedReader br = new BufferedReader(new FileReader(name));
        String row = br.readLine();

        isMainType = false;
        while(row !=null) {
            waitNextRow = false;
            if (row.equals("$EXTMIN") ||row.equals("$EXTMAX")) {
                isStartEnt = true;
                isMainType = true;
                isEntities=true;
            }
            if (isStartEnt&&isMainType) {
                entityProperties = new ArrayList<>();
                entity = new DxfEntity(row,entityProperties);
                //entity.setType();
                this.entities.add(entity);
                isMainType = false;
                isPropertyType = true;
                waitNextRow = true;
            }
            if (!waitNextRow&&isStartEnt) {
                if (isPropertyType){
                    entityProperty = new EntityProperty(row,null,this.entities.get(this.entities.size()-1));
                    //entProp.save(entityProperty);
                    entityProperties.add(entityProperty);
                    isPropertyType =false;
                }
                else {
                    entityProperties.get(entityProperties.size()-1).setValue(row);
                    isPropertyType =true;
                }
            }
            if (!waitNextRow&&isEntities) {
                if (row.equals("  0")||row.equals("  9")) {
                    isStartEnt = true;
                    isMainType = true;
                }
            }
            if (row.equals("ENTITIES")) isEntities=true;
            if (row.equals("ENDSEC")) isEntities=false;
            if (row.equals("  9")) {
                isStartEnt = false;
                isEntities=false;
            }
            row = br.readLine();
        }
        //EOSként létrehozott elem eltávolítása
        this.entities.remove(this.entities.get(this.entities.size()-1));

        System.out.println(this.entities);
        for (DxfEntity value : this.entities) {
            System.out.println("Type " + value.getType() + " entitas " + value.getEntityProperties().size());
        }
    }

	public String toJson() {
		StringBuilder sb = new StringBuilder().append("{\"filename\": \"" + filename + "\",\"entities\": [");
        //System.out.println(sb);
        System.out.println("Jani1");
		entities.forEach(e -> sb.append(e.toJson() + ","));
        System.out.println("Jani2");
		sb.setLength(sb.length() - 1);
        System.out.println("Jani3");
		sb.append("]");
        System.out.println("Jani4");
		sb.append("}");
        System.out.println("Jani5");
		return sb.toString();
	}
    
	@Override
	public String toString() {
		return "DxfFile [filename=" + filename + ", entities=" + entities + "]";
	}


}

