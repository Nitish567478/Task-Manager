# 🚀 Mini SaaS Task Management System

A **production-ready, full-stack Task Management application** with secure authentication and multi-user functionality. Users can create, manage, and track their own private tasks with a clean, modern interface.

## ✨ Features

- **🔐 Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **👥 Multi-User Support**: Each user has their own isolated task list with complete data privacy
- **✅ Task Management**: Create, read, update, and delete tasks with ease
- **📊 Status Tracking**: Toggle tasks between Pending and Completed states
- **📱 Responsive UI**: Clean, modern, mobile-friendly interface built with React and Tailwind CSS
- **✔️ Input Validation**: Comprehensive server-side validation for all inputs
- **⚠️ Error Handling**: Friendly error messages and robust error handling on both frontend and backend
- **📈 Task Statistics**: Real-time statistics showing total, pending, and completed tasks with completion rate
- **🎨 Beautiful Design**: Modern gradient UI with smooth animations and interactive elements
- **🔍 Task Detail View**: Dedicated page to view complete task details
- **📋 Task Filtering**: Filter tasks by All, Pending, and Completed statuses
- **🗑️ Safe Deletion**: Confirmation dialog before deleting tasks
- **📄 Complete Documentation**: 9 comprehensive documentation files covering all aspects of the project

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | v16+ | JavaScript runtime |
| **Express.js** | ^4.18.2 | Web framework |
| **PostgreSQL** | 14+ | Relational database |
| **Sequelize** | ^6.35.2 | ORM for database management |
| **bcryptjs** | ^2.4.3 | Password hashing |
| **jsonwebtoken** | ^9.0.2 | JWT authentication |
| **express-validator** | ^7.0.1 | Input validation |
| **CORS** | ^2.8.5 | Cross-Origin Resource Sharing |
| **dotenv** | ^16.3.1 | Environment variables management |
| **pg** | ^8.11.3 | PostgreSQL client for Node.js |

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | ^18.2.0 | UI library |
| **React DOM** | ^18.2.0 | React DOM renderer |
| **Tailwind CSS** | ^3.3.6 | Utility-first CSS framework |
| **React Router DOM** | ^6.20.1 | Client-side routing |
| **Axios** | ^1.6.2 | HTTP client with interceptors |
| **Vite** | ^5.0.8 | Next generation build tool |
| **PostCSS** | ^8.4.32 | CSS processing |
| **Autoprefixer** | ^10.4.16 | CSS vendor prefixing |

## 📁 Project Structure

```
Task Management System/
├── backend/                          # Full-stack backend
│   ├── config/
│   │   └── database.js               # PostgreSQL connection with Sequelize
│   ├── controllers/
│   │   ├── authController.js         # Signup, Login, Get Current User
│   │   └── taskController.js         # CRUD operations for tasks
│   ├── middlewares/
│   │   ├── auth.js                   # JWT verification
│   │   ├── errorHandler.js           # Global error handling
│   │   └── validation.js             # Input validation rules
│   ├── models/
│   │   ├── User.js                   # User schema
│   │   ├── Task.js                   # Task schema
│   │   └── index.js                  # User-Task associations
│   ├── routes/
│   │   ├── authRoutes.js             # Authentication endpoints
│   │   └── taskRoutes.js             # Task endpoints
│   ├── .env.example                  # Backend environment template
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── server.js                     # Entry point
│
├── frontend/                         # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx            # Navigation with logout
│   │   │   ├── Navbar.css            # Navbar custom styles
│   │   │   ├── TaskForm.jsx          # Create new task form
│   │   │   ├── TaskForm.css          # TaskForm custom styles
│   │   │   ├── TaskItem.jsx          # Individual task display & actions
│   │   │   └── TaskItem.css          # TaskItem custom styles
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx         # Task dashboard with statistics
│   │   │   ├── Login.jsx             # Login page
│   │   │   ├── Signup.jsx            # Signup page
│   │   │   └── TaskDetail.jsx        # Individual task detail view
│   │   ├── services/
│   │   │   └── api.js                # Axios instance with JWT interceptor
│   │   ├── styles/
│   │   │   ├── Dashboard.css         # Dashboard page styles
│   │   │   ├── Login.css             # Login page styles
│   │   │   ├── Signup.css            # Signup page styles
│   │   │   └── TaskDetail.css        # TaskDetail page styles
│   │   ├── App.jsx                   # Main app & routing
│   │   ├── index.css                 # Tailwind + custom global styles
│   │   └── main.jsx                  # React entry point
│   ├── .env.example                  # Frontend environment template
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js             # PostCSS configuration
│   ├── tailwind.config.js            # Tailwind CSS configuration
│   └── vite.config.js                # Vite build configuration
│
├── .gitignore                        # Root git ignore
├── ARCHITECTURE.md                   # System design & architecture decisions
├── DEVELOPER_HANDBOOK.md             # Developer guide & getting started
├── DEPLOYMENT.md                     # Production deployment guide
├── INDEX.md                          # Documentation index & navigation
├── PRE_DEPLOYMENT_CHECKLIST.md       # Pre-deployment verification checklist
├── PROJECT_SUMMARY.md                # Project completion summary
├── QUICK_START.md                    # 30-minute quickstart guide
├── README.md                         # This file - main documentation
├── TESTING.md                        # Complete testing guide
└── TODO.md                           # Implementation progress tracker
```

