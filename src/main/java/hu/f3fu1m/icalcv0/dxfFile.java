package hu.f3fu1m.icalcv0;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class dxfFile {
    String filename;
    List<Entity> entities;

    public dxfFile(String filename, List<Entity> entities) {
        this.filename = filename;
        this.entities = entities;
    }

    public String getFilename() {
        return filename;
    }

    public static String nvl(String value, String alternateValue) {
        if (value == null)
            return alternateValue;

        return value;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public void readFile(String name) throws IOException {
        boolean isEntities = false;
        boolean isStartEnt = false;
        boolean isMainType = true;
        boolean isPropertyType = true;
        boolean waitNextRow = false;

        /*
        A feldolgozandó felület mérete. ezt meg kell keresni és át kell adni.
        Ez alapján lehet arányosítani a rajztábla méretét
        drawing.header['$EXTMIN'] = (0, 0, 0)
        drawing.header['$EXTMAX'] = (100, 100, 0)
        */
        Entity entity;
        List<EntityProperty> entityProperties = null;
        EntityProperty entityProperty = null;

        System.out.println("Mit nem talál: "+name);

        BufferedReader br = new BufferedReader(new FileReader(name));
        String row = br.readLine();

        isMainType = false;
        while(row !=null) {
            waitNextRow = false;
            System.out.println("isEntities "+isEntities+" isStartEnt "+isStartEnt+" isMainType "+isMainType + " isPropertyType " + isPropertyType);
            System.out.println(row);

            if (!waitNextRow&&isStartEnt&&isMainType) {
                entity = new Entity();
                entity.setType(row);
                entityProperties = new ArrayList<>();
                entity.setEntityProperties(entityProperties);
                this.entities.add(entity);
                isMainType = false;
                isPropertyType = true;
                waitNextRow = true;
            }

            if (!waitNextRow&&isStartEnt&&!isMainType) {
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
                if (row.equals("  0")) {
                    isStartEnt = true;
                    isMainType = true;
                    waitNextRow = true;
                }
            }
            if (row.equals("ENTITIES")) isEntities=true;
            if (row.equals("ENDSEC")) isEntities=false;
            System.out.println("isEntities "+isEntities+" isStartEnt "+isStartEnt+" isMainType "+isMainType + " isPropertyType " + isPropertyType);
            row = br.readLine();
        }
        //EOSként létrehozott elem eltávolítása
        this.entities.remove(this.entities.get(this.entities.size()-1));

        System.out.println(this.entities);
        for (int i=0;i<this.entities.size();i++){
            System.out.println("Type " +
                    this.entities.get(i).getType() +
                    " entitas " +
                    this.entities.get(i).getEntityProperties().size());
        }
    }
}

