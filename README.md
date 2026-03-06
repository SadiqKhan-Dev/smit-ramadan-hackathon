# ClinicPro — Hospital Management System

A full-featured clinic management web application built with **React 19**, **Firebase**, and **Tailwind CSS v4**. Supports four user roles — Admin, Doctor, Receptionist, and Patient — each with their own dedicated dashboard and complete data management features.

---

## Demo Login Credentials

| Role             | Email                        | Password   |
|------------------|------------------------------|------------|
| **Admin**        | shariq@gmail.com             | 123456sk   |
| **Doctor**       | saiqkhan489@clinic.com       | 123456sk   |
| **Receptionist** | receptionist@clinic.com      | demo1234   |
| **Patient**      | patient@clinic.com           | demo1234   |

> One-click **Demo Login** buttons are also available on the login page — no typing required.

---

## Tech Stack

| Technology        | Version | Purpose                           |
|-------------------|---------|-----------------------------------|
| React             | 19.2    | UI framework                      |
| Vite              | 8.x     | Build tool & dev server           |
| Tailwind CSS      | 4.2     | Utility-first styling             |
| Firebase Auth     | 12.x    | Authentication & user management  |
| Firebase Firestore| 12.x    | Real-time NoSQL database          |
| React Router DOM  | 7.x     | Client-side routing               |
| Lucide React      | 0.575   | Icon library                      |

---

## Features Overview

### Authentication
- Email/Password login via Firebase Auth
- Role-based access control (Admin, Doctor, Receptionist, Patient)
- Protected routes — unauthorized users redirected automatically
- Role stored in Firebase Auth `displayName` as `"role::Name"` format for 100% reliable login (no Firestore dependency)
- LocalStorage role caching as offline fallback
- One-click demo login with auto account creation on first use

### Admin — Create Accounts for Staff & Patients
- Admin creates **Firebase Auth accounts** for any doctor, receptionist, or patient directly from the dashboard
- Uses a **secondary Firebase app instance** — admin stays signed in while creating accounts for others
- After creation, admin sees the credentials (email + password) to share with the staff/patient

---

## Role-Based Dashboards

### Admin Dashboard `/admin/dashboard`

| Section              | Features                                                                 |
|----------------------|--------------------------------------------------------------------------|
| **Dashboard**        | Stats overview (doctors, patients, receptionists, revenue), quick-access cards |
| **Manage Doctors**   | Add, Edit, Delete — 100+ entries — name, email, specialty, phone, gender, status |
| **Manage Receptionists** | Add, Edit, Delete — 100+ entries — name, email, phone, gender, status |
| **Manage Patients**  | Add, Edit, Delete — 110+ entries — name, disease, blood type, gender, status |
| **Analytics**        | Patient status breakdown bar chart, blood type distribution, staff-to-patient ratio |
| **Reports**          | Summary statistics, top doctors table, critical patients list, revenue overview |
| **Settings**         | Clinic info form, notification toggles, appearance settings |
| **Create Account 🔑**| Key icon on every row — set email + password for any doctor/receptionist/patient |

---

### Doctor Dashboard `/doctor/dashboard`

| Section           | Data Count | Features                                                        |
|-------------------|------------|-----------------------------------------------------------------|
| **Dashboard**     | —          | Stats cards + today's full schedule list                        |
| **My Patients**   | 25+        | Add, Edit, Delete — age, gender, blood type, disease, status, last visit |
| **Appointments**  | 25+        | Add, Edit, Delete — date, time, type, status, notes            |
| **Prescriptions** | 22+        | Add, Edit, Delete — diagnosis, medicines (multi-line), follow-up date, notes |
| **Documents**     | 22+        | Add, Edit, Delete — document type, patient, date, status (pending/reviewed) |
| **Settings**      | —          | Profile info display                                            |

**Appointment Types:** General, Follow-up, Emergency, Consultation, Specialist

**Document Types:** Lab Report, X-Ray, MRI, Blood Test, ECG, Ultrasound, Biopsy Report, Eye Test, Bone Density Scan, Discharge Summary, Evaluation, Endoscopy Report

---

### Receptionist Dashboard `/receptionist/dashboard`

