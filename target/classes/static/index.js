const dropArea = document.querySelector(".drag-area"),
      dragText = dropArea.querySelector("#labelforfile"),
      input = dropArea.querySelector(".box__file");
let file;

console.log("fileType: ")

function uploadFile (uploadFile) {
    const DxfParser = require('dxf-parser');
    const fs = require('fs');
    const util = require('util');

    uploadFile = fs.readFileSync(uploadFile, 'utf-8');

    var parser = new DxfParser();
    try {
        var result = parser.parseSync(uploadFile);
        console.log(util.inspect(result, false, null, true))
    }catch(err) {
        return console.error(err.stack);
    }
}

input.addEventListener("change", function(){
    file = this.files[0];
    dropArea.classList.add("active");
    showFile(); //calling function
});


//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event)=>{
    event.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", ()=>{
    dropArea.classList.remove("active");
    dragText.textContent = "Choose The DXF file or drag it here.";
});

//If user drop File on DropArea
dropArea.addEventListener("drop", (event)=>{
    event.preventDefault();
    const formData = new FormData()
    for (const i of  event.dataTransfer.files) {
        if (i.name.includes('.dxf')  || i.name.includes('.DXF')) {
            formData.append('files', i);
            console.log(formData)
        }
        else
        {
            alert("This isn't an dxf File!");
            dropArea.classList.remove("active");
            dragText.textContent = "Drag & Drop to Upload File";
        }
    }
    fetch("/upload", {
        method: "POST",
        body: formData
    })
});

