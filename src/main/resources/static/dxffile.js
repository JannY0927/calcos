class DXFFile  {
    constructor(fileName,Entities,mySize,screenSizeX,screenSizeY) {
        this.fileName = fileName;
        this.Entities = Entities;
        console.log("mySize ",mySize);
        this.mySize = mySize;
        let rateX = screenSizeX /(mySize.maxX - mySize.minX);
        let rateY = screenSizeY /(mySize.maxY - mySize.minY);
        let sizeX = mySize.maxX - mySize.minX;
        let sizeY = mySize.maxY - mySize.minY;
        this.dxfScreenRate = (Math.abs(1-rateX) >=  Math.abs(1-rateY)) ? rateY : rateX;
        this.dxfShiftValue = {x: (0+((mySize.maxX - mySize.minX)*0.01)-mySize.minX),
            y: (0-((mySize.maxY - mySize.minY)*0.01)-mySize.minY)}

        console.log("screenSizeX ",typeof screenSizeX, screenSizeX , " screenSizeY ",typeof screenSizeY,screenSizeY," this.mySize.maxX ",
            typeof this.mySize.maxX,this.mySize.maxX," this.mySize.minX ",typeof this.mySize.minX,this.mySize.minX," this.mySize.maxY ",
            typeof this.mySize.maxY,this.mySize.maxY, " this.mySize.minY ", typeof this.mySize.minY,this.mySize.minY,
            "(mySize.maxX - mySize.minX)",(mySize.maxX - mySize.minX),"mySize.maxY - mySize.minY",mySize.maxY - mySize.minY);
    }
}
