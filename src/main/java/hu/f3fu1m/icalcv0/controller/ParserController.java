package hu.f3fu1m.icalcv0.controller;


import hu.f3fu1m.icalcv0.DxfEntity;
import hu.f3fu1m.icalcv0.DxfFile;
import hu.f3fu1m.icalcv0.EntityProperty;
import hu.f3fu1m.icalcv0.Service.DxfEntityService;
import hu.f3fu1m.icalcv0.Service.DxfFileService;
import hu.f3fu1m.icalcv0.Service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Controller
public class ParserController {
    DxfFile dxfFile;

    public void setDxfFile(DxfFile dxfFile) {
        this.dxfFile = dxfFile;
    }

    public DxfFile getDxfFile() {
        return dxfFile;
    }

    public void readFile(String name) throws IOException {
        DxfFileService dxfFileService;
        DxfEntityService dxfEntityService;
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
                this.dxfFile.getEntities().add(entity);

                isMainType = false;
                isPropertyType = true;
                waitNextRow = true;
            }
            if (!waitNextRow&&isStartEnt) {
                if (isPropertyType){
                    entityProperty = new EntityProperty(row,null,this.dxfFile.getEntities().get(this.dxfFile.getEntities().size()-1));
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
        this.dxfFile.getEntities().remove(this.dxfFile.getEntities().get(this.dxfFile.getEntities().size()-1));

        System.out.println(this.dxfFile.getEntities());
        for (DxfEntity value : this.dxfFile.getEntities()) {
            System.out.println("Type " + value.getType() + " entitas " + value.getEntityProperties().size());
        }
    }

}
