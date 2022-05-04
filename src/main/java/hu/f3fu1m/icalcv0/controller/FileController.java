package hu.f3fu1m.icalcv0.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import hu.f3fu1m.icalcv0.Service.DxfFileService;
import hu.f3fu1m.icalcv0.Service.FileService;
import hu.f3fu1m.icalcv0.Service.ParserService;
import hu.f3fu1m.icalcv0.model.DxfFile;

@RestController
public class FileController {

    @Autowired
    FileService fileService;
    @Autowired
    DxfFileService  dxfFileService;
    @Autowired
    ParserService   parserService; 


    @Value("${app.upload.dir:${user.home}}")
    public String uploadDir;


    @PostMapping(value = "/upload")
    public String uploadFile(@RequestParam("files") MultipartFile formData, RedirectAttributes redirectAttributes) throws IOException {
        System.out.println("contorller");
        Path path = copy(formData);
        System.out.println(formData.getOriginalFilename());
        return parserService.parse(path,formData.getOriginalFilename()).toJson();
    }

    private Path copy(MultipartFile file) throws IOException {

            System.out.println("FileserviceUpload");
            Path copyLocation = Paths
                    .get(uploadDir + File.separator + StringUtils.cleanPath(file.getOriginalFilename()));
            Files.copy(file.getInputStream(), copyLocation, StandardCopyOption.REPLACE_EXISTING);
            return copyLocation;
            }

}
