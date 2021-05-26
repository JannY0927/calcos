package hu.f3fu1m.icalcv0;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class dxfParser {

    public String filename;

    public dxfParser(String filename) {
        this.filename = filename;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public static String readFile(String name) throws IOException {
        BufferedReader br = new BufferedReader(new FileReader(name));
        String row = br.readLine();
        System.out.println(row);
        return row;
    }
}

