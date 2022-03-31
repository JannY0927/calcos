let drawSheet = document.getElementById('sheet_backdraw');
let master = document.getElementById('master');
let defaultLineWidth = 1;
let logLevel = 2;

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
                console.log("findValueString this.Entityproperties[i].propertyValue)",this.Entityproperties[i].propertyValue);
                return this.Entityproperties[i].propertyValue;
            }
        }
        return null;

    }

    findValueNum(propertyType) {
        for (let i=0;i< this.Entityproperties.length;i++)   {
            if (this.Entityproperties[i].propertyType === propertyType) {
                console.log("findValueNum this.Entityproperties[i].propertyValue)",this.Entityproperties[i].propertyValue);
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

class EntityLine extends Entity {
    constructor(type,Entityproperties) {
        super(type, Entityproperties);
    }
    draw() {
        let drawContext = drawSheet.getContext('2d');
        drawContext.lineWidth = defaultLineWidth;
        drawContext.lineCap = 'square';
        drawContext.strokeStyle = '#ffffff';
        drawContext.beginPath();
        let point = this.getPoint(" 10"," 20");
        drawContext.moveTo(point.x,point.y);
        point = this.getPoint(" 11"," 21");
        drawContext.lineTo(point.x,point.y);
        drawContext.stroke();

    }

}

class  EntityCircle extends Entity {
    constructor(type,Entityproperties) {
        super(type, Entityproperties);
    }

    draw() {
        let drawContext = drawSheet.getContext('2d');
        drawContext.lineWidth = this.findValueNum(' 39')==null ? defaultLineWidth : this.findValueNum(' 39');
        drawContext.strokeStyle = "#ffffff";
        drawContext.beginPath();
        //console.log("CIRCLE",this.Entityproperties);
        //console.log("drawContext.lineWidth",drawContext.lineWidth);
        drawContext.arc(
            this.findValueFloat(' 10'),
            this.findValueFloat(' 20'),
            this.findValueFloat(' 40'),0, Math.PI * 2, true
        );
        drawContext.stroke();
    }

}

class  EntityArc extends Entity {
    constructor(type,Entityproperties) {
        super(type, Entityproperties);
    }

    draw() {
        let drawContext = drawSheet.getContext('2d');
        drawContext.lineWidth = this.findValueNum(' 39')==null ? defaultLineWidth : this.findValueNum(' 39');
        drawContext.strokeStyle = "#ffffff";
        drawContext.beginPath();
        //console.log("ARC",this.Entityproperties);
        //console.log("drawContext.lineWidth",drawContext.lineWidth);
        drawContext.arc(
            this.findValueFloat(' 10'),//kezdő pont koordináta
            this.findValueFloat(' 20'),//kezdő pont koordináta
            this.findValueFloat(' 40'),//sugár
            Math.PI/180*-1*(this.findValueFloat(' 50')-360),//kezdúszög
            Math.PI/180*-1*(this.findValueFloat(' 51')-360),//végszög
            this.findValueNum('210') =='1' ? false : true //Extrusion direction (optional; default = 0, 0, 1)
        );
        drawContext.stroke();
    }

}

class  EntityAttDef extends Entity {
    constructor(type,Entityproperties) {
        super(type, Entityproperties);
    }

    draw() {
        let drawContext = drawSheet.getContext('2d');
        drawContext.font = this.findValueNum(' 40')==null ? 10 : this.findValueNum(' 40')+"px serif";
        drawContext.fillStyle = "#ffffff";
        drawContext.beginPath();
        drawContext.fillText(
            this.findValueString(' 1'),
            this.findValueFloat(' 10'),
            this.findValueFloat(' 20')
        );
        drawContext.stroke();
    }

}

class  EntityAttRib extends Entity {
    constructor(type,Entityproperties) {
        super(type, Entityproperties);
    }

    draw(){
        let drawContext = drawSheet.getContext('2d');
        drawContext.font = this.findValueNum(' 40')==null ? 10 : this.findValueNum(' 40')+"px serif";
        drawContext.fillStyle = "#ffffff";
        drawContext.beginPath();
        drawContext.fillText(
            this.findValueString(' 1'),
            this.findValueFloat(' 10'),
            this.findValueFloat(' 20')
        );
        drawContext.stroke();
    }

}

class EntityText extends Entity {
    constructor(type,Entityproperties) {
        super(type, Entityproperties);
    }

    draw() {
        let drawContext = drawSheet.getContext('2d');
        drawContext.font = this.findValueNum(' 40')==null ? 10 : this.findValueNum(' 40')+"px serif";
        drawContext.fillStyle = "#ffffff";
        drawContext.beginPath();
        drawContext.fillText(
            this.findValueString('  1'),
            this.findValueFloat(' 10'),
            this.findValueFloat(' 20'),
            this.findValueFloat( ' 41')
        );
        drawContext.stroke();
    }

}

class EntityMText extends Entity {
    constructor(type,Entityproperties) {
        super(type, Entityproperties);
    }

    draw() {
        let drawContext = drawSheet.getContext('2d');
        drawContext.font = this.findValueNum(' 40')==null ? 10 : this.findValueNum(' 40')+"px serif";
        drawContext.fillStyle = "#ffffff";
        drawContext.beginPath();
        console.log("MTEXThez.",this.Entityproperties);
        drawContext.fillText(
            this.findValueString('  1'),
            this.findValueFloat( ' 10'),
            this.findValueFloat( ' 20'),
            this.findValueFloat( ' 41'),

        );
        drawContext.stroke();
    }

}

class EntityHatch extends Entity {
    constructor(type, Entityproperties) {
        super(type, Entityproperties);
    }

    getAllPoints(){
        let points = [];
        console.log("ActiualpointsLEEEETTTT",points);
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
        console.log("this.Entityproperties HaTCH", this.Entityproperties);
        for (let i=0;i< this.Entityproperties.length;i++) {
            console.log(hatchType);
            if (this.Entityproperties[i].propertyType === ' 72'){
                hatchType = this.Entityproperties[i].propertyValue;
                point = {};
            }
            if (hatchType === '     0') {
                console.log('HAtch rajz hatchType0',this.Entityproperties[i].propertyType,this.Entityproperties[i].propertyValue);
                console.log('HAtch rajz hatchType0 POINT BEFORE',point);
                this.Entityproperties[i].propertyType == ' 10' ? point.startX = this.Entityproperties[i].propertyValue : null;
                this.Entityproperties[i].propertyType == ' 20' ? point.startY = this.Entityproperties[i].propertyValue : null;
                this.Entityproperties[i].propertyType == ' 11' ? point.endX = this.Entityproperties[i].propertyValue : null;
                this.Entityproperties[i].propertyType == ' 21' ? point.endY = this.Entityproperties[i].propertyValue : null;
                console.log('HAtch rajz hatchType0 POINT after',point);
                console.log('point.startX != null && point.startY != null && point.endX != null && point.endX != null',point.startX != null,point.startY != null ,point.endX != null,point.endX != null,point)
                if (point.startX != null && point.startY != null && point.endX != null && point.endX != null) {
                    console.log("hatchType push előtt",hatchType);
                    point.hatchType = hatchType;
                    points.push(point)
                    point = {};
                }
            }

            //Poliline rajzolás
            if (hatchType === '     1') {
                console.log('HAtch rajz hatchType1',this.Entityproperties[i].propertyType,this.Entityproperties[i].propertyValue);
                console.log('HAtch rajz hatchType1 POINT before1',point);

                if (point.startX != null && point.startY != null&&(this.Entityproperties[i].propertyType === ' 42'||this.Entityproperties[i].propertyType === ' 10')) {
                    this.Entityproperties[i].propertyType === ' 42' ? point.b = this.Entityproperties[i].propertyValue == null ? 0.0 : this.Entityproperties[i].propertyValue : null;
                    point.hatchType = hatchType;
                    console.log("hatchType push előtt",hatchType,"point.hatchType",hatchType,'point',point.hatchType);
                    points.push(point)
                    console.log("hatchType push után",hatchType,"point.hatchType",hatchType,'point',point.hatchType);
                    point = {};
                    console.log("pont törlés után",point);
                }
                console.log('HAtch rajz hatchType1 POINT before2',point);
                this.Entityproperties[i].propertyType === ' 10' ? point.startX = this.Entityproperties[i].propertyValue == null ? 0.0 : this.Entityproperties[i].propertyValue : null;
                this.Entityproperties[i].propertyType === ' 20' ? point.startY = this.Entityproperties[i].propertyValue == null ? 0.0 : this.Entityproperties[i].propertyValue : null;
                console.log('HAtch rajz hatchType1 POINT after',point);

            }
            //Arc rajzolás
            if (hatchType === '     2') {
                console.log('HAtch rajz hatchType2',this.Entityproperties[i].propertyType,this.Entityproperties[i].propertyValue);
                console.log('HAtch rajz hatchType2 POINT before1',point);

                if (point.startX != null && point.startY != null && point.radius != null && point.startrato != null &&
                    point.endrato != null &&
                    (this.Entityproperties[i].propertyType === ' 73'||this.Entityproperties[i].propertyType === ' 10'))
                {
                    point.hatchType = hatchType;
                    this.Entityproperties[i].propertyType === ' 73' ? point.clockWise = this.Entityproperties[i].propertyValue == null ? true : this.Entityproperties[i].propertyValue : null;
                    console.log("hatchType push előtt",hatchType,"point.hatchType",hatchType,'point',point.hatchType);
                    points.push(point)
                    console.log("hatchType push után",hatchType,"point.hatchType",hatchType,'point',point.hatchType);
                    point = {};
                    console.log("pont törlés után",point);
                }
                console.log('HAtch rajz hatchType2 POINT before2',point);
                this.Entityproperties[i].propertyType === ' 10' ? point.startX = this.Entityproperties[i].propertyValue == null ? 0.0 : this.Entityproperties[i].propertyValue : null;
                this.Entityproperties[i].propertyType === ' 20' ? point.startY = this.Entityproperties[i].propertyValue == null ? 0.0 : this.Entityproperties[i].propertyValue : null;
                this.Entityproperties[i].propertyType === ' 40' ? point.radius = this.Entityproperties[i].propertyValue == null ? 0.0 : this.Entityproperties[i].propertyValue : null;
                this.Entityproperties[i].propertyType === ' 50' ? point.startrato = this.Entityproperties[i].propertyValue == null ? 0.0 : this.Entityproperties[i].propertyValue : null;
                this.Entityproperties[i].propertyType === ' 51' ? point.endrato = this.Entityproperties[i].propertyValue == null ? 0.0 : this.Entityproperties[i].propertyValue : null;
                console.log('HAtch rajz hatchType2 POINT after',point);
            }


            console.log("Actiualpoints",points);
        }
        console.log("Allpoints",points);
        return points;
    }


    draw() {
        let drawContext = drawSheet.getContext('2d');
        drawContext.lineWidth = this.findValueNum(' 39')==null ? defaultLineWidth : this.findValueNum(' 39');
        drawContext.strokeStyle = "#ffffff";
        drawContext.beginPath();
        let points = []
        console.log("ActiualpointsLEEEETTTT points_DRW",points);
        points = this.getAllPoints();
        console.log("ActiualpointsLEEEETTTT  points_DRW",points);
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
                    console.log("WithoutB p1",p1,"p2",p2);
                    drawContext.beginPath();
                    drawContext.moveTo(p1.x, p1.y, p1.z);
                    drawContext.lineTo(p2.x, p2.y, p2.z);
                    console.log(" (points[i].hatchType = '     0') points[i]",points[i].hatchType,points[i]);
                    drawContext.stroke();
                }
                if (p1.b > 0.0 || p1.b < 0.0) {
                    console.log("WithB p1",p1,"p2",p2);
                    this.drawBulgeBetweenTwoPoints(p1, p2, drawContext);
                }
            }
            if (points[i].hatchType === '     0') {
                console.log('HAtch rajz hatchType0',this.Entityproperties[i].propertyType,this.Entityproperties[i].propertyValue);
                console.log('HAtch rajz hatchType0 POINT BEFORE',point);
                console.log("points[i]",points[i]);
                console.log(this.Entityproperties);
                drawContext.beginPath();
                console.log(" (points[i].hatchType = '     0') points[i]",points[i].hatchType,points[i]);
                drawContext.moveTo(points[i].startX, points[i].startY);
                drawContext.lineTo(points[i].endX, points[i].endY);
                drawContext.stroke();
            }
            if (points[i].hatchType === '     2') {
                drawContext.beginPath();
                drawContext.strokeStyle = "#FF0000";
                console.log("hatch2 LOG",points[i]);
                drawContext.arc(
                    points[i].startX,//kezdő pont koordináta
                    points[i].startY,//kezdő pont koordináta
                    points[i].radius,//sugár
                    Math.PI/180*-1*(points[i].startrato-360),//kezdúszög
                    Math.PI/180*-1*(points[i].endrato-360),//végszög
                    points[i].clockWise =='1' ? false : true //Extrusion direction (optional; default = 0, 0, 1)
                );
                console.log("Siker?");
                drawContext.stroke();
            }
        }
    }

}

