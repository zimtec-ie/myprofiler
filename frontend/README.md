# myProfiler

myProfiler is a Customaziable Profile web application built with Java Spring Boot for the backend and React for the frontend. It provides a seamless full-stack development experience for building modern web applications.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [RunningProgram](#runningprogram)

## Features

- **Spring Boot Backend:**
  - RESTful API endpoints.
  - Database integration with Spring Data JPA.

- **React Frontend:**
  - Responsive and dynamic user interface.
  - State management using React Hooks.
  - Integration with backend APIs.

- **Full Stack:**
  - Seamless integration between the backend and frontend.
  - Modern and efficient development workflow.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Java Development Kit (JDK) installed.
- Node.js and npm installed.
- IDE with support for Spring Boot and React development.
- mySQL

## RunningProgram

The code for the frontend and backend can be downloaded from the SRS link found here > http://zimtec.ie/products/myProfiler-code.zip 

- The mySQL database is configured to accept remote access from specified IP's so you won't be able to connect to the remote database. You can connect to your own database and update the 'application properties' file in the backend Java files. 

- Alternatively, you can contact us to run the program: http://www.zimtec.ie/#contactzaiken@zimtec.ie 

- Each Component imports a config.js file to use a localhost or remote URL depending on your environment, development or production. Within the config.js you can set you development server or your production server URL. You can build and upload to your own remote directory just edit the package.json to point to the "homepage" to its correct filepath on your remote directory. 