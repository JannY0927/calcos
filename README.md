# Start
git clone  [https://github.com/JannY0927/iCalc_V0.git](https://github.com/JannY0927/iCalc_V0.git)

# windows:
run start.bat in iCalc_V0
open browser  [http://localhost:8080/](http://localhost:8080/)

# Other:
mvn compile
mvnw spring-boot:run
open browser  [http://localhost:8080/](http://localhost:8080/)

# kill
kill 8080 port if need it netstat -ano | findstr 8080
taskkill /F /PID
