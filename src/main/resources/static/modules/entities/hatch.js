import {Entity} from "../entity.js";
import {drawSheet,defaultLineWidth,logLevel} from "../animate.js";


class Hatch extends Entity {
    constructor(type, Entityproperties) {
        super(type, Entityproperties);
    }

    getAllPoints(){
        let points = [];
        logLevel > 5 ? console.log("ActiualpointsLEEEETTTT",points):null;
        let point = {startX:null,
            startY:null,
            endX:null,
            endY:null,
            radius:null,
            startrato:null,
            endrato:null,
            clockWise:null,
            hatchType:null};
        let hatchType = null;
        logLevel > 5 ? console.log("this.Entityproperties HaTCH", this.Entityproperties):null;
        for (let i=0;i< this.Entityproperties.length;i++) {
            logLevel > 5 ? console.log(hatchType):null;
            if (this.Entityproperties[i].propertyType === ' 72'){
                hatchType = this.Entityproperties[i].propertyValue;
                point = {};
            }
            if (hatchType === '     0') {
                logLevel > 5 ? console.log('HAtch rajz hatchType0',this.Entityproperties[i].propertyType,this.Entityproperties[i].propertyValue):null;
                logLevel > 5 ? console.log('HAtch rajz hatchType0 POINT BEFORE',point):null;
                this.Entityproperties[i].propertyType == ' 10' ? point.startX = this.Entityproperties[i].propertyValue : null;
                this.Entityproperties[i].propertyType == ' 20' ? point.startY = this.Entityproperties[i].propertyValue : null;
                this.Entityproperties[i].propertyType == ' 11' ? point.endX = this.Entityproperties[i].propertyValue : null;
                this.Entityproperties[i].propertyType == ' 21' ? point.endY = this.Entityproperties[i].propertyValue : null;
                logLevel >5 ? console.log('HAtch rajz hatchType0 POINT after',point):null;
                logLevel >5 ? console.log('point.startX != null && point.startY != null && point.endX != null && point.endX != null',point.startX != null,point.startY != null ,point.endX != null,point.endX != null,point):null;
                if (point.startX != null && point.startY != null && point.endX != null && point.endX != null) {
                    logLevel >5 ? console.log("hatchType push előtt",hatchType):null;
                    point.hatchType = hatchType;
                    points.push(point)
                    point = {};
                }
            }

            //Poliline rajzolás
            if (hatchType === '     1') {
                logLevel > 5 ? console.log('HAtch rajz hatchType1',this.Entityproperties[i].propertyType,this.Entityproperties[i].propertyValue):null;
                logLevel > 5 ? console.log('HAtch rajz hatchType1 POINT before1',point):null;

                if (point.startX != null && point.startY != null&&(this.Entityproperties[i].propertyType === ' 42'||this.Entityproperties[i].propertyType === ' 10')) {
                    this.Entityproperties[i].propertyType === ' 42' ? point.b = this.Entityproperties[i].propertyValue == null ? 0.0 : this.Entityproperties[i].propertyValue : null;
                    point.hatchType = hatchType;
                    logLevel > 5 ? console.log("hatchType push előtt",hatchType,"point.hatchType",hatchType,'point',point.hatchType):null;
                    points.push(point)
                    logLevel > 5 ? console.log("hatchType push után",hatchType,"point.hatchType",hatchType,'point',point.hatchType):null;
                    point = {};
                    logLevel > 5 ? console.log("pont törlés után",point):null;
                }
                logLevel > 5 ? console.log('HAtch rajz hatchType1 POINT before2',point):null;
                this.Entityproperties[i].propertyType === ' 10' ? point.startX = this.Entityproperties[i].propertyValue == null ? 0.0 : this.Entityproperties[i].propertyValue : null;
                this.Entityproperties[i].propertyType === ' 20' ? point.startY = this.Entityproperties[i].propertyValue == null ? 0.0 : this.Entityproperties[i].propertyValue : null;
                logLevel > 5 ? console.log('HAtch rajz hatchType1 POINT after',point):null;

            }
            //Arc rajzolás
            if (hatchType === '     2') {
                logLevel >5 ? console.log('HAtch rajz hatchType2',this.Entityproperties[i].propertyType,this.Entityproperties[i].propertyValue):null;
                logLevel >5 ? console.log('HAtch rajz hatchType2 POINT before1',point):null;

                if (point.startX != null && point.startY != null && point.radius != null && point.startrato != null &&
                    point.endrato != null &&
                    (this.Entityproperties[i].propertyType === ' 73'||this.Entityproperties[i].propertyType === ' 10'))
                {
                    point.hatchType = hatchType;
                    this.Entityproperties[i].propertyType === ' 73' ? point.clockWise = this.Entityproperties[i].propertyValue == null ? true : this.Entityproperties[i].propertyValue : null;
                    logLevel >5 ? console.log("hatchType push előtt",hatchType,"point.hatchType",hatchType,'point',point.hatchType):null;
                    points.push(point)
                    logLevel >5 ? console.log("hatchType push után",hatchType,"point.hatchType",hatchType,'point',point.hatchType):null;
                    point = {};
                    logLevel >5 ? console.log("pont törlés után",point):null;
                }
                logLevel >5 ? console.log('HAtch rajz hatchType2 POINT before2',point):null;
                this.Entityproperties[i].propertyType === ' 10' ? point.startX = this.Entityproperties[i].propertyValue == null ? 0.0 : this.Entityproperties[i].propertyValue : null;
                this.Entityproperties[i].propertyType === ' 20' ? point.startY = this.Entityproperties[i].propertyValue == null ? 0.0 : this.Entityproperties[i].propertyValue : null;
                this.Entityproperties[i].propertyType === ' 40' ? point.radius = this.Entityproperties[i].propertyValue == null ? 0.0 : this.Entityproperties[i].propertyValue : null;
                this.Entityproperties[i].propertyType === ' 50' ? point.startrato = this.Entityproperties[i].propertyValue == null ? 0.0 : this.Entityproperties[i].propertyValue : null;
                this.Entityproperties[i].propertyType === ' 51' ? point.endrato = this.Entityproperties[i].propertyValue == null ? 0.0 : this.Entityproperties[i].propertyValue : null;
                logLevel >5 ? console.log('HAtch rajz hatchType2 POINT after',point):null;
            }


            logLevel >5 ? console.log("Actiualpoints",points):null;
        }
        logLevel >5 ? console.log("Allpoints",points):null;
        return points;
    }


