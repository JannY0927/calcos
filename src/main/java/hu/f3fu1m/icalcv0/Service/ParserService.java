package hu.f3fu1m.icalcv0.Service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Path;

import hu.f3fu1m.icalcv0.model.DxfFile;

public interface ParserService {

	//void readFile(String name) throws IOException;

	DxfFile parse(Path path, String originalFilename) throws FileNotFoundException, IOException;

}