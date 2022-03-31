import {Entity} from "../entity.js";
import {drawSheet,defaultLineWidth,logLevel} from "../animate.js";


class Lwpolyline extends Entity {
    constructor(type, Entityproperties) {
        super(type, Entityproperties);
    }

    draw() {
        let drawContext = drawSheet.getContext('2d');
        drawContext.lineWidth = this.findValueNum(' 43')==null ? defaultLineWidth : this.findValueNum(' 43');
        drawContext.strokeStyle = "#ffffff";
        drawContext.beginPath();
        let points = [];
        logLevel >5 ? console.log('LWPolyLine Start'):null;
        this.isHasValue(42) ? points = super.getAllPoints(true ," 42")
            : points = super.getAllPoints(false );
        logLevel >5 ? console.log("Lne",points.length):null;
        for (let i = 0; i < points.length; i++) {
            logLevel >5 ? console.log(points[i]):null;
            let p1 = points[i];
            let p2 = null;

            if (p1 !== points[(points.length) - 1]) {
                logLevel >5 ? console.log("Vége pont"):null
                p2 = points[i + 1];
            }
            else {
                if (this.findValueNum(' 70')== 1) {
                    logLevel >5 ? console.log("P2 after", p2):null
                    p2 = points[0];
                }
                else {
                    logLevel >5 ? console.log("P2 afte elser", p2):null
                    p2 = points[i];
                }
            }

            if (p1.b === 0.0 || p1.b == null) {
                logLevel >5 ? console.log('LWPolyLine Start LINE p1: ',p1,' p2 ',p2):null;
                drawContext.beginPath();
                drawContext.moveTo(p1.x, p1.y);
                drawContext.lineTo(p2.x, p2.y);
                drawContext.stroke();

            }
            if (p1.b > 0.0 || p1.b < 0.0) {
                logLevel >5 ? console.log('LWPolyLine Start Bulge'):null
                this.drawBulgeBetweenTwoPoints(p1, p2, drawContext);
            }
        }
    }

}

export {Lwpolyline};