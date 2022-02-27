class Entity {
    constructor(type,Entityproperties) {
        this.type = type;
        this.Entityproperties = Entityproperties;
    }

    draw() {
        console.log(this);
    }
}


class Entityproperties{
    constructor(propertyType,propertyValue) {
        this.propertyType = propertyType;
        this.propertyValue = propertyValue;
    }
}