class EntityLWPolyline extends Entity {
    constructor(type, Entityproperties) {
        super(type, Entityproperties);
    }

    draw() {
        let drawContext = drawSheet.getContext('2d');
        drawContext.lineWidth = this.findValueNum(' 43')==null ? defaultLineWidth : this.findValueNum(' 43');
        drawContext.strokeStyle = "#ffffff";
        drawContext.beginPath();
        let points = [];
        console.log('LWPolyLine Start')
        this.isHasValue(42) ? points = super.getAllPoints(true ," 42")
            : points = super.getAllPoints(false );
        console.log("Lne",points.length);
        for (let i = 0; i < points.length; i++) {
            console.log(points[i]);
            let p1 = points[i];
            let p2 = null;

            if (p1 !== points[(points.length) - 1]) {
                console.log("Vége pont")
                p2 = points[i + 1];
            }
            else {
                if (this.findValueNum(' 70')== 1) {
                    console.log("P2 after", p2)
                    p2 = points[0];
                }
                else {
                    console.log("P2 afte elser", p2)
                    p2 = points[i];
                }
            }

            if (p1.b === 0.0 || p1.b == null) {
                console.log('LWPolyLine Start LINE p1: ',p1,' p2 ',p2);
                drawContext.beginPath();
                drawContext.moveTo(p1.x, p1.y);
                drawContext.lineTo(p2.x, p2.y);
                drawContext.stroke();

            }
            if (p1.b > 0.0 || p1.b < 0.0) {
                console.log('LWPolyLine Start Bulge')
                this.drawBulgeBetweenTwoPoints(p1, p2, drawContext);
            }
        }
    }

}

