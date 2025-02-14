
# Project Setup Guide

This project includes both the backend and frontend (Admin Panel), fully Dockerized for easy setup and deployment. Follow the steps below to start the project using Docker Compose.
## Setup

To launch the project, you need to start various services using Docker Compose. Execute the following commands:

Navigate to the scripts/ directory:
```bash
  cd scripts/
 ``` 
 Start the Database services:
 ```bash
  docker compose -f docker-compose.db.yml up -d --build
```

Run the migrations
```bash
  docker compose -f docker-compose.migration.yml up -d --build
```

Start the services
```bash
  docker compose -f docker-compose.services.yml up -d --build
```
  
Start the Admin Panel
```bash
  docker compose -f docker-compose.yml up -d --build
```
## Authors

- Prateek Takthar# HOEdtec
# HOEdtec
# HOEdtec
# HOEdtec
