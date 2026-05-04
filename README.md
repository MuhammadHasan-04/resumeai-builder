#  Resume Builder & Parser

A full-stack web application for building, parsing, and managing professional resumes with role-based access control and an admin dashboard.


##  Features

### Core Functionality

-  **Resume Builder**: Interactive resume creation with multiple templates
-  **Resume Parser**: Parse resumes from PDFs and Word documents
-  **Multiple Templates**: Clean and Default templates for professional resumes
-  **Export**: Download resumes as PDF

### Authentication & Security

-  **User Registration & Login**: Secure user authentication with JWT tokens
-  **Password Encryption**: bcryptjs (12-round hashing) for secure password storage
-  **Password Reset**: Token-based password reset with 1-hour expiry
-  **Session Management**: JWT tokens with 7-day expiry and token validation
-  **Form Validation**: Client-side and server-side validation with clear error messages

### Role-Based Access Control (RBAC)

-  **Admin Role**: Full system access, user management capabilities
-  **User Role**: Limited access to own resume and features
-  **Dynamic Navigation**: Navbar changes based on user role
-  **Protected Routes**: Server and client-side route protection

### Admin Dashboard

-  **User Management**: View all users with detailed information
-  **Account Control**: Activate/deactivate user accounts
-  **Role Management**: Change user roles between Admin and User
-  **User Deletion**: Remove users from the system
-  **Dashboard Statistics**: Real-time statistics (total users, admins, active, inactive)
-  **Last Login Tracking**: Monitor user activity

### User Interface & UX

-  **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
-  **Navbar**: Sticky navigation with role-based menu items
-  **Footer**: Present on all pages with links and social media
-  **Password Strength Indicator**: Visual feedback on password strength
-  **Error Messages**: Clear, inline validation messages
-  **Loading States**: Visual feedback during API calls
-  **Smooth Animations**: Professional transitions and hover effects

##  Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js (v5.2.1)
- **Database**: SQLite with Sequelize ORM
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **CORS**: Cross-Origin Resource Sharing enabled
- **Environment**: dotenv for config management

### Frontend

- **UI Framework**: React 19
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **PDF Generation**: jsPDF & html2canvas
- **Document Parsing**: Mammoth (Word), PDF-Parse (PDF)

##  Project Structure

```
Profyl/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── controller/
│   │   ├── authController.js     # Auth logic (login, signup, password reset)
│   │   ├── adminController.js    # Admin operations (user management)
│   │   ├── parseController.js    # Resume parsing
│   │   └── ResumeController.js   # Resume CRUD operations
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification (legacy)
│   │   ├── rbacMiddleware.js     # Role-based access control
│   │   └── validationMiddleware.js # Input validation & sanitization
│   ├── models/
│   │   ├── Users.js              # User schema with roles, tokens, lastLogin
│   │   └── Resume.js             # Resume schema
│   ├── routes/
│   │   ├── auth.js               # Auth endpoints (register, login, password reset)
│   │   ├── admin.js              # Admin endpoints (user management)
│   │   ├── resumeManagement.js   # Resume CRUD
│   │   └── resumeUploading.js    # Resume upload
│   ├── services/
│   │   └── aiService.js          # AI-related services
│   ├── utils/
│   │   └── extractFile.js        # File extraction utilities
│   ├── server.js                 # Express server setup
│   ├── package.json              # Backend dependencies
│   └── .env                      # Backend environment variables
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx              # Navigation with role-based menu
    │   │   ├── Footer.jsx              # Footer component
    │   │   ├── ProtectedRoute.jsx      # Route guards
    │   │   ├── cards/                  # Card components
    │   │   └── Templates/              # Resume templates
    │   ├── pages/
    │   │   ├── Login.jsx               # Login page with validation
    │   │   ├── Signup.jsx              # Signup with password strength
    │   │   ├── PasswordReset.jsx       # Password reset page
    │   │   ├── AdminDashboard.jsx      # Admin user management
    │   │   ├── MainPage.jsx            # Home page
    │   │   ├── ResumeGeneration.jsx    # Resume builder
    │   │   └── aiResumeUpload.jsx      # Resume upload & parsing
    │   ├── services/
    │   │   ├── authService.js          # Auth API calls & token management
    │   │   └── resumeUploadandParse.js # Resume operations
    │   ├── utils/
    │   │   └── validation.js           # Client-side validation utilities
    │   ├── App.jsx                     # Main app with routes
    │   ├── index.css                   # Global styles
    │   └── main.jsx                    # React entry point
    ├── package.json                    # Frontend dependencies
    ├── vite.config.js                  # Vite configuration
    └── index.html                      # HTML entry point
```

##  Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure environment variables
# See Configuration section below

# Start development server
npm run dev
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file (optional, if API URL differs)
echo "VITE_API_URL=http://localhost:3000/api" > .env.local

# Start development server
npm run dev
```

## ⚙️ Configuration

### Backend Environment Variables (.env)

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_NAME=profyl
DB_USER=root
DB_PASSWORD=password
DB_HOST=localhost

# JWT Configuration
SECRET=your_jwt_secret_key_minimum_32_characters_long

# Frontend URL (for password reset links)
FRONTEND_URL=http://localhost:5173

# Email Configuration (Optional, for email-based password reset)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

### Frontend Environment Variables (.env.local)

```env
VITE_API_URL=http://localhost:3000/api
```

##  Running the Application

### Development Mode

#### Terminal 1 - Backend

```bash
cd backend
npm run dev
# Server runs on http://localhost:3000
```

#### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
# Application runs on http://localhost:5173
```

### Production Build

#### Backend

```bash
npm run build  # or just use npm start
```

#### Frontend

```bash
npm run build
npm run preview
```

##  API Documentation

### Authentication Endpoints

#### Register User

```
POST /api/auth/register
Body: {
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
Response: {
  "success": true,
  "data": { token, user }
}
```

#### Login

```
POST /api/auth/login
Body: {
  "email": "john@example.com",
  "password": "SecurePass123!"
}
Response: {
  "success": true,
  "data": { token, user }
}
```

#### Request Password Reset

```
POST /api/auth/forgot-password
Body: { "email": "john@example.com" }
Response: { "success": true, "message": "..." }
```

#### Reset Password

```
POST /api/auth/reset-password
Body: {
  "token": "reset_token_from_email",
  "password": "NewSecurePass123!"
}
Response: { "success": true, "message": "..." }
```

### Admin Endpoints (Requires Admin Role)

#### Get All Users

```
GET /api/admin/users
Headers: { "Authorization": "Bearer token" }
Response: { "success": true, "data": [users] }
```

#### Get User by ID

```
GET /api/admin/users/:userId
Headers: { "Authorization": "Bearer token" }
```

#### Toggle User Status

```
PATCH /api/admin/users/:userId/toggle-status
Headers: { "Authorization": "Bearer token" }
Response: { "success": true, "message": "..." }
```

#### Change User Role

```
PATCH /api/admin/users/:userId/role
Headers: { "Authorization": "Bearer token" }
Body: { "role": "admin" or "user" }
```

#### Delete User

```
DELETE /api/admin/users/:userId
Headers: { "Authorization": "Bearer token" }
```

#### Get Dashboard Stats

```
GET /api/admin/dashboard/stats
Headers: { "Authorization": "Bearer token" }
Response: {
  "success": true,
  "data": {
    "totalUsers": 0,
    "adminCount": 0,
    "regularUsers": 0,
    "activeUsers": 0,
    "inactiveUsers": 0
  }
}
```









