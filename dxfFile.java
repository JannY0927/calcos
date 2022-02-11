package hu.f3fu1m.icalcv0;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class dxfFile {
    String filename;
    List<Entities> entities;

    public dxfFile(String filename) {
        this.filename = filename;
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
        String lastRow = null;
        String type = "LINE";
        Entities parsingObj = new Entities();
        Boolean findCoordinatas = false;
        List<Entities> entities = new ArrayList<>();
        List<EntityProperty> entityProperties = new ArrayList<>();

        String sx = null,sy = null,sz = null,ex = null,ey = null,ez = null;

        System.out.println("Mit nem talál: "+name);

        BufferedReader br = new BufferedReader(new FileReader(name));
        String row = br.readLine();
        int counter = 1;

        boolean isEntities = false;
        boolean isStartEnt = false;
        boolean isMainType = true;
        boolean isPropertyType = true;

        while(row !=null) {
            System.out.println("\n");
            System.out.println("isEntities "+isEntities+" isStartEnt "+isStartEnt+" isMainType "+isMainType + " isPropertyType " + isPropertyType);
            System.out.println(row);
            if (isEntities&&isStartEnt) {
                if (!isMainType) {
                    if (isPropertyType) {
                        EntityProperty entityProperty = new EntityProperty();
                        entityProperty.setPropertyType(row);
                        entityProperties.add(entityProperty);
                        isPropertyType = false;
                        System.out.println("Debug 2 " + entityProperties.get(entityProperties.size() - 1));
                    } else {
                        entityProperties.get(entityProperties.size() - 1).setValue(row);
                        isPropertyType = true;
                        System.out.println("Debug 3 " + entityProperties.get(entityProperties.size() - 1));
                    }
                }
                if (isMainType) {
                    this.entities.get(this.entities.size()-1).setType(row);
                    isMainType = false;
                    System.out.println("Debug 1 "+this.entities.get(this.entities.size()-1).getType());
                }
                System.out.println("Debug 4 "+this.entities.get(this.entities.size()-1));
            }

            if (row.equals("ENTITIES")) isEntities=true;
            if (isEntities&&row.equals("ENDSEC")) isEntities=false;
            if (isEntities&&!isStartEnt&&row.equals("  0")) {
                isStartEnt = true;
                Entities entity = new Entities();
                this.entities.add(entity);
                isMainType = true;
                EntityProperty entityProperty = new EntityProperty();
            }
            else if (isStartEnt&&row.equals("  0")) {
                isStartEnt=false;
                isMainType=true;
                isPropertyType=true;
            }

            System.out.println("isEntities "+isEntities+" isStartEnt "+isStartEnt+" isMainType "+isMainType + " isPropertyType " + isPropertyType);
            System.out.println("\n");
            row = br.readLine();
        }

/*
        while(row !=null) {
            System.out.println(row);
            if (row.equals(type)) {
                System.out.println("counter: " + counter);
                findCoordinatas = true;
            }
            if (findCoordinatas) {
                switch (lastRow) {
                    case " 10": sx = row;
                        System.out.println("row: " + row + "sx: " + sx);
                        break;
                    case " 20": sy = row;
                        System.out.println("row: " + row + "sy: " + sy);
                        break;
                    case " 30": sz = row;
                        break;
                    case " 11": ex = row;
                        break;
                    case " 21": ey = row;
                        break;
                    case " 31":
                        ez = row;
                }
                if (row.equals("  0")) {
                    System.out.println("counter: " + counter + " sx: " + sx + " sy: " + sy + " sz: " + sz + " ex: " + ex + " ey: " + ey + " ez: " + ez);
                    parsingObj.setType("type");
                    parsingObj.setStart(new Coordinata(Float.parseFloat(sx),Float.parseFloat(sy),Float.parseFloat(nvl(sz,"0"))));
                    parsingObj.setEnd(new Coordinata(Float.parseFloat(ex),Float.parseFloat(ey),Float.parseFloat((nvl(ez,"0")))));
                    result.add(parsingObj);
                    System.out.println("Pars: " + parsingObj.toString());
                    //mentéps Db-be
                    //visszarajzolás
                    FileBasicData fileBasicData = new FileBasicData();
                    fileBasicData.setName("Teszt1");
                    FileBasicDataRepository a = new FileBasicDataRepository();
                    a.insert(fileBasicData);
                    System.out.println("Id"+fileBasicData.getId());

                    sx = null;sy = null;sz = null;ex = null;ey = null;ez  = null;
                    findCoordinatas = false;
                }

            }
            lastRow = row;
            row = br.readLine();
            counter++;
        }*/
        System.out.println(entities);
        for (int i=0;i<this.entities.size();i++){
            System.out.println("Type " + this.entities.get(i).getType() + " entitas " + this.entities.get(i).getEntityProperties().size());
        }


//        for (Entities entity : entities) {
  //          System.out.println("Type " + entity.getType() + " entitas " + entity.getEntityProperties().size());
    //    }
    }
}

