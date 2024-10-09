FROM openjdk:17-jdk-alpine
COPY target/backend-0.0.1-SNAPSHOT.jar backend.jar
ENTRYPOINT ["java","-jar","/backend.jar", "--spring.profiles.active=docker"]