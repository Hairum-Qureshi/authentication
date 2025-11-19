# MERN Authentication Project

A full-stack authentication system built with the MERN stack, PassportJS, JWT, Express Session, Firebase Google OAuth, and Two-Factor Authentication (2FA) using Speakeasy. This project is designed as a learning exercise to explore implementing authentication in a Node.js/Express backend with a React/TypeScript frontend.

---

## Features

* User authentication with:

  * Email and password
  * Google OAuth via Firebase
* Session management with Express Session
* JWT-based token authentication
* Two-Factor Authentication (2FA) using Speakeasy
* MongoDB for storing user credentials and authentication data
* Full TypeScript support on both backend and frontend

---

## Tech Stack

**Backend:**

* Node.js / Express
* TypeScript
* MongoDB (Mongoose)
* PassportJS (local and OAuth strategies)
* JWT
* Express Session
* Speakeasy for 2FA
* Firebase Admin SDK

**Frontend:**

* React with TypeScript
* Firebase client SDK
* Hooks and modular components for authentication UI

---

## Environment Variables

Create a `.env` file in the `backend` folder with the following variables:

```dotenv
DOTENV_CONFIG_QUIET=true
PORT=9000
FRONTEND_URL=http://localhost:5174
EXPRESS_SESSION_SECRET=your_express_session_secret
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongodb_uri
NODE_ENV=development
```

For frontend, create a `.env` in the `frontend` folder:

```dotenv
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## Project Structure

**Backend:**

```
backend/
├── config/
│   ├── firebase-config.ts
│   ├── passport-config.ts
│   └── serviceAccount.json
├── controllers/
│   └── authentication.ts
├── middleware/
├── models/
│   └── User.ts
├── routes/
│   └── authentication.ts
├── interfaces/
├── .env
├── package.json
└── tsconfig.json
```

**Frontend:**

```
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── config/
│   │   └── firebase.ts
│   └── hooks/
├── .env
├── package.json
├── tsconfig.app.json
└── tsconfig.node.json
```

---

## Firebase Google OAuth Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Navigate to **Authentication → Sign-in method**.
3. Enable **Google** as a provider and configure your **authorized domains** (e.g., `localhost` for development).
4. Download the **Service Account Key JSON** from **Project Settings → Service Accounts**. Place this file as `backend/config/serviceAccount.json`.
5. Copy your Firebase client SDK config and add it to the frontend `.env` as shown above.
6. In `backend/config/firebase-config.ts`, initialize Firebase Admin with the service account:

```ts
import admin from "firebase-admin";
import serviceAccount from "./serviceAccount.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});

export default admin;
```

7. In `frontend/src/config/firebase.ts`, initialize Firebase client SDK:

```ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

---

## Installation

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The backend will run on `http://localhost:9000` and frontend on `http://localhost:5174`.

---

## Usage

* Register with email/password or Google OAuth.
* Enable 2FA via your account settings.
* Authenticate to access protected routes.

---

## Notes

* This project is a sandbox for learning authentication patterns in a MERN stack application.
* Express Session is used to manage sessions in combination with JWT for API access.
* Speakeasy handles TOTP-based 2FA.
