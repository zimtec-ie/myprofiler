# myProfiler

A full-stack customizable profile web application built with React and Spring Boot.

## 🏗️ Project Structure

This is a monorepo containing both frontend and backend:

```
├── frontend/          # React TypeScript application
│   ├── src/
│   │   ├── components/
│   │   ├── layout/
│   │   └── utils/
│   ├── .env.example   # Environment configuration template
│   └── package.json
│
└── backend/           # Spring Boot Java application
    ├── src/
    │   └── main/
    │       └── java/ie/zimtec/myProfiler/
    ├── .env.example   # Environment configuration template
    └── pom.xml
```

## ✨ Features

- **Admin Dashboard**: Manage profiles, appearance, documents, and messages
- **Profile Customization**: Fully customizable user profiles
- **Responsive Design**: Works on desktop and mobile devices
- **RESTful API**: Spring Boot backend with MySQL database

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- Java 22+
- Maven 3.6+
- MySQL database

### Backend Setup

1. **Configure environment variables**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your database credentials
   ```

2. **Run the application**
   ```bash
   mvn spring-boot:run
   ```

The backend will start on `http://localhost:8080`

### Frontend Setup

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env to set local or remote API mode
   ```

3. **Run the development server**
   ```bash
   npm start
   ```

The frontend will start on `http://localhost:3000`

## 🔐 Environment Variables

### Backend (.env)
- `DB_URL`: MySQL database connection URL
- `DB_USERNAME`: Database username
- `DB_PASSWORD`: Database password
- `SERVER_PORT`: Server port (default: 8080)

### Frontend (.env)
- `REACT_APP_ENV_MODE`: Set to `local` or `remote`
- `REACT_APP_API_URL_LOCAL`: Local backend URL
- `REACT_APP_API_URL_REMOTE`: Remote backend URL

**Important**: Never commit `.env` files! Use `.env.example` as templates.

## 🛠️ Technology Stack

### Frontend
- React 18
- TypeScript
- React Router
- Axios
- Bootstrap
- React Quill

### Backend
- Spring Boot 3.3
- Spring Data JPA
- MySQL
- Maven
- Spring Boot DevTools (hot reload)

## 📦 Deployment

### Frontend Build
```bash
cd frontend
npm run build
```

Deploy the `build/` folder to your web server or hosting service.

### Backend Build
```bash
cd backend
mvn clean package
```

Deploy the generated JAR file from `target/` to your server.

## 🔧 Development

The backend includes **Spring Boot DevTools** for automatic restart on code changes. Just save your Java files and the server will reload automatically!

## 📄 License

Copyright © ZIMTEC | Web Developers

## 👥 Authors

ZIMTEC Development Team

---

Built with ❤️ by [ZIMTEC](http://zimtec.ie)