## 📋 Prerequisites

- **Node.js** v16 or higher ([Download](https://nodejs.org/))
- **PostgreSQL** local or cloud ([PostgreSQL](https://www.postgresql.org/) / [Supabase](https://supabase.com) / [Neon](https://neon.tech))
- **npm** or **yarn** (comes with Node.js)
- **Git** for version control

## 🚀 Quick Start (Local Development)

### Step 1: Clone the Repository

```bash
git clone <your-repo-url>
cd "Task Management System"
```

### Step 2: Setup PostgreSQL Database

**Option A: Local PostgreSQL**
```bash
psql -U postgres
CREATE DATABASE taskmanagement;
\q
```

**Option B: Cloud Database (Supabase/Neon)**
- Create a new database project
- Copy the connection string
- You'll use this in the .env file

### Step 3: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your database credentials
# On Windows: notepad .env
# On Mac/Linux: nano .env
```

**Edit the `.env` file:**
```env
PORT=5000
DB_HOST=localhost          # or your cloud DB host
DB_PORT=5432
DB_NAME=taskmanagement
DB_USER=postgres           # your username
DB_PASSWORD=your_password  # your password
JWT_SECRET=super_secret_key_change_this_in_production_12345
```

**Start the Backend Server:**
```bash
npm start
# Development mode with auto-reload:
npm run dev
```

✅ Backend running on `http://localhost:5000`

### Step 4: Setup Frontend

Open a **new terminal** window:

```bash
cd frontend

# Install dependencies
npm install

# Create environment file (optional for local development)
cp .env.example .env
```

**Edit the `.env` file (for production or custom backend URL):**
```env
VITE_API_URL=http://localhost:5000/api
```

**Start development server:**
```bash
npm run dev
```

✅ Frontend running on `http://localhost:3000`

### Step 5: Test the Application

1. Open http://localhost:3000 in your browser
2. Click "Sign Up" to create an account
3. Use any email and password (min 6 characters)
4. Create, update, and manage your tasks!

## 🖥️ Development Commands

### Backend Scripts
| Command | Description |
|---------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server with nodemon (auto-reload) |
| `npm install` | Install all dependencies |

### Frontend Scripts
| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm install` | Install all dependencies |

## 🗄️ Database Schema

### Users Table
| Column | Type | Constraints |
|--------|------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTO_INCREMENT |
| `email` | STRING(255) | UNIQUE, NOT NULL |
| `password` | STRING(255) | NOT NULL |
| `createdAt` | TIMESTAMP | Auto-generated |
| `updatedAt` | TIMESTAMP | Auto-generated |

### Tasks Table
| Column | Type | Constraints |
|--------|------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTO_INCREMENT |
| `title` | STRING(255) | NOT NULL |
| `description` | TEXT | Optional |
| `status` | ENUM | `Pending` or `Completed`, DEFAULT `Pending` |
| `userId` | INTEGER | FOREIGN KEY → Users.id |
| `createdAt` | TIMESTAMP | Auto-generated |
| `updatedAt` | TIMESTAMP | Auto-generated |

### Relationships
- **One User → Many Tasks** (1:N relationship)
- Tasks are cascaded when a user is deleted
- `userId` foreign key enforces data isolation

## 🔀 Frontend Routes

| Route | Component | Access | Description |
|-------|-----------|--------|-------------|
| `/` | `Login.jsx` | Public | Login page with link to signup |
| `/signup` | `Signup.jsx` | Public | Signup page with link to login |
| `/dashboard` | `Dashboard.jsx` | Protected | Main task management dashboard |
| `/task/:id` | `TaskDetail.jsx` | Protected | Individual task detail view |

Protected routes automatically redirect unauthenticated users to the login page.

## 🔐 Authentication

### How It Works

1. **Signup**: User provides email & password → Password hashed with bcrypt → User stored in database
2. **Login**: Email & password verified → JWT token generated → Token sent to frontend
3. **Token Storage**: Frontend stores JWT in localStorage
4. **Protected Requests**: Every API request includes: `Authorization: Bearer <token>`
5. **Token Verification**: Backend verifies JWT → Identifies user → Returns only user's data

### Security Measures

- Passwords hashed with bcryptjs (10 salt rounds)
- JWT tokens expire after 24 hours
- Auto-redirect to login if token expires
- Users can only access their own tasks
- Input validation on all endpoints
- SQL injection protection via Sequelize ORM
- CORS properly configured for cross-origin requests

## 📚 API Documentation

### Authentication Endpoints

**Sign Up**
```http
POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepass123"
}

Response (201):
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": 1, "email": "user@example.com" }
}
```

**Login**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepass123"
}

Response (200):
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": 1, "email": "user@example.com" }
}
```

**Get Current User**
```http
GET /api/auth/me
Authorization: Bearer <your_token>

Response (200):
{
  "id": 1,
  "email": "user@example.com",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

### Task Endpoints (All require authentication)

**Create Task**
```http
POST /api/tasks
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the task management system",
  "status": "Pending"
}

Response (201):
{
  "message": "Task created successfully",
  "task": {
    "id": 1,
    "title": "Complete project",
    "description": "...",
    "status": "Pending",
    "userId": 1,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

**Get All Tasks**
```http
GET /api/tasks
Authorization: Bearer <your_token>

Response (200):
[
  {
    "id": 1,
    "title": "Complete project",
    "status": "Pending",
    "userId": 1
  }
]
```

**Update Task**
```http
PUT /api/tasks/:id
Authorization: Bearer <your_token>
Content-Type: application/json

{ "status": "Completed" }

Response (200):
{
  "message": "Task updated successfully",
  "task": { ... }
}
```

**Delete Task**
```http
DELETE /api/tasks/:id
Authorization: Bearer <your_token>

Response (200):
{
  "message": "Task deleted successfully"
}
```

## 🔧 Environment Variables

### Backend `.env`
```env
PORT=5000                          # Server port
NODE_ENV=development               # Environment mode

# Database Configuration
DB_HOST=localhost                  # Database host
DB_PORT=5432                       # Database port
DB_NAME=taskmanagement             # Database name
DB_USER=postgres                   # Database username
DB_PASSWORD=your_password          # Database password

# JWT Configuration
JWT_SECRET=your_super_secret_key   # Secret for JWT signing (change in production!)

# CORS (optional, for production)
FRONTEND_URL=http://localhost:3000 # Allowed frontend origin
```

### Frontend `.env`
```env
VITE_API_URL=http://localhost:5000/api   # Backend API base URL
```

> ⚠️ **Important**: Never commit `.env` files to version control. Use `.env.example` as a template.

## 📸 Screenshots

> Add screenshots of your application here to showcase the UI.

| Page | Description |
|------|-------------|
| Login | User authentication page |
| Signup | Account registration page |
| Dashboard | Main task management interface with statistics |
| Task Detail | Individual task view with full details |

## 📖 Documentation Index

This project includes comprehensive documentation for all audiences:

| Document | Purpose | Audience | Read Time |
|----------|---------|----------|-----------|
| **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** | Project completion status and overview | Project Managers, Everyone | 10 min |
| **[QUICK_START.md](./QUICK_START.md)** | 30-minute quickstart guide | Developers | 5 min |
| **[README.md](./README.md)** | Main documentation (this file) | Everyone | 20 min |
| **[ARCHITECTURE.md](./ARCHITECTURE.md)** | System design, database schema, auth flow, patterns | Developers, Architects | 15 min |
| **[DEVELOPER_HANDBOOK.md](./DEVELOPER_HANDBOOK.md)** | Developer guide, key files explained, learning path | Developers, Learners | 15 min |
| **[DEPLOYMENT.md](./DEPLOYMENT.md)** | Step-by-step production deployment | DevOps, Developers | 20 min |
| **[PRE_DEPLOYMENT_CHECKLIST.md](./PRE_DEPLOYMENT_CHECKLIST.md)** | Pre-deployment verification checklist | DevOps, QA | 15 min |
| **[TESTING.md](./TESTING.md)** | Manual testing, API testing, security testing | QA, Developers | 15 min |
| **[INDEX.md](./INDEX.md)** | Documentation navigation and quick links | Everyone | 5 min |

## 🌐 Deployment

### Backend Deployment (Render/Heroku)

1. Push code to GitHub
2. Create account on [Render](https://render.com)
3. Create new Web Service from GitHub
4. Set environment variables
5. Deploy!

### Frontend Deployment (Vercel/Netlify)

1. Build: `cd frontend && npm run build`
2. Upload `dist` folder to Vercel/Netlify
3. Set `VITE_API_URL` to your backend URL

For detailed deployment instructions, see **[DEPLOYMENT.md](./DEPLOYMENT.md)**.

## 📝 Troubleshooting

### Backend Issues

**"Unable to connect to the database"**
- Check PostgreSQL is running
- Verify DB credentials in `.env`
- Check DB_HOST (localhost for local, cloud host for remote)

**"Port 5000 already in use"**
```bash
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -i :5000
```

**"JWT_SECRET is required"**
- Set JWT_SECRET in `.env`

### Frontend Issues

**"Cannot find module errors"**
```bash
cd frontend
rm -rf node_modules
npm install
```

**"CORS error"**
- Ensure backend running on :5000
- Check `vite.config.js` proxy settings
- Verify CORS origin in backend matches your frontend URL

**"Blank page after build"**
- Check browser console (F12) for errors
- Verify `VITE_API_URL` is set correctly
- Ensure backend is running and accessible

## 🧪 Testing

For complete testing procedures including:
- Manual testing checklists
- API testing with curl/Postman
- Security testing
- Performance testing
- Browser compatibility testing

See **[TESTING.md](./TESTING.md)**.

Quick manual test:
1. Signup: `test@example.com` / `password123`
2. Create task: "My first task"
3. Toggle status to completed
4. Delete task
5. Logout and login again

## 📦 Production Checklist

Before deploying to production, ensure:

- [ ] Change JWT_SECRET to strong random string (32+ characters)
- [ ] Enable HTTPS
- [ ] Set NODE_ENV=production
- [ ] Configure database backups
- [ ] Set up CORS with production frontend URL
- [ ] Remove console.log statements
- [ ] Test all authentication flows
- [ ] Test all task CRUD operations
- [ ] Verify responsive design on mobile/tablet/desktop
- [ ] Run npm audit to check for vulnerabilities
- [ ] Setup monitoring and error logging

For a complete pre-deployment checklist, see **[PRE_DEPLOYMENT_CHECKLIST.md](./PRE_DEPLOYMENT_CHECKLIST.md)**.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Test thoroughly
5. Commit with clear messages: `git commit -m "Add feature: description"`
6. Push to your fork: `git push origin feature/your-feature-name`
7. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate error handling.

## 🙏 Acknowledgments

- [React](https://react.dev/) - UI library
- [Express.js](https://expressjs.com/) - Backend framework
- [Sequelize](https://sequelize.org/) - Database ORM
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Vite](https://vitejs.dev/) - Build tool
- [PostgreSQL](https://www.postgresql.org/) - Database

## 📄 License

Created for Full Stack Developer Intern Screening Test

---

**Happy coding! 🎉**


