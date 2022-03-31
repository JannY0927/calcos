import {Entity} from "../entity.js";
import {drawSheet,defaultLineWidth,logLevel} from "../animate.js";

class Text extends Entity {
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

export {Text};