# Node.js TypeScript Express MySQL Project

## Project Overview
This project is a Node.js backend built using Express, TypeScript, and MySQL. It provides a robust structure for handling requests, managing routes, and interacting with a MySQL database. The project is set up with TypeScript to leverage strong typing and modern JS features.

## Technologies Used
- **Node.js**: JavaScript runtime used to build the server.
- **Express**: Web framework for handling HTTP requests and routing.
- **TypeScript**: Typed superset of JavaScript, enhancing development with type safety and modern JS features.
- **MySQL**: Relational database used for storing application data.
- **Sequelize**: ORM for interacting with the MySQL database.

## Project Setup

### Prerequisites
Before setting up the project, make sure you have the following installed:
- **Node.js** (version 14.x or later)
- **MySQL** (version 5.7 or later)
- **TypeScript** (if you don't have it globally installed, you can use `npx`)

### Database Schema

The following tables are used:

### Users

- **id:** Primary Key

- **username:** String, unique

- **email:** String, unique

- **password:** String (hashed)

### Blogs

- **id:** Primary Key

- **title:** String

- **content:** Text

- **description:** String

- **image_url:** String (optional)

- **user_id:** Foreign Key, references Users(id)

### Favorites (Join Table for Many-to-Many relationship between Users and Blogs)

- **user_id:** Foreign Key, references Users(id)

- **blog_id:**:Foreign Key, references Blogs(id)



### 1. Clone the repository
```bash
git clone https://github.com/LingeshwaranR/presidio-launchpad-msec-batch2-backend.git
cd presidio-launchpad-msec-batch2-backend
```

### 2. Install dependencies
Install all required dependencies by running:

```bash
npm install
```

### 3. Configure environment variables
Create a .env file in the root of the project with the following configuration:

- **PORT**: The port number on which the server will run (default is `3000`).
- **DB_HOST**: The host of your MySQL database (default is `localhost`).
- **DB_USER**: The MySQL user that has access to the database.
- **DB_PASSWORD**: The password for the MySQL user.
- **DB_NAME**: The name of the database used in the project.
- **JWT_SECRET**: A secret key used for signing JSON Web Tokens (JWT).

Make sure to replace the values with your own configurations.

## Notes

- Before starting the server, **manually create a MySQL database** (example: `blog_db`).
- You don't need to manually create tables — **Sequelize will automatically sync models and create tables** if they do not exist.
- Example MySQL command to create a database:
  ```sql
  CREATE DATABASE blog_db;

- Ensure that your .env file has the correct database name in DB_NAME.

- After the database is ready and .env is properly configured, you can run the project

### 4.Run the project
To run the project in development mode:

```bash
npm run dev
```
This will start the Express server on the port defined in the .env file (default is 3000).