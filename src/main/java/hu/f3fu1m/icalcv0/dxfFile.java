package hu.f3fu1m.icalcv0;

import hu.f3fu1m.icalcv0.Database.FileBasicData;
import hu.f3fu1m.icalcv0.Database.FileBasicDataRepository;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

public class dxfFile {
    public String filename;

    public dxfFile(String filename) {
        this.filename = filename;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public void readFile(String name) throws IOException {
        String lastRow = null;
        String type = "LINE";
        Entities parsingObj = new Entities();
        Boolean findCoordinatas = false;
        List<Entities> result = new ArrayList<>();

        String sx = null,sy = null,sz = null,ex = null,ey = null,ez = null;


        System.out.println("Mit nem talál: "+name);

        BufferedReader br = new BufferedReader(new FileReader(name));
        String row = br.readLine();
        int counter = 1;
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
                    parsingObj.setStart(new Coordinata(Float.parseFloat(sx),Float.parseFloat(sy),Float.parseFloat(sz)));
                    parsingObj.setEnd(new Coordinata(Float.parseFloat(ex),Float.parseFloat(ey),Float.parseFloat(ez)));
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
        }
        System.out.println(result);    }
}

