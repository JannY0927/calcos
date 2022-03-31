import {Entity} from "../entity.js";
import {drawSheet,defaultLineWidth,logLevel} from "../animate.js";

class Circle extends Entity {
    constructor(type,Entityproperties) {
        super(type, Entityproperties);
    }

    draw() {
        let drawContext = drawSheet.getContext('2d');
        drawContext.lineWidth = this.findValueNum(' 39')==null ? defaultLineWidth : this.findValueNum(' 39');
        drawContext.strokeStyle = "#ffffff";
        drawContext.beginPath();
        logLevel > 6 ? console.log("CIRCLE",this.Entityproperties):null;
        logLevel > 6 ? console.log("drawContext.lineWidth",drawContext.lineWidth):null;
        drawContext.arc(
            this.findValueFloat(' 10'),
            this.findValueFloat(' 20'),
            this.findValueFloat(' 40'),0, Math.PI * 2, true
        );
        drawContext.stroke();
    }

}

export {Circle};