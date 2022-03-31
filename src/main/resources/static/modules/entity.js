import {drawSheet,defaultLineWidth,logLevel} from "./animate.js";
import {fitCircleToPoints} from "./calculation.js";


class Entity {
    constructor(type,Entityproperties) {
        this.type = type;
        this.Entityproperties = Entityproperties;
    }

    draw() {
    }

    findValueFloat(propertyType) {
        for (let i=0;i< this.Entityproperties.length;i++)   {
            if (this.Entityproperties[i].propertyType === propertyType) {
                return parseFloat(this.Entityproperties[i].propertyValue);
            }
        }
        return null;

    }

    findValueString(propertyType) {
        for (let i=0;i< this.Entityproperties.length;i++)   {
            if (this.Entityproperties[i].propertyType === propertyType) {
                logLevel >5 ? console.log("findValueString this.Entityproperties[i].propertyValue)",this.Entityproperties[i].propertyValue):null
                return this.Entityproperties[i].propertyValue;
            }
        }
        return null;

    }

    findValueNum(propertyType) {
        for (let i=0;i< this.Entityproperties.length;i++)   {
            if (this.Entityproperties[i].propertyType === propertyType) {
                logLevel >5 ? console.log("findValueNum this.Entityproperties[i].propertyValue)",this.Entityproperties[i].propertyValue):null;
                return parseInt(this.Entityproperties[i].propertyValue);
            }
        }
        return null;

    }



    isHasValue(propertyType) {
        for (let i=0;i< this.Entityproperties.length;i++)   {
            if (this.Entityproperties[i].propertyType === propertyType) {
                return true;
            }
        }
        return false;
    }

    findValues(propertyType) {
        let entityPropertiesValue = [];
        for (let i=0;i< this.Entityproperties.length;i++)   {
            if (this.Entityproperties[i].propertyType === propertyType) {
                entityPropertiesValue[i].push(this.Entityproperties[i].propertyValue);
            }
        }
        return entityPropertiesValue;
    }

    getPoint(xType,yType){
        let point = {};
        for (let i=0;i< this.Entityproperties.length;i++)   {
            this.Entityproperties[i].propertyType === xType ? point.x = this.Entityproperties[i].propertyValue: null;
            this.Entityproperties[i].propertyType === yType ? point.y = this.Entityproperties[i].propertyValue: null;
            if (point.x != null && point.y != null) {
                break;
            }
        }
        return point;


    }

    getAllPoints(isHasBulge41,bulgeType,){
        let points_g = []
        logLevel >5 ? console.log("ActiualpointsLEEEETTTT points_g",points_g):null;
        let point_g = {};
        for (let i=0;i< this.Entityproperties.length;i++)   {

            this.Entityproperties[i].propertyType === ' 10' ? point_g.x = this.Entityproperties[i].propertyValue == null ? 0.0 : this.Entityproperties[i].propertyValue : null;
            this.Entityproperties[i].propertyType === ' 20' ? point_g.y = this.Entityproperties[i].propertyValue == null ? 0.0 : this.Entityproperties[i].propertyValue : null;
            this.Entityproperties[i].propertyType === bulgeType ? point.b = this.Entityproperties[i].propertyValue == null ? 1.0 : this.Entityproperties[i].propertyValue : null;
            if (isHasBulge41) {
                if (point_g.x != null && point_g.y != null && point_g.b != null) {
                    points_g.push(point_g)
                    point_g = {};

                }
            }
            else  {
                if (point_g.x != null && point_g.y != null) {
                    points_g.push(point_g)
                    point_g = {};

                }
            }
        }
        logLevel >5 ? console.log("Allpoints",points_g):null;
        return points_g;
    }

    drawBulgeBetweenTwoPoints(p1, p2, drawContext) {
        logLevel >5 ? console.log("p1",p1):null;
        logLevel >5 ? console.log("p2",p2):null;
        //kiszámítjuk a szakasz hosszát
        let lengthOfSection = Math.sqrt(Math.pow(p1.startX - p2.startX, 2) + Math.pow(p1.startY - p2.startY, 2));
        logLevel >5 ? console.log("lengthOfSection",lengthOfSection):null;
        //megkeressük a domborítandó szakasz közepét és eltároljuk mert-e körül fogunk forgatni.
        //Azért-e körül forgatunk, mert a 41-es entitaspropertstartY a szakasz felét aránstartYosítja.
        let middleOfSection = {
            x: ((p1.startX + p2.startX) / 2),
            y: ((p1.startY + p2.startY) / 2)
        }
        logLevel >5 ? console.log("middleOfSection",middleOfSection):null;
        //A forgatandó pontot levisszük az origóba és
        // elforgatjuk 90 fokkal az óramutató járásaával ellentétesen
        let rotation90StartPoint = {
            x: (p1.startY - middleOfSection.y),
            y: (-1 * (p1.startX - middleOfSection.x))
        }
        logLevel >5 ? console.log("rotation90StartPoint",rotation90StartPoint):null;
        //kiszámoljuk a domborítás tetejét, a dombortás arányát a 41-es entitáspoperty hordozza.
        let endPoint = {
            x: rotation90StartPoint.x * 1 / p1.b,
            y: rotation90StartPoint.y * 1 / p1.b
        }
        logLevel >5 ? console.log("endPoint",endPoint):null;
        //megállapítjuk a szakszmerőleges hosszát.
        let perpendicularSectionLength = Math.sqrt(Math.pow(rotation90StartPoint.x, 2) + Math.pow(rotation90StartPoint.y, 2));
        logLevel >5 ? console.log("perpendicularSectionLength",perpendicularSectionLength):null;
        //Ezután visszavisszük az eredeti helyére a végpontot.
        endPoint.x = endPoint.x + middleOfSection.x;
        endPoint.y = endPoint.y + middleOfSection.y;

        logLevel >5 ? console.log("NewendPoint",endPoint):null;
        //Kiszámítjuk az ív bezárt szöget.
        //ehhez szükségeünk van a szakaszmerőleges hosszára, amit már kiszámoltunk,
        // mert úgy tudunk derékszögű háromszöggel számolni
        //Látehozzuk a köré írható háromszöget
        let datas = fitCircleToPoints(p1.startX, p1.startY, p2.startX, p2.startY, endPoint.x, endPoint.y);
        logLevel >5 ? console.log("sin", (lengthOfSection / 2) / datas.radius):null;
        logLevel >5 ? console.log("datas",datas):null;
        //Meghatározzuk a szögeket
        let startAngle = Math.atan2(p1.startY - datas.y, p1.startX - datas.x);
        let endAngle = Math.atan2(p2.startY - datas.y, p2.startX - datas.x);
        logLevel >5 ? console.log("startAngle",startAngle):null;
        logLevel >5 ? console.log("startAngle",endAngle):null;
        //Forgásírány meghatározás
        let antiClockWise;
        if (p1.b > 0)
            antiClockWise = false;
        else
            antiClockWise = true;
        drawContext.beginPath();
        //Végre rajzolunk. Ez kemény volt! :-)
        drawContext.arc(datas.x, datas.y, datas.radius, startAngle, endAngle, antiClockWise);
        drawContext.stroke();
    }

}

export {Entity};