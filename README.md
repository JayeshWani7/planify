# Planify - Event Planning Web Application

A modern, full-stack event planning application built with React, TypeScript, Node.js, Express, and MongoDB. Planify enables users to create and manage events, organize communities and clubs, with robust authentication and role-based access control.

## 🚀 Features

### Authentication & User Management
- ✅ User registration and login
- ✅ JWT-based authentication
- ✅ Role-based access control (User, Community Lead, Club Lead, Club Member)
- ✅ Profile management
- ✅ Password change functionality
- ✅ Protected routes

### User Interface
- ✅ Modern, responsive design with Tailwind CSS
- ✅ Beautiful login and registration forms
- ✅ Dashboard with stats and navigation
- ✅ Profile management interface
- ✅ Loading states and error handling
- ✅ Mobile-first responsive design

### Backend API
- ✅ RESTful API with Express.js
- ✅ MongoDB database with Mongoose ODM
- ✅ Input validation and sanitization
- ✅ Security middleware (Helmet, CORS, Rate Limiting)
- ✅ Comprehensive error handling
- ✅ Environment configuration

## 🛠 Tech Stack

### Frontend
- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **React Router DOM** - Routing
- **React Hook Form** - Form Management
- **React Query** - Data Fetching
- **Zustand** - State Management
- **Axios** - HTTP Client
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express.js** - Web Framework
- **TypeScript** - Type Safety
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password Hashing
- **Express Validator** - Input Validation
- **Helmet** - Security Headers
- **CORS** - Cross-Origin Resource Sharing
- **Morgan** - Logging

## 📁 Project Structure

```
planify/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.config.ts
│   │   │   └── env.config.ts
│   │   ├── controllers/
│   │   │   └── auth.controller.ts
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts
│   │   │   ├── errorHandler.middleware.ts
│   │   │   └── validation.middleware.ts
│   │   ├── models/
│   │   │   └── User.model.ts
│   │   ├── routes/
│   │   │   └── auth.routes.ts
│   │   ├── types/
│   │   │   ├── common.types.ts
│   │   │   └── user.types.ts
│   │   ├── utils/
│   │   │   ├── AppError.ts
│   │   │   └── jwt.utils.ts
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── auth.ts
│   │   │   └── client.ts
│   │   ├── components/
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── pages/
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── ProfilePage.tsx
│   │   │   └── RegisterPage.tsx
│   │   ├── store/
│   │   │   └── authStore.ts
│   │   ├── types/
│   │   │   └── auth.types.ts
│   │   ├── utils/
│   │   │   └── helpers.ts
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── .env
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd planify
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

### Configuration

1. **Backend Environment Variables**
   
   Create/update `backend/.env`:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/planify
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   JWT_EXPIRES_IN=24h
   JWT_REFRESH_SECRET=your-refresh-secret-key
   JWT_REFRESH_EXPIRES_IN=7d
   CLIENT_URL=http://localhost:3000
   ```

2. **Frontend Environment Variables**
   
   Create/update `frontend/.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

### Running the Application

1. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

2. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Server will start on http://localhost:5000

3. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Application will be available on http://localhost:3000

## 📋 Available Scripts

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Authentication Flow

1. **User Registration**
   - User fills registration form
   - Password is hashed using bcrypt
   - User data is saved to MongoDB
   - JWT token is generated and returned

2. **User Login**
   - User provides email/password
   - Credentials are validated
   - JWT token is generated and returned
   - Token is stored in browser localStorage

3. **Protected Routes**
   - Token is sent with each API request
   - Backend validates token
   - User data is attached to request
   - Frontend routes are protected based on authentication state

## 👥 User Roles

- **User** - Basic user with standard permissions
- **Community Lead** - Can manage communities
- **Club Lead** - Can manage clubs
- **Club Member** - Member of a club with specific permissions

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password
- `POST /api/auth/logout` - Logout user
- `DELETE /api/auth/account` - Delete user account

## 🎨 UI Components

### Pages
- **LoginPage** - User authentication
- **RegisterPage** - User registration
- **DashboardPage** - Main dashboard with overview
- **ProfilePage** - User profile management

### Components
- **ProtectedRoute** - Route protection wrapper
- **LoadingSpinner** - Loading state indicator

## 🚀 Deployment

### Backend Deployment
1. Build the application: `npm run build`
2. Set production environment variables
3. Deploy to your preferred hosting service (Heroku, DigitalOcean, AWS, etc.)

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to static hosting (Vercel, Netlify, AWS S3, etc.)

## 🔮 Future Enhancements

Based on the original architecture diagram, the following modules are planned:

1. **Communities Module**
   - Create and manage communities
   - Community member management
   - Community settings and permissions

2. **Clubs Module**
   - Create and manage clubs within communities
   - Club member management
   - Club activities and events

3. **Events Module**
   - Event creation and management
   - Event registration and ticketing
   - Event feedback and ratings
   - Certificate generation
   - Email notifications

4. **Additional Features**
   - Real-time notifications
   - File upload for event media
   - Advanced search and filtering
   - Analytics and reporting
   - Mobile application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the existing issues in the repository
2. Create a new issue with detailed description
3. Provide steps to reproduce the problem
4. Include relevant error messages and screenshots

---

**Built with ❤️ using modern web technologies**