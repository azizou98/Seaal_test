# Gemini Code Assistant Configuration

This file provides instructions for the Gemini Code Assistant on how to interact with this project.

## Project Structure

This project is a full-stack application with an Angular frontend and a Node.js (Express) backend.

-   **Frontend:** The Angular application is located in the `frontend/` directory.
-   **Backend:** The Express.js server is in the `backend/` directory.

## Database

This project uses MySQL and the Prisma ORM. The Prisma schema is defined in `backend/prisma/schema.prisma`.

-   **Introspect Database:** `npx prisma db pull` in the `backend/` directory.
-   **Generate Prisma Client:** `npx prisma generate` in the `backend/` directory.

## Development Commands

### Backend

-   **Install Dependencies:** `npm install` in the `backend/` directory.
-   **Run Server:** `node server.js` in the `backend/` directory. The server will run on `http://localhost:3000`.

### Frontend

-   **Install Dependencies:** `npm install` in the `frontend/` directory.
-   **Run Development Server:** `npm start` or `ng serve` in the `frontend/` directory. The application will be available at `http://localhost:4200`.
-   **Build for Production:** `npm run build` or `ng build` in the `frontend/` directory.
-   **Run Tests:** `npm test` or `ng test` in the `frontend/` directory.
