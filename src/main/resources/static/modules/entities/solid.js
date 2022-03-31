import {Entity} from "../entity.js";
import {drawSheet,defaultLineWidth,logLevel} from "../animate.js";

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

export {EntitySolid};