# Spring Boot Application

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- Java 17
- ≥ Maven 3.8.3
- ≥ Docker 27.0.3

## Lancer les conteneurs Docker

Pour lancer les conteneurs Docker, exécutez la commande suivante à la racine du projet :

```sh
docker-compose up
```

Pour vérifier que les conteneurs Docker sont présents  :

```sh
docker ps -a
```

## Construire et lancer le projet

1. Nettoyez et construisez le projet avec Maven :

```sh
mvn clean install
```

2. Lancez l’application Spring Boot :

```sh
mvn spring-boot:run
```

Vous pouvez également créer une configuration sur IntelliJ IDEA pour lancer l'application.
