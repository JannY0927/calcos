package hu.f3fu1m.icalcv0;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.util.Map;

@Controller
public class FileController {

    @Autowired
    FileService fileService;

    @PostMapping("/upload")
    public String uploadFile(@RequestParam(name ="formData") MultipartFile formData, RedirectAttributes redirectAttributes) {

            fileService.upload(formData);
        System.out.println("FilecontrollerUpload");
        return "OK";
    }

  /*  @PostMapping("/upload")
    public String uploadFile() throws IOException {
        dxfParser rowom = new dxfParser("src/main/resources/static/teszt.dxf");
        String jani = dxfParser.readFile(rowom.getFilename());
        System.out.println("Mi a ..." + jani);
    return "Jeee";
    }*/
}
