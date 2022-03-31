import {Entity} from "../entity.js";
import {drawSheet,defaultLineWidth,logLevel} from "../animate.js";

class Line extends Entity {
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

export {Line};