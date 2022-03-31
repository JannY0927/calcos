package hu.f3fu1m.icalcv0;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


public class DxfFile {
    String filename;
    List<Entity> entities;

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
        Entity entity;
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
                entity = new Entity();
                entity.setType(row);
                entityProperties = new ArrayList<>();
                entity.setEntityProperties(entityProperties);
                this.entities.add(entity);
                isMainType = false;
                isPropertyType = true;
                waitNextRow = true;
            }
            if (!waitNextRow&&isStartEnt) {
                if (isPropertyType){
                    entityProperty = new EntityProperty();
                    entityProperties.add(entityProperty);
                    entityProperties.get(entityProperties.size()-1).setPropertyType(row);
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
        for (Entity value : this.entities) {
            System.out.println("Type " + value.getType() + " entitas " + value.getEntityProperties().size());
        }
    }

	public String toJson() {
		StringBuilder sb = new StringBuilder().append("{\"filename\": \"" + filename + "\",\"entities\": [");
        System.out.println(sb);
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

