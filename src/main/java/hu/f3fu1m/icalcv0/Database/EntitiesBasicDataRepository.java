package hu.f3fu1m.icalcv0.Database;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class EntitiesBasicDataRepository implements DatabaseRepository<EntitiesBasicData>{

    @Autowired
    private JdbcTemplate jdbcTemplate;



    /*Egy fájlhoz tartozó  minden entitás lekérdezhető*/
    @Override
    public List<EntitiesBasicData> selectWithId(int fl_id) {
        List<EntitiesBasicData> result = jdbcTemplate.query(
                "select en_id, en_fl_id, en_type from entities_basic_data WHERE en_fl_id=?",
                (rs, rowNum) ->  new EntitiesBasicData(
                        rs.getInt ("en_id"),
                        rs.getInt ("en_fl_id"),
                        rs.getString("en_type")
                ), fl_id);
        return result;
    }

    @Override
    public EntitiesBasicData insert(EntitiesBasicData entitiesBasicData) {
        jdbcTemplate.update("INSERT INTO entities_basic_data (en_fl_id, en_type) VALUES (?, ?)",
            entitiesBasicData.getFileIdinFileBasicData(),
            entitiesBasicData.getType());
        jdbcTemplate.query("SELECT max(en_id) FROM entities_basic_data", (rs, rowNum) -> {
            entitiesBasicData.setId(rs.getInt("en_id"));
            return entitiesBasicData;
        });
        return entitiesBasicData;
    }

    @Override
    public EntitiesBasicData update(EntitiesBasicData entitiesBasicData) {
        return null;
    }

    @Override
    public void delete(int id) {

    }
}
