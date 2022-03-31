import {Entity} from "../entity.js";
import {drawSheet,defaultLineWidth,logLevel} from "../animate.js";

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
            logLevel > 6 ? console.log('1line'):null;
            drawContext.moveTo(this.findValueFloat(' 10'),this.findValueFloat(' 20'))
            drawContext.lineTo(this.findValueFloat(' 11'),this.findValueFloat(' 21'))
        }
        if (binaryLineVisibility.charAt(2)==='0') {
            logLevel > 6 ? console.log('2line'):null;
            drawContext.moveTo(this.findValueFloat(' 11'),this.findValueFloat(' 21'))
            drawContext.lineTo(this.findValueFloat(' 12'),this.findValueFloat(' 22'))
        }
        if (binaryLineVisibility.charAt(1)==='0') {
            logLevel > 6 ? console.log('3line'):null;
            drawContext.moveTo(this.findValueFloat(' 12'),this.findValueFloat(' 22'))
            drawContext.lineTo(this.findValueFloat(' 13'),this.findValueFloat(' 23'))
        }
        if (binaryLineVisibility.charAt(0)==='0') {
            logLevel > 6 ? console.log('4line'):null;
            drawContext.moveTo(this.findValueFloat(' 13'),this.findValueFloat(' 23'))
            drawContext.lineTo(this.findValueFloat(' 10'),this.findValueFloat(' 20'))
        }

        drawContext.stroke();
    }

}

export {Entity3DFace};