package hu.f3fu1m.icalcv0.Database;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class FileBasicDataRepository implements DatabaseRepository<FileBasicData>{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<FileBasicData> selectWithId(int fl_id) {
        List<FileBasicData> result = jdbcTemplate.query(
                "select fl_id,fl_name from file_basic_data WHERE fl_id=?",
                (rs, rowNum) ->  new FileBasicData(
                        rs.getInt ("fl_id"),
                        rs.getString("fl_name")
                ), fl_id);
        return result;
    }

    @Override
    public FileBasicData insert(FileBasicData fileBasicData) {
        System.out.println(fileBasicData.getName());
        jdbcTemplate.update("INSERT INTO file_basic_data ( fl_name) VALUES (?)",
                fileBasicData.getName());
        jdbcTemplate.query("SELECT max(fl_id) FROM file_basic_data", (rs, rowNum) -> {
            fileBasicData.setId(rs.getInt("fl_id"));
            return fileBasicData;
        });
        return fileBasicData;
    }

    @Override
    public FileBasicData update(FileBasicData fileBasicData) {
        return null;
    }

    @Override
    public void delete(int id) {

    }
}