| Section          | Features                                      |
|------------------|-----------------------------------------------|
| **Dashboard**    | Stats (patients, appointments, doctors)       |
| **Appointments** | View & manage all clinic appointments         |
| **Patients**     | Add new patients, view patient list           |
| **Billing**      | Billing overview                              |
| **Documents**    | Document management                           |

---

### Patient Dashboard `/patient/dashboard`

| Section            | Features                                    |
|--------------------|---------------------------------------------|
| **My Appointments**| Scheduled, completed, and cancelled appointments |
| **Prescriptions**  | All prescriptions from doctors              |
| **Medical History**| Past visits and records                     |

---

## Project Structure

```
project-6/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   └── Sidebar.jsx              # Role-aware collapsible navigation sidebar
│   │   ├── ui/
│   │   │   ├── Button.jsx               # Variants: primary, outline, ghost, danger, success
│   │   │   ├── Card.jsx                 # Card, CardContent, StatCard
│   │   │   ├── Input.jsx                # Input, Select components
│   │   │   ├── ModalForm.jsx            # Modal form + ConfirmDialog
│   │   │   ├── DataTable.jsx            # Searchable & sortable data table
│   │   │   └── components.js            # StatusBadge, PageHeader, EmptyState, LoadingSkeleton
│   │   └── ProtectedRoute.jsx           # Route guards (auth + role-based)
│   ├── config/
│   │   └── firebase.js                  # Firebase app initialization
│   ├── context/
│   │   └── AuthContext.jsx              # Auth state, login, signup, logout, fetchRole
│   ├── data/
│   │   └── mockData.js                  # 100 doctors, 100 receptionists, 110 patients,
│   │                                    # 25 doctor patients/appointments, 22 prescriptions/docs
│   ├── pages/
│   │   ├── LandingPage.jsx              # Public landing page
│   │   ├── LoginPage.jsx                # Login + demo quick-login buttons
│   │   ├── SignupPage.jsx               # User self-registration
│   │   ├── DashboardRouter.jsx          # Role-based redirect after login
│   │   ├── admin/
│   │   │   └── AdminDashboard.jsx       # Admin panel — 6 sections, full CRUD
│   │   ├── doctor/
│   │   │   └── DoctorDashboard.jsx      # Doctor panel — 5 sections, full CRUD
│   │   ├── receptionist/
│   │   │   └── ReceptionistDashboard.jsx
│   │   └── patient/
│   │       └── PatientDashboard.jsx
│   ├── utils/
│   │   ├── createUserAccount.js         # Secondary Firebase app for admin account creation
│   │   └── seedDemoData.js              # Demo data seeder for Firestore
│   └── App.jsx                          # Router & route definitions
├── firestore.rules                       # Firestore security rules
├── .env                                  # Environment variables (not committed)
├── .env.example                          # Environment variable template
└── package.json
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/SadiqKhan-Dev/smit-ramadan-hackathon.git
cd smit-ramadan-hackathon
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Go to **Authentication** → **Sign-in method** → Enable **Email/Password**
4. Go to **Firestore Database** → Create database → Start in **test mode**
5. Go to **Project Settings** → **General** → scroll to **Your apps** → copy config

### 4. Configure Environment Variables

Create a `.env` file in the root:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 5. Deploy Firestore Security Rules

In **Firebase Console → Firestore → Rules**, paste this and click **Publish**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 7. Build for Production

```bash
npm run build
```

---

## How Admin Account Creation Works

Admin can create login accounts for any doctor, receptionist, or patient without getting signed out:

```
Admin clicks 🔑 on a row
       ↓
Enter email + password in modal
       ↓
Secondary Firebase app instance created (same project)
       ↓
createUserWithEmailAndPassword() on secondary app
       ↓
updateProfile() → displayName = "role::Full Name"
  Example: "doctor::Dr. Ahmed Khan"
       ↓
Firestore profile saved at /users/{uid}
       ↓
Secondary app signed out & deleted after 10s
       ↓
Admin remains signed in to primary app ✓
```

**At login time**, role is extracted directly from `displayName` — instant, no Firestore needed:

```
Login → Firebase Auth succeeds
       ↓
fetchRole checks: auth.currentUser.displayName
  → "doctor::Dr. Ahmed Khan"
  → split("::")[0] = "doctor"
  → navigate to /doctor/dashboard ✓
