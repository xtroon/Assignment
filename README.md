# Assignment Project

A full-stack application with a React frontend and Express backend.


## Project Structure

- **client/** - React + Vite frontend with Tailwind CSS
- **server/** - Express backend with MongoDB

## Getting Started

### 1. Environment Setup

Create a `.env` file in the `server/` directory with your MongoDB connection details:

```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

### 2. Install Dependencies

**Frontend:**
```bash
cd client
npm install
```

**Backend:**
```bash
cd server
npm install
```

## Running the Application

### Start Backend

```bash
cd server
npm start
```

The backend will start on `http://localhost:5000` with nodemon for automatic restarts on file changes.

### Start Frontend

In a new terminal:

```bash
cd client
npm run dev
```

The frontend will start on `http://localhost:5173` (Vite default).