    draw() {
        let drawContext = drawSheet.getContext('2d');
        drawContext.lineWidth = this.findValueNum(' 39')==null ? defaultLineWidth : this.findValueNum(' 39');
        drawContext.strokeStyle = "#ffffff";
        drawContext.beginPath();
        let points = []
        logLevel >5 ? console.log("ActiualpointsLEEEETTTT points_DRW",points):null;
        points = this.getAllPoints();
        logLevel >5 ? console.log("ActiualpointsLEEEETTTT  points_DRW",points):null;
        //első pontot ki kell hagyni mert az technikai a Hatch entitybe a tömb második elemétől indulunk
        for (let i = 0; i < points.length; i++) {
            let p1 = points[i];
            let p2 = null;

            logLevel > 5 ? console.log("Jani" ,p1, "masik",points[(points.length) - 1]) : null;
            if (points[i].hatchType === '     1') {
                if (p1 !== points[(points.length) - 1]) {
                    p2 = points[i + 1];
                } else {
                    p2 = points[0];
                }
                if (p1.b === 0.0 || p1.b == null) {
                    logLevel >5 ? console.log("WithoutB p1",p1,"p2",p2):null;
                    drawContext.beginPath();
                    drawContext.moveTo(p1.x, p1.y, p1.z);
                    drawContext.lineTo(p2.x, p2.y, p2.z);
                    logLevel >5 ? console.log(" (points[i].hatchType = '     0') points[i]",points[i].hatchType,points[i]):null;
                    drawContext.stroke();
                }
                if (p1.b > 0.0 || p1.b < 0.0) {
                    logLevel >5 ? console.log("WithB p1",p1,"p2",p2):null;
                    this.drawBulgeBetweenTwoPoints(p1, p2, drawContext);
                }
            }
            if (points[i].hatchType === '     0') {
                logLevel >5 ? console.log('HAtch rajz hatchType0',this.Entityproperties[i].propertyType,this.Entityproperties[i].propertyValue):null;
                logLevel >5 ? console.log('HAtch rajz hatchType0 POINT BEFORE',point):null;
                logLevel >5 ? console.log("points[i]",points[i]):null;
                logLevel >5 ? console.log(this.Entityproperties):null;
                drawContext.beginPath();
                logLevel >5 ? console.log(" (points[i].hatchType = '     0') points[i]",points[i].hatchType,points[i]):null;
                drawContext.moveTo(points[i].startX, points[i].startY);
                drawContext.lineTo(points[i].endX, points[i].endY);
                drawContext.stroke();
            }
            if (points[i].hatchType === '     2') {
                drawContext.beginPath();
                drawContext.strokeStyle = "#FF0000";
                logLevel >5 ? console.log("hatch2 LOG",points[i]):null;
                drawContext.arc(
                    points[i].startX,//kezdő pont koordináta
                    points[i].startY,//kezdő pont koordináta
                    points[i].radius,//sugár
                    Math.PI/180*-1*(points[i].startrato-360),//kezdúszög
                    Math.PI/180*-1*(points[i].endrato-360),//végszög
                    points[i].clockWise =='1' ? false : true //Extrusion direction (optional; default = 0, 0, 1)
                );
                logLevel >5 ? console.log("Siker?"):null;
                drawContext.stroke();
            }
        }
    }

}


export  {Hatch};