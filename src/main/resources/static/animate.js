
let drawSheet = document.getElementById('sheet_backdraw');
let master = document.getElementById('master');
let defaultLineWidth = 3;

class DXFFile  {
    constructor(fileName,Entities,mySize,screenSizeX,screenSizeY) {
        this.fileName = fileName;
        this.Entities = Entities;
        this.mySize = mySize;
        this.dxfScreenRate = {x: screenSizeX /(this.mySize.maxX - this.mySize.minX),
			     			  y: screenSizeY /(this.mySize.maxY - this.mySize.minY)};
		this.dxfShiftValue = {x: 0-mySize.minX,
							  y: 0-mySize.minY}		     			 
	}
}


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
                return this.Entityproperties[i].propertyValue;
            }
        }

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

    getAllPoints(isHasBulge41,bulgeType){
        let points = []
        let point = {};
        for (let i=0;i< this.Entityproperties.length;i++)   {

            this.Entityproperties[i].propertyType === ' 10' ? point.x = this.Entityproperties[i].propertyValue == null ? 0.0 : this.Entityproperties[i].propertyValue : null;
            this.Entityproperties[i].propertyType === ' 20' ? point.y = this.Entityproperties[i].propertyValue == null ? 0.0 : this.Entityproperties[i].propertyValue : null;
            this.Entityproperties[i].propertyType === bulgeType ? point.b = this.Entityproperties[i].propertyValue == null ? 0.0 : this.Entityproperties[i].propertyValue : null;
            if (isHasBulge41) {
                if (point.x != null && point.y != null && point.y != null && point.b != null) {
                    points.push(point)
                    point = {};

                }
            }
            else  {
                if (point.x != null && point.y != null  && point.y != null) {
                    points.push(point)
                    point = {};

                }
            }
        }
        console.log(points)
        return points;
    }

    drawBulgeBetweenTwoPoints(p1, p2, drawContext) {
        //kiszámítjuk a szakasz hosszát
        let lengthOfSection = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
        //megkeressük a domborítandó szakasz közepét és eltároljuk mert-e körül fogunk forgatni.
        //Azért-e körül forgatunk, mert a 41-es entitasproperty a szakasz felét arányosítja.
        let middleOfSection = {
            x: ((p1.x + p2.x) / 2),
            y: ((p1.y + p2.y) / 2)
        }
        //A forgatandó pontot levisszük az origóba és
        // elforgatjuk 90 fokkal az óramutató járásaával ellentétesen
        let rotation90StartPoint = {
            x: (p1.y - middleOfSection.y),
            y: (-1 * (p1.x - middleOfSection.x))
        }
        //kiszámoljuk a domborítás tetejét, a dombortás arányát a 41-es entitáspoperty hordozza.
        let endPoint = {
            x: rotation90StartPoint.x * 1 / p1.b,
            y: rotation90StartPoint.y * 1 / p1.b
        }
        //megállapítjuk a szakszmerőleges hosszát.
        let perpendicularSectionLength = Math.sqrt(Math.pow(rotation90StartPoint.x, 2) + Math.pow(rotation90StartPoint.y, 2));
        //Ezután visszavisszük az eredeti helyére a végpontot.
        endPoint.x = endPoint.x + middleOfSection.x;
        endPoint.y = endPoint.y + middleOfSection.y;

        //Kiszámítjuk az ív bezárt szöget.
        //ehhez szükségeünk van a szakaszmerőleges hosszára, amit már kiszámoltunk,
        // mert úgy tudunk derékszögű háromszöggel számolni
        console.log("sines", lengthOfSection, perpendicularSectionLength);
        console.log("sin", (lengthOfSection / 2) / perpendicularSectionLength);

        //Látehozzuk a köré írható háromszöget
        let datas = fitCircleToPoints(p1.x, p1.y, p2.x, p2.y, endPoint.x, endPoint.y);
        console.log("sin", (lengthOfSection / 2) / datas.radius);

        //Meghatározzuk a szögeket
        let startAngle = Math.atan2(p1.y - datas.y, p1.x - datas.x);
        let endAngle = Math.atan2(p2.y - datas.y, p2.x - datas.x);

        console.log("Angles", startAngle, endAngle);
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
        drawContext.lineWidth = this.findValue(' 39')==null ? defaultLineWidth : this.findValue(' 39');
        drawContext.strokeStyle = "#ffffff";
        drawContext.beginPath();
        drawContext.arc(
            this.findValue(' 10'),
            this.findValue(' 20'),
            this.findValue(' 40'),0, Math.PI * 2, true
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
        drawContext.lineWidth = this.findValue(' 39')==null ? defaultLineWidth : this.findValue(' 39');
        drawContext.strokeStyle = "#ffffff";
        drawContext.beginPath();
        drawContext.arc(
            this.findValue(' 10'),//kezdő pont koordináta
            this.findValue(' 20'),//kezdő pont koordináta
            this.findValue(' 40'),//sugár
            this.findValue(' 50'),//kezdúszög
            this.findValue(' 51'),//végszög
            true
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
        drawContext.font = this.findValue(' 40')==null ? 10 : this.findValue(' 40')+"px serif";
        drawContext.fillStyle = "#ffffff";
        drawContext.beginPath();
        drawContext.fillText(
            this.findValue(' 1'),
            this.findValue(' 10'),
            this.findValue(' 20')
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
        drawContext.font = this.findValue(' 40')==null ? 10 : this.findValue(' 40')+"px serif";
        drawContext.fillStyle = "#ffffff";
        drawContext.beginPath();
        drawContext.fillText(
            this.findValue(' 1'),
            this.findValue(' 10'),
            this.findValue(' 20')
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
        drawContext.font = this.findValue(' 40')==null ? 10 : this.findValue(' 40')+"px serif";
        drawContext.fillStyle = "#ffffff";
        drawContext.beginPath();
        drawContext.fillText(
            this.findValue(' 1'),
            this.findValue(' 10'),
            this.findValue(' 20')
        );
        drawContext.stroke();
    }

}

class EntityHatch extends Entity {
    constructor(type, Entityproperties) {
        super(type, Entityproperties);
    }

    draw() {
        let drawContext = drawSheet.getContext('2d');
        drawContext.lineWidth = this.findValue(' 39')==null ? defaultLineWidth : this.findValue(' 39');
        drawContext.strokeStyle = "#ffffff";
        drawContext.beginPath();
        let points = [];
        points = this.getAllPoints(true," 41");

        points.shift();
        //első pontot ki kell hagyni mert az technikai a Hatch entitybe a tömb második elemétől indulunk
        for (let i = 0; i < points.length; i++) {
            let p1 = points[i];
            let p2 = null;

            console.log("Jani" ,p1, "masik",points[(points.length) - 1]);
            if (p1 !== points[(points.length) - 1]) {
                console.log("Jani")
                p2 = points[i + 1];
            } else {
                p2 = points[0];
            }
            console.log("p1",p1,"plen",points.length);
            console.log("p2",p2);
            if (p1.b === 0.0) {
                drawContext.beginPath();
                drawContext.moveTo(p1.x, p1.y, p1.z);
                drawContext.lineTo(p2.x, p2.y, p2.z);
                drawContext.stroke();
            }
            if (p1.b != 0.0) {
                this.drawBulgeBetweenTwoPoints(p1, p2, drawContext);
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
        drawContext.lineWidth = this.findValue(' 43')==null ? defaultLineWidth : this.findValue(' 43');
        drawContext.strokeStyle = "#ffffff";
        drawContext.beginPath();
        let points = [];
        console.log('LWPolyLine Start')
        points = this.getAllPoints(true," 42");
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
                if (this.findValue(' 70')== 1) {
                    console.log("P2 after", p2)
                    p2 = points[0];
                }
                else {
                    console.log("P2 afte elser", p2)
                    p2 = points[i];
                }
            }

            if (p1.b === 0.0) {
                console.log('LWPolyLine Start LINE p1: ',p1,' p2 ',p2);
                drawContext.beginPath();
                drawContext.moveTo(p1.x, p1.y);
                drawContext.lineTo(p2.x, p2.y);
                drawContext.stroke();

            }
            if (p1.b != 0.0) {
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
        drawContext.lineWidth = this.findValue(' 39')==null ? defaultLineWidth : this.findValue(' 39');
        let binaryLineVisibility = String(this.findValue(' 70')==null ? 0 : this.findValue(' 70').toString(2)).padStart(4,'0');
        drawContext.beginPath();
        if (binaryLineVisibility.charAt(3)==='0') {
            console.log('1line');

            drawContext.moveTo(this.findValue(' 10'),this.findValue(' 20'))
            drawContext.lineTo(this.findValue(' 11'),this.findValue(' 21'))
        }
        if (binaryLineVisibility.charAt(2)==='0') {
            console.log('2line');
            drawContext.moveTo(this.findValue(' 11'),this.findValue(' 21'))
            drawContext.lineTo(this.findValue(' 12'),this.findValue(' 22'))
        }
        if (binaryLineVisibility.charAt(1)==='0') {
            console.log('3line');
            drawContext.moveTo(this.findValue(' 12'),this.findValue(' 22'))
            drawContext.lineTo(this.findValue(' 13'),this.findValue(' 23'))
        }
        if (binaryLineVisibility.charAt(0)==='0') {
            console.log('4line');
            drawContext.moveTo(this.findValue(' 13'),this.findValue(' 23'))
            drawContext.lineTo(this.findValue(' 10'),this.findValue(' 20'))
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
        drawContext.arc(this.findValue(' 10'),this.findValue(' 20'),
            this.findValue(' 39'),0, Math.PI * 2, true);
        drawContext.fill();
    }

}

class EntitySolid extends Entity {
    constructor(type,Entityproperties) {
        super(type, Entityproperties);
    }

    draw() {
        let drawContext = drawSheet.getContext('2d');
        drawContext.lineWidth = this.findValue(' 39')==null ? defaultLineWidth : this.findValue(' 39');
        drawContext.strokeStyle = "#ffffff";
        drawContext.fillStyle = "#ffffff";
        drawContext.beginPath();

        drawContext.moveTo(this.findValue(' 10'),this.findValue(' 20'))
        drawContext.lineTo(this.findValue(' 11'),this.findValue(' 21'))

        drawContext.lineTo(this.findValue(' 12'),this.findValue(' 22'))


        if (this.findValue(' 13') > 0)
            drawContext.lineTo(this.findValue(' 13'),this.findValue(' 23'));
        else
            drawContext.lineTo(this.findValue(' 10'),this.findValue(' 20'));
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

function findValue(entityProperties,propertyType) {
    for (let i=0;i< entityProperties.length;i++)   {
        if (entityProperties[i].propertyType === propertyType) {
            return entityProperties[i].propertyValue;
        }
    }

}

//KI kell találni hova kerül az arány, és melyik részét hogyan fogom tudni írni.

function animateCanvas(dxfFileEntityData) {
    console.log("ez a fájlopm",dxfFileEntityData);
    let jsonEntities = [];
    let jsonEntityProperties = [];
    picSize = {minX : 0,minY:0, maxX : 0,maxY:0};
    
    master.style.animation = "zoomIn 2s";
    drawSheet.width = window.innerWidth*0.9;
    drawSheet.height = window.innerHeight*0.9;
    
    picSize.minX = dxfFileEntityData.entities[0].entityProperties[1];
    picSize.minY = dxfFileEntityData.entities[0].entityProperties[2];
    picSize.maxX = dxfFileEntityData.entities[1].entityProperties[1];
    picSize.maxY = dxfFileEntityData.entities[1].entityProperties[2];
    
    const dxfFilewithEntities = new DXFFile(dxfFileEntityData.filename,jsonEntities,picSize,drawSheet.width,drawSheet.height);
    
    for (let i = 0;i<dxfFileEntityData.entities.length;i++) {
        console.log("Entiti", dxfFileEntityData.entities[i].type)
        jsonEntityProperties = [];
        for (let j = 0; j < dxfFileEntityData.entities[i].entityProperties.length; j++) {
            const entityProperty = new EntityProperty(dxfFileEntityData.entities[i].entityProperties[j].propertyType, dxfFileEntityData.entities[i].entityProperties[j].value);
            console.log("entityProperty",entityProperty);
            console.log("rate",dxfFilewithEntities.dxfScreenRate, " " ,dxfFilewithEntities.dxfShiftValue)
            if (dxfFileEntityData.entities[i].type != "$EXTMAX" ||dxfFileEntityData.entities[i].type != "$EXTMIN")
	            if (entityProperty.propertyType === " 10") {
					console.log("xes",entityProperty.propertyValue)
	            	entityProperty.propertyValue = Number(entityProperty.propertyValue) + Number(dxfFilewithEntities.dxfShiftValue.x);
					console.log("xes1",entityProperty.propertyValue," EGYEbe ",Number(entityProperty.propertyValue)," !",Number(dxfFilewithEntities.dxfShiftValue.x))
	            	entityProperty.propertyValue = Number(entityProperty.propertyValue) * Number(dxfFilewithEntities.dxfScreenRate.x);
					console.log("xes2",entityProperty.propertyValue)
	            }
	            if (entityProperty.propertyType === " 20") { 
					console.log("yes",entityProperty.propertyValue)
	            	entityProperty.propertyValue = Number(entityProperty.propertyValue) + Number(dxfFilewithEntities.dxfShiftValue.y);
					console.log("yes1",entityProperty.propertyValue)
	            	entityProperty.propertyValue = Number(entityProperty.propertyValue) * Number(dxfFilewithEntities.dxfScreenRate.y);
					console.log("yes2",entityProperty.propertyValue)
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
            case "EntityText":
                entity = new EntityText(dxfFileEntityData.entities[i].type, jsonEntityProperties);
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
        console.log(jsonEntityProperties);
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