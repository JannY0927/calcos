import {DXFFile} from "./dxffile.js";
import {Entity} from "./entity.js";
import {Line} from "./entities/line.js";
import {Circle} from "./entities/circle.js";
import {Arc} from "./entities/arc.js";
import {Attrib} from "./entities/attrib.js";
import {EntityAttDef} from "./entities/attrdef.js";
import {Text} from "./entities/text.js";
import {Mtext} from "./entities/mtext.js";
import {Hatch} from "./entities/hatch.js";
import {Lwpolyline} from "./entities/lwpolyline.js";
import {Entity3DFace} from "./entities/3dface.js";
import {EntityPoint} from "./entities/point.js";
import {EntitySolid} from "./entities/solid.js";
import {EntityProperty} from "./entityproperty.js";

let drawSheet = document.getElementById('sheet_backdraw');
let master = document.getElementById('master');
let defaultLineWidth = 1;
//Ha a loglevel > 0  Uploaddal kapcsolatos logok jelennek meg + A javaból visszajött parsolt file információk
//Ha a loglevel > 1  A Entitások kirajzolás logok jelenek meg
//Ha a loglevel > 2  A Entitások arányosítandó tulajdonságai jelennek meg kirajzolás logok jelenek meg
let logLevel = 5;


//KI kell találni hova kerül az arány, és melyik részét hogyan fogom tudni írni.

