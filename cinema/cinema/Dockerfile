# Start with a base image containing Java runtime
FROM openjdk:21-jdk-slim as build

# Add the application's jar to the container
COPY target/cinema-0.0.1-SNAPSHOT.jar cinema.jar

# Run the jar file
ENTRYPOINT ["java","-jar","/cinema.jar"]