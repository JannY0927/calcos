package hu.f3fu1m.icalcv0;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
public class ICalcV0Application {

    public static void main(String[] args) {
        SpringApplication.run(ICalcV0Application.class, args);
    }
}
