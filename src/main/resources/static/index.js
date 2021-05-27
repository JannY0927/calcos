const dropArea = document.querySelector(".drag-area"),
      dragText = dropArea.querySelector("#labelforfile"),
      input = dropArea.querySelector(".box__file");
let file;

console.log("fileType: ")

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
    dragText.textContent = "Let's work";
    fetch("/upload", {
        method: "POST",
        body: formData
    })
    setTimeout(function(){ window.location.replace("/result.html") }, 1000);
});