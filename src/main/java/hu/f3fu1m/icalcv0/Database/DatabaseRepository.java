package hu.f3fu1m.icalcv0.Database;

import java.util.List;

public interface DatabaseRepository<T> {
    List<T> selectWithId(int id);
    T insert(T t);
    T update(T t);
    void delete(int id);
}
