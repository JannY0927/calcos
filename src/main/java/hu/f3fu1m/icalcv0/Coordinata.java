package hu.f3fu1m.icalcv0;

public class Coordinata {
    float x;
    float y;
    float z;

    public Coordinata(float x, float y, float z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }


    public String getCoordinata() {
        return (x+", "+y+", "+z);
    }

    public void setCoordinata(float x,float y,float z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    @Override
    public String toString() {
        return "Coordinata{" +
                "x=" + x +
                ", y=" + y +
                ", z=" + z +
                '}';
    }
}