function animateCanvas(dxfFileEntityData) {
    logLevel > 1 ? console.log("ez a fájlopm",dxfFileEntityData):null;
    let entity = new Entity;
    let jsonEntities = [];
    let jsonEntityProperties = [];
    let picSize = {minX : 0,minY:0, maxX : 0,maxY:0};
    let isError = false;

    master.style.animation = "zoomIn 2s";
    drawSheet.width = (window.innerWidth*0.9);
    drawSheet.height = (window.innerHeight*0.9);


    picSize.minX = parseFloat(dxfFileEntityData.entities[0].entityProperties[0].value);
    picSize.minY = parseFloat(dxfFileEntityData.entities[0].entityProperties[1].value);
    picSize.maxX = parseFloat(dxfFileEntityData.entities[1].entityProperties[0].value);
    picSize.maxY = parseFloat(dxfFileEntityData.entities[1].entityProperties[1].value);


    logLevel > 2 ? console.log("drawSheet.width ", drawSheet.width, "drawSheet.height", drawSheet.height) : null;

    const dxfFilewithEntities = new DXFFile(dxfFileEntityData.filename, jsonEntities, picSize, drawSheet.width - 220, drawSheet.height - 20);

    logLevel > 3 ? console.log("rate", dxfFilewithEntities.dxfScreenRate, " ", dxfFilewithEntities.dxfShiftValue) : null;
    for (let i = 0; i < dxfFileEntityData.entities.length; i++) {
        logLevel > 3 ? console.log("Entiti", dxfFileEntityData.entities[i].type) : null;
        jsonEntityProperties = [];
        for (let j = 0; j < dxfFileEntityData.entities[i].entityProperties.length; j++) {
            const entityProperty = new EntityProperty(dxfFileEntityData.entities[i].entityProperties[j].propertyType, dxfFileEntityData.entities[i].entityProperties[j].value);
            logLevel > 3 ? console.log("entityProperty", entityProperty) : null;
            if (dxfFileEntityData.entities[i].type != "$EXTMAX" || dxfFileEntityData.entities[i].type != "$EXTMIN")
                if (entityProperty.propertyType === " 10" || entityProperty.propertyType === " 11" || entityProperty.propertyType === " 12" || entityProperty.propertyType === " 13") {
                    logLevel > 3 ? console.log("xes", entityProperty.propertyValue) : null;
                    entityProperty.propertyValue = parseFloat(entityProperty.propertyValue) + parseFloat(dxfFilewithEntities.dxfShiftValue.x);
                    logLevel > 3 ? console.log("xes1", entityProperty.propertyValue, " EGYEbe ", parseFloat(entityProperty.propertyValue), " !", parseFloat(dxfFilewithEntities.dxfShiftValue.x)) : null;
                    entityProperty.propertyValue = parseFloat(entityProperty.propertyValue) * parseFloat(dxfFilewithEntities.dxfScreenRate);
                    logLevel > 3 ? console.log("xes2", entityProperty.propertyValue) : null;
                }
            if (entityProperty.propertyType === " 20" || entityProperty.propertyType === " 21" || entityProperty.propertyType === " 22" || entityProperty.propertyType === " 23") {
                logLevel > 3 ? console.log("yes", entityProperty.propertyValue) : null;
                entityProperty.propertyValue = parseFloat(entityProperty.propertyValue) + parseFloat(dxfFilewithEntities.dxfShiftValue.y);
                logLevel > 3 ? console.log("yes1", entityProperty.propertyValue) : null;
                entityProperty.propertyValue = drawSheet.height - 20 - parseFloat(entityProperty.propertyValue) * parseFloat(dxfFilewithEntities.dxfScreenRate);
                logLevel > 3 ? console.log("yes2", entityProperty.propertyValue) : null;
            }
            if (entityProperty.propertyType === " 40" || entityProperty.propertyType === " 41") {
                logLevel > 3 ? console.log("distes1", entityProperty.propertyValue) : null;
                entityProperty.propertyValue = parseFloat(entityProperty.propertyValue) * parseFloat(dxfFilewithEntities.dxfScreenRate);
                logLevel > 3 ? console.log("distes2", entityProperty.propertyValue) : null;
            }
            jsonEntityProperties.push(entityProperty)
        }

        switch (dxfFileEntityData.entities[i].type) {
            case "LINE":
                entity = new Line(dxfFileEntityData.entities[i].type, jsonEntityProperties);
                jsonEntities.push(entity);
                break;
            case "CIRCLE":
                entity = new Circle(dxfFileEntityData.entities[i].type, jsonEntityProperties);
                jsonEntities.push(entity);
                break;
            case "ARC":
                entity = new Arc(dxfFileEntityData.entities[i].type, jsonEntityProperties);
                jsonEntities.push(entity);
                break;
            case "ATTDEF":
                entity = new EntityAttDef(dxfFileEntityData.entities[i].type, jsonEntityProperties);
                jsonEntities.push(entity);
                break;
            case "ATTRIB":
                entity = new Attrib(dxfFileEntityData.entities[i].type, jsonEntityProperties);
                jsonEntities.push(entity);
                break;
            case "TEXT":
                entity = new Text(dxfFileEntityData.entities[i].type, jsonEntityProperties);
                jsonEntities.push(entity);
                break;
            case "MTEXT":
                entity = new Mtext(dxfFileEntityData.entities[i].type, jsonEntityProperties);
                jsonEntities.push(entity);
                break;
            case "3DFACE":
                entity = new Entity3DFace(dxfFileEntityData.entities[i].type, jsonEntityProperties);
                jsonEntities.push(entity);
                break;
            case "HATCH":
                entity = new Hatch(dxfFileEntityData.entities[i].type, jsonEntityProperties);
                jsonEntities.push(entity);
                break;
            case "LWPOLYLINE":
                entity = new Lwpolyline(dxfFileEntityData.entities[i].type, jsonEntityProperties);
                jsonEntities.push(entity);
                break;
            case "POINT":
                entity = new EntityPoint(dxfFileEntityData.entities[i].type, jsonEntityProperties);
                jsonEntities.push(entity);
                break;
            case "SOLID":
                entity = new EntitySolid(dxfFileEntityData.entities[i].type, jsonEntityProperties);
                jsonEntities.push(entity);
                break;
            default:
                null;
        }
        logLevel > 7 ? console.log(jsonEntityProperties) : null;
    }


    
    master.style.animation = "zoomIn 2s";
    drawSheet.width = window.innerWidth*0.9;
    drawSheet.height = window.innerHeight*0.9;

    let drawContext = drawSheet.getContext('2d');

    drawContext.beginPath();
    drawContext.font = '15px serif';
    drawContext.fillStyle = "#ffffff";
    isError ? drawContext.fillText('Not supported DXF. NO $EXTMIN, $EXTMAX properties:', 190, 30):null;
    drawContext.fillText('Calculation:', drawSheet.width-190, 30);
    drawContext.beginPath();
    drawContext.strokeStyle = "#ffffff";
    drawContext.moveTo (drawSheet.width-200,0);
    drawContext.lineTo(drawSheet.width-200,drawSheet.height);
    drawContext.stroke();

    setTimeout(function () {
       dxfFilewithEntities.Entities.forEach(write);
    }, 2000);



    function write(value) {
        value.draw();
        drawSheet.style.visibility = "visible";
        master.style.visibility = "hidden";
    }



}

export {animateCanvas,drawSheet,defaultLineWidth,logLevel};