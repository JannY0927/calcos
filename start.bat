@ECHO OFF  && setlocal enabledelayedexpansion
mvn compile &&^
mvnw spring-boot:run
::netstat -ano | findstr 8080