class Entity3DFace extends Entity {
    constructor(type,Entityproperties) {
        super(type, Entityproperties);
    }

    draw() {
        let drawContext = drawSheet.getContext('2d');
        drawContext.lineWidth = this.findValueNum(' 39')==null ? defaultLineWidth : this.findValueNum(' 39');
        let binaryLineVisibility = String(this.findValueNum(' 70')==null ? 0 : this.findValueNum(' 70').toString(2)).padStart(4,'0');
        drawContext.beginPath();
        if (binaryLineVisibility.charAt(3)==='0') {
            console.log('1line');

            drawContext.moveTo(this.findValueFloat(' 10'),this.findValueFloat(' 20'))
            drawContext.lineTo(this.findValueFloat(' 11'),this.findValueFloat(' 21'))
        }
        if (binaryLineVisibility.charAt(2)==='0') {
            console.log('2line');
            drawContext.moveTo(this.findValueFloat(' 11'),this.findValueFloat(' 21'))
            drawContext.lineTo(this.findValueFloat(' 12'),this.findValueFloat(' 22'))
        }
        if (binaryLineVisibility.charAt(1)==='0') {
            console.log('3line');
            drawContext.moveTo(this.findValueFloat(' 12'),this.findValueFloat(' 22'))
            drawContext.lineTo(this.findValueFloat(' 13'),this.findValueFloat(' 23'))
        }
        if (binaryLineVisibility.charAt(0)==='0') {
            console.log('4line');
            drawContext.moveTo(this.findValueFloat(' 13'),this.findValueFloat(' 23'))
            drawContext.lineTo(this.findValueFloat(' 10'),this.findValueFloat(' 20'))
        }
        drawContext.stroke();
    }

}

