import {Entity} from "../entity.js";
import {drawSheet,defaultLineWidth,logLevel} from "../animate.js";

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

export {EntityPoint};