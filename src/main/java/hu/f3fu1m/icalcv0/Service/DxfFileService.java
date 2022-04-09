package hu.f3fu1m.icalcv0.Service;

import hu.f3fu1m.icalcv0.Repository.DxfFileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DxfFileService {

    DxfFileRepository dFile;

    public void setDxfFile(DxfFileRepository dxfFile) {
        this.dFile = dxfFile;
    }
}


