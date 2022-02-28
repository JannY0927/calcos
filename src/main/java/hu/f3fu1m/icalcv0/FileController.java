package hu.f3fu1m.icalcv0;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class FileController {

    @Autowired
    FileService fileService;


    @PostMapping(value = "/upload")
    public String uploadFile(@RequestParam("files") MultipartFile formData, RedirectAttributes redirectAttributes) throws IOException {
        System.out.println("contorller");
        fileService.upload(formData);
        System.out.println(formData.getOriginalFilename());
        DxfFile uploadedFile = new DxfFile(formData.getOriginalFilename());
        uploadedFile.readFile("src/main/resources/static/"+formData.getOriginalFilename());
        ObjectMapper objectMapper = new ObjectMapper();
//        return objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(uploadedFile.toJson());
        
//        response.setContentType("application/json");
        
        return objectMapper.valueToTree(uploadedFile.toJson()).toPrettyString();
    }

    @GetMapping("/result")
    public String result(@RequestParam(name="name", required=false, defaultValue="World") String name, Model model) {
        model.addAttribute("name", name);
        return "greeting";
    }


    @PostMapping("/jani")
    public void result(DxfFile uploadedFile) throws IOException {
        System.out.println("contorller");
        System.out.println( uploadedFile.getFilename());
        //uploadedFile.

     //   fileService.upload(formData);
     //   System.out.println(formData.getOriginalFilename());
    //    List<Entity> entities = new ArrayList<>();
     //   uploadedFile.readFile("src/main/resources/static/"+formData.getOriginalFilename());
    }

  /*  @PostMapping("/upload")
    public String uploadFile() throws IOException {
        dxfParser rowom = new dxfParser("src/main/resources/static/teszt.dxf");
        String jani = dxfParser.readFile(rowom.getFilename());
        System.out.println("Mi a ..." + jani);
    return "Jeee";
    }*/
}
