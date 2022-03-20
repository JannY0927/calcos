class Entity {
    constructor(type,Entityproperties) {
        this.type = type;
        this.Entityproperties = Entityproperties;
    }

    draw() {
    }

    findValue(propertyType) {
        for (let i=0;i< this.Entityproperties.length;i++)   {
            if (this.Entityproperties[i].propertyType === propertyType) {
                return parseFloat(this.Entityproperties[i].propertyValue);
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
        console.log("ActiualpointsLEEEETTTT points_g",points_g);
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
        console.log("Allpoints",points_g)
        return points_g;
    }

    drawBulgeBetweenTwoPoints(p1, p2, drawContext) {
        console.log("p1",p1);
        console.log("p2",p2);
        //kiszámítjuk a szakasz hosszát
        let lengthOfSection = Math.sqrt(Math.pow(p1.startX - p2.startX, 2) + Math.pow(p1.startY - p2.startY, 2));
        console.log("lengthOfSection",lengthOfSection);
        //megkeressük a domborítandó szakasz közepét és eltároljuk mert-e körül fogunk forgatni.
        //Azért-e körül forgatunk, mert a 41-es entitaspropertstartY a szakasz felét aránstartYosítja.
        let middleOfSection = {
            x: ((p1.startX + p2.startX) / 2),
            y: ((p1.startY + p2.startY) / 2)
        }
        console.log("middleOfSection",middleOfSection);
        //A forgatandó pontot levisszük az origóba és
        // elforgatjuk 90 fokkal az óramutató járásaával ellentétesen
        let rotation90StartPoint = {
            x: (p1.startY - middleOfSection.y),
            y: (-1 * (p1.startX - middleOfSection.x))
        }
        console.log("rotation90StartPoint",rotation90StartPoint);
        //kiszámoljuk a domborítás tetejét, a dombortás arányát a 41-es entitáspoperty hordozza.
        let endPoint = {
            x: rotation90StartPoint.x * 1 / p1.b,
            y: rotation90StartPoint.y * 1 / p1.b
        }
        console.log("endPoint",endPoint);
        //megállapítjuk a szakszmerőleges hosszát.
        let perpendicularSectionLength = Math.sqrt(Math.pow(rotation90StartPoint.x, 2) + Math.pow(rotation90StartPoint.y, 2));
        console.log("perpendicularSectionLength",perpendicularSectionLength);
        //Ezután visszavisszük az eredeti helyére a végpontot.
        endPoint.x = endPoint.x + middleOfSection.x;
        endPoint.y = endPoint.y + middleOfSection.y;

        console.log("NewendPoint",endPoint);
        //Kiszámítjuk az ív bezárt szöget.
        //ehhez szükségeünk van a szakaszmerőleges hosszára, amit már kiszámoltunk,
        // mert úgy tudunk derékszögű háromszöggel számolni
        //Látehozzuk a köré írható háromszöget
        let datas = fitCircleToPoints(p1.startX, p1.startY, p2.startX, p2.startY, endPoint.x, endPoint.y);
        //console.log("sin", (lengthOfSection / 2) / datas.radius);
        console.log("datas",datas);
        //Meghatározzuk a szögeket
        let startAngle = Math.atan2(p1.startY - datas.y, p1.startX - datas.x);
        let endAngle = Math.atan2(p2.startY - datas.y, p2.startX - datas.x);
        console.log("startAngle",startAngle);
        console.log("startAngle",endAngle);
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