```

---

## Mock Data Reference

When Firestore is empty or unreachable, the app automatically uses mock data:

| Export Name                  | Count | Used In                  |
|------------------------------|-------|--------------------------|
| `MOCK_ADMIN_DOCTORS`         | 100   | Admin → Doctors section  |
| `MOCK_ADMIN_RECEPTIONISTS`   | 100   | Admin → Receptionists    |
| `MOCK_ADMIN_PATIENTS`        | 110   | Admin → Patients section |
| `MOCK_DOCTOR_PATIENTS`       | 25    | Doctor → My Patients     |
| `MOCK_DOCTOR_APPOINTMENTS`   | 25    | Doctor → Appointments    |
| `MOCK_DOCTOR_PRESCRIPTIONS`  | 22    | Doctor → Prescriptions   |
| `MOCK_DOCTOR_DOCUMENTS`      | 22    | Doctor → Documents       |
| `MOCK_ALL_APPOINTMENTS`      | 15    | Receptionist dashboard   |
| `MOCK_PATIENT_APPOINTMENTS`  | 5     | Patient dashboard        |
| `MOCK_PRESCRIPTIONS`         | 5     | Patient dashboard        |

---

## Firestore Collections

| Collection      | Fields                                                       |
|-----------------|--------------------------------------------------------------|
| `users`         | uid, name, email, role, specialty, phone, status, hasAccount, createdAt |
| `patients`      | name, age, gender, phone, email, bloodType, disease, status, doctorId, lastVisit |
| `appointments`  | patientName, patientId, doctorId, doctorName, date, time, type, status, notes |
| `prescriptions` | patientName, patientId, doctorId, doctorName, diagnosis, medicines, notes, followUp |
| `documents`     | name, type, patientName, patientId, doctorId, date, size, status |

---

## Application Routes

| Path                        | Access           | Description                      |
|-----------------------------|------------------|----------------------------------|
| `/`                         | Public           | Landing page                     |
| `/login`                    | Public only      | Login page with demo buttons     |
| `/signup`                   | Public only      | User self-registration           |
| `/dashboard`                | Authenticated    | Auto-redirects based on role     |
| `/admin/dashboard`          | Admin only       | Full admin control panel         |
| `/doctor/dashboard`         | Doctor only      | Doctor clinical dashboard        |
| `/receptionist/dashboard`   | Receptionist     | Front desk management panel      |
| `/patient/dashboard`        | Patient only     | Patient self-service portal      |

---

## UI Component Reference

| Component       | Description                                                      |
|-----------------|------------------------------------------------------------------|
| `Button`        | Variants: primary, outline, ghost, danger, success, loading state |
| `Input`         | Text, email, password, date — with icon and rightElement support |
| `Select`        | Dropdown using `options={[{value, label}]}` prop array           |
| `DataTable`     | Built-in search, sort, custom column renderers, action column    |
| `StatCard`      | Stat display with icon, value, change text, trend indicator      |
| `Card`          | Container with optional clickable hover state                    |
| `ModalForm`     | Overlay modal with form, onSubmit handler, isLoading prop        |
| `ConfirmDialog` | Danger confirmation dialog with confirm/cancel actions           |
| `StatusBadge`   | Colored pill badge — success / warning / danger / info / default |
| `PageHeader`    | Section heading with subtitle and right-side actions slot        |
| `EmptyState`    | Empty content placeholder with icon and optional CTA button      |
| `Sidebar`       | Role-aware collapsible sidebar with grouped navigation items     |

---

## NPM Scripts

```bash
npm run dev       # Start development server → http://localhost:5173
npm run build     # Build optimized production bundle
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

---

## Deployment (Vercel)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Add all `VITE_FIREBASE_*` environment variables in Vercel project settings
4. Deploy — Vercel auto-detects Vite and builds correctly

---

## Known Limitations

- **Document upload** — file storage (Firebase Storage) is not integrated; metadata only
- **Billing** — UI placeholder only; no payment gateway
- **Patient dashboard** — read-only view; patients cannot edit their own records
- **Firestore offline** — app gracefully falls back to mock data when Firestore is unreachable

---

## License

MIT License — free to use for educational and personal projects.

---

*Built for the **SMIT Ramadan Hackathon** — ClinicPro: Simplifying clinic management for doctors, receptionists, and patients.*
