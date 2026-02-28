# ClinicPro - Professional Clinic Management System

A comprehensive, production-ready Clinic Management System built with React and Firebase. Features role-based access control for Admins, Doctors, Receptionists, and Patients.

## 🏥 Features

### Authentication & Authorization
- Email/Password authentication via Firebase Auth
- Role-based access control (Admin, Doctor, Receptionist, Patient)
- Protected routes with automatic redirection
- Secure Firestore security rules

### Role-Based Dashboards

#### Admin Dashboard
- View all doctors, receptionists, and patients
- Add/Edit/Delete staff members
- Assign patients to doctors
- System-wide analytics and statistics
- Full administrative control

#### Doctor Dashboard
- View only assigned patients (filtered by doctorId)
- Manage appointments
- Add prescriptions
- Patient medical history access
- Dashboard statistics

#### Receptionist Dashboard
- Add new patients
- Book appointments
- View all patients and doctors
- Manage front desk operations

#### Patient Dashboard
- View personal appointments
- Access prescriptions
- Medical history timeline
- Personal health records

### Landing Page
- Professional hero section
- Services showcase
- About section
- Why Choose Us section
- Contact form
- Responsive footer

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Firebase account (free tier works)

### 1. Clone and Install

```bash
cd D:\REACT-SMIT\project-6
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project called "ClinicPro"
3. Enable Authentication:
   - Go to Authentication → Sign-in method
   - Enable "Email/Password"
4. Enable Firestore Database:
   - Go to Firestore Database
   - Create database (start in test mode, then apply rules)
5. Get your Firebase config:
   - Go to Project Settings → General
   - Scroll to "Your apps" → Web app
   - Copy the config object

### 3. Configure Firebase

Open `src/config/firebase.js` and replace the placeholder config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

### 4. Deploy Firestore Rules

Copy the contents of `firestore.rules` to your Firebase Console:
- Go to Firestore Database → Rules
- Paste the rules and publish

### 5. Run Development Server

```bash
npm run dev
```

### 6. Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── config/
│   └── firebase.js          # Firebase configuration
├── context/
│   └── AuthContext.jsx      # Authentication context provider
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── ErrorAlert.jsx
│   │   └── ...
│   ├── layout/
│   │   └── Sidebar.jsx      # Role-based sidebar
│   └── ProtectedRoute.jsx   # Route protection
├── pages/
│   ├── LandingPage.jsx      # Public landing page
│   ├── LoginPage.jsx        # Login form
│   ├── SignupPage.jsx       # Signup with role selection
│   ├── DashboardRouter.jsx  # Role-based redirect
│   ├── admin/
│   │   └── AdminDashboard.jsx
│   ├── doctor/
│   │   └── DoctorDashboard.jsx
│   ├── receptionist/
│   │   └── ReceptionistDashboard.jsx
│   └── patient/
│       └── PatientDashboard.jsx
├── App.jsx                  # Main app with routing
└── main.jsx                 # Entry point
```

## 🔐 Firestore Security Rules

The system implements strict security rules:

- **Admins**: Full access to all collections
- **Doctors**: Can only access their assigned patients
- **Receptionists**: Can manage patients and appointments
- **Patients**: Can only access their own records

## 🎨 Design System

### Colors
- Primary: Blue (#3b82f6)
- Success: Green (#22c55e)
- Warning: Yellow (#f59e0b)
- Danger: Red (#ef4444)
- Purple: (#a855f7)

### Typography
- Font: Inter (Google Fonts)
- Headings: Bold, clear hierarchy
- Body: Regular weight, readable

### Components
- DashboardCard: Statistics display
- DataTable: Searchable, sortable tables
- StatusBadge: Color-coded status indicators
- ModalForm: Reusable modal dialogs
- LoadingSpinner: Multiple variants
- EmptyState: Beautiful empty states

## 📝 Usage Examples

### Creating an Admin Account

1. Go to Signup page
2. Fill in your details
3. Select "Administrator" role
4. Complete signup

### Assigning Patients to Doctors

1. Login as Admin
2. Go to "Manage Patients"
3. Click "Assign" on unassigned patients
4. Select a doctor from the dropdown

### Doctor Viewing Assigned Patients

1. Login as Doctor
2. Dashboard automatically shows only your patients
3. View appointments and add prescriptions

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📦 Dependencies

- React 19+
- React Router DOM
- Firebase (Auth + Firestore)
- Tailwind CSS 4
- Lucide React (icons)

## 🛡️ Security Considerations

1. Never commit Firebase config with real keys
2. Use environment variables for sensitive data
3. Firestore rules are essential - test thoroughly
4. Implement rate limiting for production
5. Add HTTPS in production

## 🚀 Production Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag dist folder to Netlify
```

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 📄 License

MIT License - feel free to use for personal and commercial projects.

## 🤝 Support

For issues and questions, please check the documentation or contact support.

---

Built with ❤️ for healthcare professionals
