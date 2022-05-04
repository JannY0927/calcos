import {logLevel} from "./animate.js";

function fitCircleToPoints(p1x, p1y, p2x, p2y, p3x, p3y) {
    var a, b, c;
    var leanA = (p2x-p1x)/(p1y-p2y);
    const leanB = (p3x-p2x) / (p2y-p3y);
    if (leanA === leanB) {
        return
    }
    if (p1y===p2y) {
        a = (p1x/2+p2x/2);
        b = leanB*a+((p2y/2+p3y/2) - leanB * (p2x/2 + p3x/2));
    } else if (p2y === p3y) {
        a = (p2x/2+p3x/2);
        b = leanA*a+((p1y/2+p2y/2)-leanA*(p1x/2+p2x/2));
    } else {
        c = c = (p1y/2+p2y/2)-leanA*(p1x/2 + p2x/2);
        a = (((p2y/2+p3y/2)-leanB*(p2x/2+p3x/2))-(c))/(leanA-leanB);
        b = leanA*a+c;
    }
    logLevel >5 ? console.log(a,b):null;
    return {
        x: a, y: b,
        radius: ((p1x-a)**2+(p1y-b)**2)**0.5
    };
}

export {fitCircleToPoints};