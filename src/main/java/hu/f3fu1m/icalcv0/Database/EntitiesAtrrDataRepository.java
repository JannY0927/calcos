package hu.f3fu1m.icalcv0.Database;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

public class EntitiesAtrrDataRepository implements DatabaseRepository<EntitiesAttrData> {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    /*Egy entitáshoz tartozó minden attributum lekérdezhető*/
    @Override
    public List<EntitiesAttrData> selectWithId(int en_id) {
        List<EntitiesAttrData> result = jdbcTemplate.query(
                "select ei_id, ei_en_id, ea_seq_type, eq_seq_value from entities_attr_data WHERE ei_en_id=?",
                (rs, rowNum) ->  new EntitiesAttrData(
                        rs.getInt ("ei_id"),
                        rs.getInt ("ei_en_id"),
                        rs.getString("ea_seq_type"),
                        rs.getString("eq_seq_value")
                ), en_id);
        return result;
    }

    @Override
    public EntitiesAttrData insert(EntitiesAttrData entitiesAttrData) {
        jdbcTemplate.update("INSERT INTO entities_attr_data (ei_en_id, ea_seq_type, eq_seq_value) VALUES (?, ?, ?)",
                entitiesAttrData.getEntIdinEntitiesBasicData(),
                entitiesAttrData.getSeqType(),
                entitiesAttrData.getSeqValue());
        jdbcTemplate.query("SELECT ei_id FROM entities_attr_data", (rs, rowNum) -> {
            entitiesAttrData.setId(rs.getInt("ei_id"));
            return entitiesAttrData;
        });
        return entitiesAttrData;
    }

    @Override
    public EntitiesAttrData update(EntitiesAttrData entitiesAttrData) {
        return null;
    }

    @Override
    public void delete(int id) {

    }
}