class  EntityPoint extends Entity {
    constructor(type,Entityproperties) {
        super(type, Entityproperties);
    }

    draw() {
        let drawContext = drawSheet.getContext('2d');
        drawContext.strokeStyle = "#ffffff";
        drawContext.beginPath();
        drawContext.arc(this.findValueFloat(' 10'),this.findValueFloat(' 20'),
            this.findValueNum(' 39'),0, Math.PI * 2, true);
        drawContext.fill();
    }

}

class EntitySolid extends Entity {
    constructor(type,Entityproperties) {
        super(type, Entityproperties);
    }

    draw() {
        let drawContext = drawSheet.getContext('2d');
        drawContext.beginPath();
        drawContext.lineWidth = this.findValueNum(' 39')==null ? defaultLineWidth : this.findValueNum(' 39');
        drawContext.strokeStyle = "#ffffff";
        drawContext.fillStyle = "#ffffff";

        drawContext.moveTo(this.findValueFloat(' 10'),this.findValueFloat(' 20'))
        drawContext.lineTo(this.findValueFloat(' 11'),this.findValueFloat(' 21'))
        drawContext.lineTo(this.findValueFloat(' 12'),this.findValueFloat(' 22'))


        if (this.findValueFloat(' 13') > 0) {
            drawContext.lineTo(this.findValueFloat(' 13'),this.findValueFloat(' 23'));
            drawContext.lineTo(this.findValueFloat(' 10'),this.findValueFloat(' 20'));
        }
        else
            drawContext.lineTo(this.findValueFloat(' 10'),this.findValueFloat(' 20'));
    drawContext.fill();
    }
}


