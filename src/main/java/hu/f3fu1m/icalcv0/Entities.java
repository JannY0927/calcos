package hu.f3fu1m.icalcv0;

public class Entities {
    String type;
    Coordinata start;
    Coordinata end;

    public Entities() {
        this.type = type;
        this.start = start;
        this.end = end;
    }

    @Override
    public String toString() {
        return "Entities{" +
                "type='" + type + '\'' +
                ", start=" + start +
                ", end=" + end +
                '}';
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Coordinata getStart() {
        return start;
    }

    public void setStart(Coordinata start) {
        this.start = start;
    }

    public Coordinata getEnd() {
        return end;
    }

    public void setEnd(Coordinata end) {
        this.end = end;
    }
}
