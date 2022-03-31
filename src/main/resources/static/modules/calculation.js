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
    logLevel >5 ? console.log(x,y):null;
    return {
        x, y,
        radius: ((x1 - x) ** 2 + (y1 - y) ** 2) ** 0.5
    };


}

export {fitCircleToPoints};