import {Entity} from "../entity.js";
import {drawSheet,defaultLineWidth,logLevel} from "../animate.js";

class Arc extends Entity {
    constructor(type,Entityproperties) {
        super(type, Entityproperties);
    }

    draw() {
        let drawContext = drawSheet.getContext('2d');
        drawContext.lineWidth = this.findValueNum(' 39')==null ? defaultLineWidth : this.findValueNum(' 39');
        drawContext.strokeStyle = "#ffffff";
        drawContext.beginPath();
        logLevel > 6 ? console.log("ARC",this.Entityproperties):null;
        logLevel > 6 ? console.log("drawContext.lineWidth",drawContext.lineWidth):null;
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

export {Arc}