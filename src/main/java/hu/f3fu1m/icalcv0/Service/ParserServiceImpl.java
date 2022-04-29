package hu.f3fu1m.icalcv0.Service;


import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hu.f3fu1m.icalcv0.Repository.DxfEntityRepository;
import hu.f3fu1m.icalcv0.Repository.DxfFileRepository;
import hu.f3fu1m.icalcv0.Repository.EntityPropertyRepository;
import hu.f3fu1m.icalcv0.model.DxfEntity;
import hu.f3fu1m.icalcv0.model.DxfFile;
import hu.f3fu1m.icalcv0.model.EntityProperty;

@Service
public class ParserServiceImpl implements ParserService {

	
	@Autowired
	DxfFileRepository dxfFileRepository;
	@Autowired
	DxfEntityRepository dxfEntityRepository;
	@Autowired
	EntityPropertyRepository entityPropertyRepository;

	@Override
	public DxfFile parse(Path path, String originalFilename) throws IOException {
        boolean isEntities = false;
        boolean isStartEnt = false;
        boolean isMainType;
        boolean isPropertyType = true;
        boolean waitNextRow;
        /*A feldolgozandó felület mérete. ezt meg kell keresni és át kell adni. Ez alapján lehet arányosítani a rajztábla méretét
        drawing.header['$EXTMIN'] = (0, 0, 0) drawing.header['$EXTMAX'] = (100, 100, 0)*/
        DxfEntity entity=null;
        DxfFile dxfFile = new DxfFile(originalFilename);
        dxfFileRepository.save(dxfFile);
        List<EntityProperty> entityProperties = null;
        EntityProperty entityProperty=null;

        System.out.println("Mit nem talál: "+path.toString());

        BufferedReader br = new BufferedReader(new FileReader(path.toFile()));
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
                entity = new DxfEntity(row,entityProperties,dxfFile);
                //dxfEntityRepository.save(entity);
                dxfFile.getEntities().add(entity);

                isMainType = false;
                isPropertyType = true;
                waitNextRow = true;
            }
            if (!waitNextRow&&isStartEnt) {
                if (isPropertyType){
                    entityProperty = new EntityProperty(row,null,entity);
                    //entProp.save(entityProperty);
                    //entityPropertyRepository.save(entityProperty);
                    entityProperties.add(entityProperty);
                    isPropertyType =false;
                }
                else {
                    entityProperty.setValue(row);
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
        dxfFile.getEntities().remove(dxfFile.getEntities().get(dxfFile.getEntities().size()-1));
       
        
        System.out.println(dxfFile.getEntities());
        for (DxfEntity value : dxfFile.getEntities()) {
            System.out.println("Type " + value.getType() + " entitas " + value.getEntityProperties().size());
        }
        return dxfFile;
		
	}
}