class EntityProperty{
    constructor(propertyType,propertyValue) {
        this.propertyType = propertyType;
        this.propertyValue = propertyValue;
    }
}

function fitCircleToPoints(x1, y1, x2, y2, x3, y3) {
    var x, y, u;
    const slopeA = (x2 - x1) / (y1 - y2); // slope of vector from point 1 to 2
    const slopeB = (x3 - x2) / (y2 - y3); // slope of vector from point 2 to 3
    if (slopeA === slopeB) {
        return
    } // Slopes are same thus 3 points form striaght line. No circle can fit.
    if (y1 === y2) {   // special case with points 1 and 2 have same y
        x = ((x1 + x2) / 2);
        y = slopeB * x + (((y2 + y3) / 2) - slopeB * ((x2 + x3) / 2));
    } else if (y2 === y3) { // special case with points 2 and 3 have same y
        x = ((x2 + x3) / 2);
        y = slopeA * x + (((y1 + y2) / 2) - slopeA * ((x1 + x2) / 2));
    } else {
        x = ((((y2 + y3) / 2) - slopeB * ((x2 + x3) / 2)) - (u = ((y1 + y2) / 2) - slopeA * ((x1 + x2) / 2))) / (slopeA - slopeB);
        y = slopeA * x + u;
    }
    console.log(x,y);
    return {
        x, y,
        radius: ((x1 - x) ** 2 + (y1 - y) ** 2) ** 0.5
    };


}

//KI kell találni hova kerül az arány, és melyik részét hogyan fogom tudni írni.

