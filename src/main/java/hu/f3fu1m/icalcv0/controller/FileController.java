package hu.f3fu1m.icalcv0.controller;

import java.io.IOException;

import hu.f3fu1m.icalcv0.DxfFile;
import hu.f3fu1m.icalcv0.Service.DxfFileService;
import hu.f3fu1m.icalcv0.Service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@RestController
public class FileController {

    @Autowired
    FileService fileService;
    DxfFileService  dxfFileService;


    @Value("${app.upload.dir:${user.home}}")
    public String uploadDir;


    @PostMapping(value = "/upload")
    public String uploadFile(@RequestParam("files") MultipartFile formData, RedirectAttributes redirectAttributes) throws IOException {
        System.out.println("contorller");
        fileService.upload(formData);
        System.out.println(formData.getOriginalFilename());
        DxfFile dxfFile = new DxfFile(formData.getOriginalFilename());
        ParserController uploadedFile = new ParserController();
        uploadedFile.setDxfFile(dxfFile);
        uploadedFile.readFile(uploadDir+"/"+formData.getOriginalFilename());

        //return uploadedFile.toJson();
        return uploadedFile.dxfFile.toJson();
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
    }

}
