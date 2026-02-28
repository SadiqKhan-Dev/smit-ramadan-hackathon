# 🏥 ClinicPro - Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Fill in your credentials in `.env`:

#### Neon Database Setup
1. Go to [https://console.neon.tech](https://console.neon.tech)
2. Sign up / Login
3. Create a new project called "ClinicPro"
4. Copy the connection string
5. Paste in `.env` as `DATABASE_URL`

Example:
```
DATABASE_URL=postgresql://username:password@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

#### Firebase Setup
1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Create a new project
3. Enable Authentication (Email/Password)
4. Enable Firestore Database
5. Get your config from Project Settings
6. Fill in the `VITE_FIREBASE_*` values in `.env`

### 3. Run Development Server

```bash
npm run dev
```

### 4. Initialize Database

The database tables will be created automatically on first run. You can also manually initialize:

```javascript
import { initializeDatabase } from './src/lib/neon';
initializeDatabase();
```

## 📁 Project Structure

```
project-6/
├── .env                  # Your environment variables (DO NOT COMMIT)
├── .env.example          # Template for .env
├── firestore.rules       # Firebase security rules
├── src/
│   ├── config/
│   │   └── firebase.js   # Firebase configuration
│   ├── lib/
│   │   ├── neon.js       # Neon DB connection & queries
│   │   └── api.js        # API routes for database operations
│   ├── context/
│   │   └── AuthContext.jsx  # Authentication context
│   ├── components/
│   │   ├── ui/           # Reusable UI components
│   │   ├── layout/       # Layout components (Sidebar)
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── SignupPage.jsx
│   │   ├── admin/
│   │   ├── doctor/
│   │   ├── receptionist/
│   │   └── patient/
│   └── App.jsx
```

## 🔐 Database Schema (Neon PostgreSQL)

### Tables Created:

1. **users** - All user accounts (admin, doctor, receptionist, patient)
2. **patients** - Patient medical information
3. **appointments** - Appointment scheduling
4. **prescriptions** - Prescription records
5. **medical_records** - Medical history and diagnoses
6. **departments** - Hospital departments

### Key Features:
- Passwords hashed with bcrypt
- Foreign key relationships
- Indexes for performance
- Automatic timestamps

## 🚀 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```
Add environment variables in Vercel dashboard.

### Netlify
```bash
npm run build
```
Drag `dist` folder to Netlify or use Netlify CLI.

### Railway
1. Connect GitHub repo
2. Add environment variables
3. Deploy automatically

## 📊 Using Neon DB API

```javascript
import { db } from './src/lib/neon';

// Get all users with role 'doctor'
const doctors = await db.users.findByRole('doctor');

// Get patients assigned to a doctor
const patients = await db.patients.findByDoctorId(doctorId);

// Create appointment
const appointment = await db.appointments.create({
  patientId,
  doctorId,
  date: '2024-03-01',
  time: '10:00',
  type: 'Checkup'
});

// Update appointment status
await db.appointments.updateStatus(appointmentId, 'completed');
```

## 🔒 Security Notes

1. **Never commit `.env`** - It's in `.gitignore`
2. **Use strong passwords** - Minimum 6 characters
3. **Enable Firestore Rules** - Copy `firestore.rules` to Firebase
4. **HTTPS in production** - Required for Firebase Auth
5. **Rotate secrets** - Change JWT_SECRET in production

## 🛠️ Troubleshooting

### Database connection error
- Check `DATABASE_URL` in `.env`
- Ensure Neon project is active
- Check network/firewall

### Firebase auth error
- Verify Firebase config in `.env`
- Enable Email/Password in Firebase Console
- Check Firestore is created

### Build errors
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

## 📝 Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | Neon PostgreSQL connection | ✅ |
| `VITE_FIREBASE_API_KEY` | Firebase API key | ✅ |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | ✅ |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | ✅ |
| `VITE_FIREBASE_STORAGE_BUCKET` | Storage bucket | ❌ |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Sender ID | ❌ |
| `VITE_FIREBASE_APP_ID` | App ID | ✅ |
| `JWT_SECRET` | Session secret | ❌ |

## 🤝 Support

For issues:
1. Check `.env` configuration
2. Verify database connection
3. Check browser console for errors
4. Review Firebase console

---

Built with ❤️ using React + Neon DB + Firebase
