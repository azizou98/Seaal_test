# Inventory Management System

🌟 Welcome to the Inventory Management System! This full-stack web application allows you to manage an inventory of over 1 million articles with user authentication, article listing, and stock status tracking. Built with Angular for the frontend, Express.js with MySQL for the backend, and a Flutter WebView for mobile access.

## 🚀 Features
- User registration and login with JWT authentication.
- Paginated article list with search functionality.
- Stock status tracking (in/out) with "Take Out" logging.
- Mobile-friendly WebView via Flutter.

## 📋 Prerequisites
- Node.js (v18+)
- Angular CLI (v16+)
- Flutter SDK (v3+)
- MySQL Server (v8+)
- Git (for cloning the repo)

## 🛠️ Setup Instructions

### 1. Install Dependencies
🎨 Let’s set up the tools for this masterpiece!
- **Node.js and npm**: Download and install from [nodejs.org](https://nodejs.org/). Verify with `node -v` and `npm -v`.
- **Angular CLI**: Run `npm install -g @angular/cli` in your terminal.
- **Flutter SDK**: Follow [Flutter’s installation guide](https://flutter.dev/docs/get-started/install) and run `flutter doctor` to confirm.
- **MySQL**: Install from [mysql.com](https://www.mysql.com/) and start the server.

### 2. Configure MySQL
💎 Create and populate the database with elegance.
- Open MySQL (e.g., via MySQL Workbench or CLI).
- Create the database and tables:
  ```sql
  mysql -u root -p < schema.sql
  ```
  - Replace `root` with your MySQL username and enter your password.
  - Ensure `schema.sql` is in the project root.
- Update `server.js` with your MySQL credentials (host, user, password, database).

### 3. Install Project Dependencies
🌸 Install the required packages for each component.
- **Backend**: Navigate to the project root and run:
  ```bash
  cd backend
  npm install express mysql2 bcryptjs jsonwebtoken cors
  ```
- **Frontend**: Navigate to the Angular folder and run:
  ```bash
  cd frontend
  npm install
  ```

### 4. Running the Applications
🚀 Launch each part of the system with these steps.

#### Backend
- Start the Express server:
  ```bash
  cd backend
  node server.js
  ```
- The server will run on `http://localhost:3000`. 🌐

#### Frontend
- Serve the Angular app:
  ```bash
  cd frontend
  ng serve --proxy-config proxy.conf.json
  ```
- Access it at `http://localhost:4200`. ✨

#### Mobile (Flutter WebView)
- Set up the Flutter environment:
  ```bash
  cd mobile
  flutter pub get
  ```
- Run the app on an emulator or device:
  ```bash
  flutter run
  ```
- The WebView will load `http://localhost:4200`. Ensure the frontend is running.

## 🔧 Troubleshooting
- **MySQL Connection Issues**: Check your credentials in `server.js` and ensure the server is running.
- **CORS Errors**: Verify the frontend and backend are on the same network or adjust CORS settings.
- **Mobile WebView**: If the WebView fails, confirm the Angular app URL and network connectivity.

## 🎉 Contributing
Feel free to enhance this project! Open an issue or pull request on GitHub.

