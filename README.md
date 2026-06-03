# Productr Assignment Project

A full-stack application with a React (Vite) frontend and Express/MongoDB backend.

Live: https://productr0.vercel.app/
(Use email: "omt81144@gmail.com" to view sample products, so you don't have to upload yourself :))

## Project Structure

- **client/** - React + Vite frontend with Tailwind CSS
- **server/** - Express backend with MongoDB and Cloudinary image upload support

---

## Getting Started

### 1. Environment Setup

Configure environment variables by creating `.env` files.

#### **Backend (`server/.env`)**
Create a `.env` file inside the `server/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLIENT_URL=http://localhost:5173
```

#### **Frontend (`client/.env`)**
Create a `.env` file inside the `client/` directory:
```env
VITE_API_URL=http://localhost:5000/v1/api
```

---

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

---

## Running the Application

### Start Backend

In one terminal:
```bash
cd server
npm start
```
The backend will start on `http://localhost:5000`. It connects to MongoDB and launches the Express server.

### Start Frontend

In a new terminal:
```bash
cd client
npm run dev
```
The frontend will start on `http://localhost:5173` (Vite default). 

---

## Production Build & Deploys

### Build Frontend
To create a production-ready static bundle of the client app:
```bash
cd client
npm run build
```
This outputs to the `client/dist/` directory, which is ready to serve or deploy to static host providers like Vercel or Render.
