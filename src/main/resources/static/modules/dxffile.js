import {logLevel} from "./animate.js";

class DXFFile  {
    constructor(fileName,Entities,mySize,screenSizeX,screenSizeY) {
        this.fileName = fileName;
        this.Entities = Entities;
        logLevel >2 ? console.log("mySize ",mySize):null;
        this.mySize = mySize;
        let rateX = screenSizeX /(mySize.maxX - mySize.minX);
        let rateY = screenSizeY /(mySize.maxY - mySize.minY);
        let sizeX = mySize.maxX - mySize.minX;
        let sizeY = mySize.maxY - mySize.minY;
        this.dxfScreenRate = (Math.abs(rateX) >=  Math.abs(rateY)) ? rateY : rateX;
        this.dxfShiftValue = {x: (((mySize.maxX - mySize.minX)*0.01)-mySize.minX),
            y: (-1*Math.abs((mySize.maxY - mySize.minY)*0.01)-mySize.minY)}

        logLevel >0 ? console.log("screenSizeX ",typeof screenSizeX, screenSizeX , " screenSizeY ",typeof screenSizeY,screenSizeY," this.mySize.maxX ",
            typeof this.mySize.maxX,this.mySize.maxX," this.mySize.minX ",typeof this.mySize.minX,this.mySize.minX," this.mySize.maxY ",
            typeof this.mySize.maxY,this.mySize.maxY, " this.mySize.minY ", typeof this.mySize.minY,this.mySize.minY,
            "(mySize.maxX - mySize.minX)",(mySize.maxX - mySize.minX),"mySize.maxY - mySize.minY",mySize.maxY - mySize.minY):null;
        logLevel >0 ? console.log("(Math.abs(1-rateX) ",Math.abs(1-rateX), " Math.abs(1-rateY)) ",Math.abs(1-rateY)):null;
    }
}

export  {DXFFile};