package hu.f3fu1m.icalcv0.Database;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class FileExtraDataRepository implements DatabaseRepository<FileExtraData>{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<FileExtraData> selectWithId(int fe_fl_id) {
        List<FileExtraData> result = jdbcTemplate.query(
                "select fe_fl_id,fe_type,fe_value from file_data_ext WHERE fe_fl_id=?",
                (rs, rowNum) ->  new FileExtraData(
                        rs.getInt("fe_id"),
                        rs.getInt ("fe_fl_id"),
                        rs.getString("fe_type"),
                        rs.getString("fe_value")
                ), fe_fl_id);
        return result;
    }

    @Override
    public FileExtraData insert(FileExtraData fileExtraData) {
        jdbcTemplate.update("INSERT INTO entities_basic_data (fe_fl_id, fe_type,fe_value) VALUES (?, ?, ?)",
                fileExtraData.getFileIdinFileBasicData(),
                fileExtraData.getType(),
                fileExtraData.getValue());
        jdbcTemplate.query("SELECT max(fl_id) FROM entities_basic_data", (rs, rowNum) -> {
            fileExtraData.setId(rs.getInt("fl_id"));
            return fileExtraData;
        });
        return fileExtraData;
    }

    @Override
    public FileExtraData update(FileExtraData fileExtraData) {
        return null;
    }

    @Override
    public void delete(int id) {

    }
}
