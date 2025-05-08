# 🏋️‍♂️ Fitness Tracker App – Frontend

This is the **React frontend** for the **Fitness Tracker App**. It communicates with the backend API built with **PHP** and **MongoDB** to manage user authentication, workout tracking, and fitness progress visualization.

---

## 🚀 Features

- 🔐 JWT-based user authentication
- 📊 Track and display workout history
- 📅 User-friendly dashboard with fitness statistics
- 📱 Responsive design (works on both mobile and desktop)
- 🔄 Fetches data securely from the PHP backend API

---

## 🧰 Tech Stack

- **Frontend Framework**: React (Vite)
- **Styling**: TailwindCSS (Utility-first CSS framework)
- **State Management**: React Context API
- **API Communication**: Axios (for HTTP requests)
- **Authentication**: JWT (JSON Web Tokens)

---
## 🧪 Testing
Use browser developer tools to inspect the network requests and responses.

Test different workflows like registering a new user, logging in, and adding/viewing workouts.
---

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/bayedhaf/fitness-tracker-web-app.git
cd fitness-tracker-web-app

## Install Dependencies
 bash
npm install

## Configure the API Base URL

VITE_API_BASE_URL=http://localhost:8080

## Start the Development Server
   npm run dev
```
## 🧠 Tips
CORS Issues: If you’re using a separate backend (e.g., PHP backend running on a different port), make sure CORS is configured properly in the backend to allow cross-origin requests from http://localhost:5173.

JWT Expiry: Handle token expiry gracefully in the frontend (i.e., redirect to login if the token expires).

Environment Configuration: Make sure your .env file is excluded from version control.