function animateCanvas(dxfFileEntityData) {
    console.log("ez a fájlopm",dxfFileEntityData);
    let entity = new Entity;
    let jsonEntities = [];
    let jsonEntityProperties = [];
    let picSize = {minX : 0,minY:0, maxX : 0,maxY:0};

    master.style.animation = "zoomIn 2s";
    drawSheet.width = (window.innerWidth*0.9);
    drawSheet.height = (window.innerHeight*0.9);
    
    picSize.minX = parseFloat(dxfFileEntityData.entities[0].entityProperties[0].value);
    picSize.minY = parseFloat(dxfFileEntityData.entities[0].entityProperties[1].value);
    picSize.maxX = parseFloat(dxfFileEntityData.entities[1].entityProperties[0].value);
    picSize.maxY = parseFloat(dxfFileEntityData.entities[1].entityProperties[1].value);

    console.log("drawSheet.width ",drawSheet.width,"drawSheet.height",drawSheet.height);

    const dxfFilewithEntities = new DXFFile(dxfFileEntityData.filename,jsonEntities,picSize,drawSheet.width-220,drawSheet.height-20);

    console.log("rate",dxfFilewithEntities.dxfScreenRate, " " ,dxfFilewithEntities.dxfShiftValue)
    for (let i = 0;i<dxfFileEntityData.entities.length;i++) {
        logLevel >5 ? console.log("Entiti", dxfFileEntityData.entities[i].type):null;
        jsonEntityProperties = [];
        for (let j = 0; j < dxfFileEntityData.entities[i].entityProperties.length; j++) {
            const entityProperty = new EntityProperty(dxfFileEntityData.entities[i].entityProperties[j].propertyType, dxfFileEntityData.entities[i].entityProperties[j].value);
            logLevel >5 ? console.log("entityProperty",entityProperty):null;
            if (dxfFileEntityData.entities[i].type != "$EXTMAX" ||dxfFileEntityData.entities[i].type != "$EXTMIN")
	            if (entityProperty.propertyType === " 10"||entityProperty.propertyType === " 11"||entityProperty.propertyType === " 12"||entityProperty.propertyType === " 13") {
                    logLevel >5 ? console.log("xes",entityProperty.propertyValue):null;
	            	entityProperty.propertyValue = parseFloat(entityProperty.propertyValue) + parseFloat(dxfFilewithEntities.dxfShiftValue.x);
                    logLevel >5 ? console.log("xes1",entityProperty.propertyValue," EGYEbe ",parseFloat(entityProperty.propertyValue)," !",parseFloat(dxfFilewithEntities.dxfShiftValue.x)):null;
	            	entityProperty.propertyValue = parseFloat(entityProperty.propertyValue) * parseFloat(dxfFilewithEntities.dxfScreenRate);
                    logLevel >5 ? console.log("xes2",entityProperty.propertyValue):null;
	            }
	            if (entityProperty.propertyType === " 20"||entityProperty.propertyType === " 21"||entityProperty.propertyType === " 22"||entityProperty.propertyType === " 23") {
                    logLevel >5 ? console.log("yes",entityProperty.propertyValue):null;
	            	entityProperty.propertyValue = parseFloat(entityProperty.propertyValue) + parseFloat(dxfFilewithEntities.dxfShiftValue.y);
                    logLevel >5 ? console.log("yes1",entityProperty.propertyValue):null;
	            	entityProperty.propertyValue = drawSheet.height-20 - parseFloat(entityProperty.propertyValue) * parseFloat(dxfFilewithEntities.dxfScreenRate);
                    logLevel >5 ? console.log("yes2",entityProperty.propertyValue):null;
	            }
	            if (entityProperty.propertyType === " 40"||entityProperty.propertyType === " 41") {
                    logLevel >5 ? console.log("distes1",entityProperty.propertyValue):null;
                    entityProperty.propertyValue = parseFloat(entityProperty.propertyValue) * parseFloat(dxfFilewithEntities.dxfScreenRate);
                    logLevel >5 ? console.log("distes2",entityProperty.propertyValue):null;
            }
            jsonEntityProperties.push(entityProperty)
        }

        switch (dxfFileEntityData.entities[i].type) {
            case "LINE":
                entity = new EntityLine(dxfFileEntityData.entities[i].type, jsonEntityProperties);
                jsonEntities.push(entity);
                break;
            case "CIRCLE":
                entity = new EntityCircle(dxfFileEntityData.entities[i].type, jsonEntityProperties);
                jsonEntities.push(entity);
                break;
            case "ARC":
                entity = new EntityArc(dxfFileEntityData.entities[i].type, jsonEntityProperties);
                jsonEntities.push(entity);
                break;
            case "ATTDEF":
                entity = new EntityAttDef(dxfFileEntityData.entities[i].type, jsonEntityProperties);
                jsonEntities.push(entity);
                break;
            case "ATTRIB":
                entity = new EntityAttRib(dxfFileEntityData.entities[i].type, jsonEntityProperties);
                jsonEntities.push(entity);
                break;
            case "TEXT":
                entity = new EntityText(dxfFileEntityData.entities[i].type, jsonEntityProperties);
                jsonEntities.push(entity);
                break;
            case "MTEXT":
                entity = new EntityMText(dxfFileEntityData.entities[i].type, jsonEntityProperties);
                jsonEntities.push(entity);
                break;
            case "3DFACE":
                entity = new Entity3DFace(dxfFileEntityData.entities[i].type, jsonEntityProperties);
                jsonEntities.push(entity);
                break;
            case "HATCH":
                entity = new EntityHatch(dxfFileEntityData.entities[i].type, jsonEntityProperties);
                jsonEntities.push(entity);
                break;
            case "LWPOLYLINE":
                entity = new EntityLWPolyline(dxfFileEntityData.entities[i].type, jsonEntityProperties);
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
        logLevel >7 ? console.log(jsonEntityProperties) : null;
    }
    
    
    
    master.style.animation = "zoomIn 2s";
    drawSheet.width = window.innerWidth*0.9;
    drawSheet.height = window.innerHeight*0.9;

    let drawContext = drawSheet.getContext('2d');

    drawContext.beginPath();
    drawContext.font = '15px serif';
    drawContext.fillStyle = "#ffffff";
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