package hu.f3fu1m.icalcv0;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;

@Controller
public class FileController {

    @Autowired
    FileService fileService;


    @PostMapping("/upload")
    public void uploadFile(@RequestParam("files") MultipartFile formData, RedirectAttributes redirectAttributes) throws IOException {
        System.out.println("contorller");
        fileService.upload(formData);
        System.out.println(formData.getOriginalFilename());
        dxfFile uploadedFile = new dxfFile(formData.getOriginalFilename());
        uploadedFile.readFile("src/main/resources/static/"+formData.getOriginalFilename());
    }


    @PostMapping("/result")
    public void result(@RequestParam("files") MultipartFile formData, RedirectAttributes redirectAttributes) throws IOException {
        System.out.println("contorller");
        fileService.upload(formData);
        System.out.println(formData.getOriginalFilename());
        dxfFile uploadedFile = new dxfFile(formData.getOriginalFilename());
        uploadedFile.readFile("src/main/resources/static/"+formData.getOriginalFilename());
    }

  /*  @PostMapping("/upload")
    public String uploadFile() throws IOException {
        dxfParser rowom = new dxfParser("src/main/resources/static/teszt.dxf");
        String jani = dxfParser.readFile(rowom.getFilename());
        System.out.println("Mi a ..." + jani);
    return "Jeee";
    }*/
}
