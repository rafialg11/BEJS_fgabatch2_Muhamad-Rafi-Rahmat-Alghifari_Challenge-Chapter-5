# Banking System Simple API with User Authentication (Challenge 5 Binar Academy FGA)

This is a simple API designed to manage bank accounts and facilitate basic money transfer transactions between accounts, with added user authentication. It allows users to create, view, and manage bank accounts, as well as perform simple transfer operations from one account (Account A) to another (Account B). The API provides a minimal yet effective solution for managing banking operations in a simplified environment, ensuring that only authenticated users can access the system.

## Getting started

### Setting up a project

* Move into your projects directory
* Clone this repository: `https://github.com/rafialg11/BEJS_fgabatch2_Muhamad-Rafi-Rahmat-Alghifari_Challenge-Chapter-5.git`
* Move into the project directory: `cd BEJS_fgabatch2_Muhamad-Rafi-Rahmat-Alghifari_Challenge-Chapter-5`
* Install the dependencies: `npm install`

* Run the development task: `npm run start`
    * Starts a server running at http://localhost:3200
    * Automatically restarts when any of your files change

## Configuration

### Environment variables
```bash
DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

### Database connection
Run the following command to migrate the database models:
```bash
npm run migrate:dev
```	

## API Documentation

This API provides Swagger-based documentation for easier exploration and testing of the available endpoints.

### Usage

1. After running the project, open your browser and navigate to:
   ```
   http://localhost:3200/api-docs
   ```
2. This will open the Swagger UI where you can explore the API endpoints, try out requests, and view response structures in an interactive manner.
