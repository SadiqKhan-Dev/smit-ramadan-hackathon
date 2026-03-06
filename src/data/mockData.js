/**
 * Demo Mock Data - Firestore empty ho to yeh show hoga
 */

const today     = new Date().toISOString().split('T')[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
const tomorrow  = new Date(Date.now() + 86400000).toISOString().split('T')[0];
const nextWeek  = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];

/* ── DOCTORS (25) ─────────────────────────────────────────────────── */
export const MOCK_DOCTORS = [
  { id: 'D001', name: 'Dr. Ahmed Khan',       gender: 'Male',   email: 'ahmed@clinic.com',     specialty: 'Cardiologist',       phone: '0300-1111001', role: 'doctor', status: 'active' },
  { id: 'D002', name: 'Dr. Fatima Zahra',     gender: 'Female', email: 'fatima@clinic.com',    specialty: 'Neurologist',        phone: '0300-1111002', role: 'doctor', status: 'active' },
  { id: 'D003', name: 'Dr. Usman Malik',      gender: 'Male',   email: 'usman@clinic.com',     specialty: 'Pediatrician',       phone: '0300-1111003', role: 'doctor', status: 'active' },
  { id: 'D004', name: 'Dr. Ayesha Siddiqi',   gender: 'Female', email: 'ayesha@clinic.com',    specialty: 'Dermatologist',      phone: '0300-1111004', role: 'doctor', status: 'active' },
  { id: 'D005', name: 'Dr. Hassan Raza',      gender: 'Male',   email: 'hassan@clinic.com',    specialty: 'Orthopedic',         phone: '0300-1111005', role: 'doctor', status: 'active' },
  { id: 'D006', name: 'Dr. Sadia Noor',       gender: 'Female', email: 'sadia@clinic.com',     specialty: 'Gynecologist',       phone: '0300-1111006', role: 'doctor', status: 'active' },
  { id: 'D007', name: 'Dr. Imran Butt',       gender: 'Male',   email: 'imran@clinic.com',     specialty: 'General Physician',  phone: '0300-1111007', role: 'doctor', status: 'active' },
  { id: 'D008', name: 'Dr. Hina Akhtar',      gender: 'Female', email: 'hina@clinic.com',      specialty: 'Psychiatrist',       phone: '0300-1111008', role: 'doctor', status: 'active' },
  { id: 'D009', name: 'Dr. Tariq Mehmood',    gender: 'Male',   email: 'tariq@clinic.com',     specialty: 'Urologist',          phone: '0300-1111009', role: 'doctor', status: 'active' },
  { id: 'D010', name: 'Dr. Zainab Ali',       gender: 'Female', email: 'zainab@clinic.com',    specialty: 'Ophthalmologist',    phone: '0300-1111010', role: 'doctor', status: 'active' },
  { id: 'D011', name: 'Dr. Bilal Chaudhry',   gender: 'Male',   email: 'bilal@clinic.com',     specialty: 'Gastroenterologist', phone: '0300-1111011', role: 'doctor', status: 'active' },
  { id: 'D012', name: 'Dr. Mariam Sheikh',    gender: 'Female', email: 'mariam@clinic.com',    specialty: 'Endocrinologist',    phone: '0300-1111012', role: 'doctor', status: 'active' },
  { id: 'D013', name: 'Dr. Kamran Qureshi',   gender: 'Male',   email: 'kamran@clinic.com',    specialty: 'Pulmonologist',      phone: '0300-1111013', role: 'doctor', status: 'active' },
  { id: 'D014', name: 'Dr. Nadia Hussain',    gender: 'Female', email: 'nadia@clinic.com',     specialty: 'Radiologist',        phone: '0300-1111014', role: 'doctor', status: 'active' },
  { id: 'D015', name: 'Dr. Faisal Jamil',     gender: 'Male',   email: 'faisal@clinic.com',    specialty: 'Nephrologist',       phone: '0300-1111015', role: 'doctor', status: 'active' },
  { id: 'D016', name: 'Dr. Saima Baig',       gender: 'Female', email: 'saima@clinic.com',     specialty: 'Rheumatologist',     phone: '0300-1111016', role: 'doctor', status: 'active' },
  { id: 'D017', name: 'Dr. Asad Farooq',      gender: 'Male',   email: 'asad@clinic.com',      specialty: 'Oncologist',         phone: '0300-1111017', role: 'doctor', status: 'active' },
  { id: 'D018', name: 'Dr. Rabia Maqsood',    gender: 'Female', email: 'rabia@clinic.com',     specialty: 'Pathologist',        phone: '0300-1111018', role: 'doctor', status: 'active' },
  { id: 'D019', name: 'Dr. Zubair Nawaz',     gender: 'Male',   email: 'zubair@clinic.com',    specialty: 'ENT Specialist',     phone: '0300-1111019', role: 'doctor', status: 'active' },
  { id: 'D020', name: 'Dr. Amna Rashid',      gender: 'Female', email: 'amna@clinic.com',      specialty: 'Immunologist',       phone: '0300-1111020', role: 'doctor', status: 'active' },
  { id: 'D021', name: 'Dr. Shahid Mehmood',   gender: 'Male',   email: 'shahid@clinic.com',    specialty: 'Cardiologist',       phone: '0300-1111021', role: 'doctor', status: 'active' },
  { id: 'D022', name: 'Dr. Lubna Pervez',     gender: 'Female', email: 'lubna@clinic.com',     specialty: 'Pediatrician',       phone: '0300-1111022', role: 'doctor', status: 'active' },
  { id: 'D023', name: 'Dr. Omer Farhan',      gender: 'Male',   email: 'omer@clinic.com',      specialty: 'Neurologist',        phone: '0300-1111023', role: 'doctor', status: 'active' },
  { id: 'D024', name: 'Dr. Shumaila Yousaf',  gender: 'Female', email: 'shumaila@clinic.com',  specialty: 'Dermatologist',      phone: '0300-1111024', role: 'doctor', status: 'active' },
  { id: 'D025', name: 'Dr. Rizwan Haider',    gender: 'Male',   email: 'rizwan@clinic.com',    specialty: 'General Surgeon',    phone: '0300-1111025', role: 'doctor', status: 'active' },
];

/* ── RECEPTIONISTS (15) ───────────────────────────────────────────── */
export const MOCK_RECEPTIONISTS = [
  { id: 'R001', name: 'Sara Bibi',        gender: 'Female', email: 'sara@clinic.com',     phone: '0300-2222001', role: 'receptionist', status: 'active' },
  { id: 'R002', name: 'Maria Khan',       gender: 'Female', email: 'maria@clinic.com',    phone: '0300-2222002', role: 'receptionist', status: 'active' },
  { id: 'R003', name: 'Zara Ahmed',       gender: 'Female', email: 'zara@clinic.com',     phone: '0300-2222003', role: 'receptionist', status: 'active' },
  { id: 'R004', name: 'Adnan Rauf',       gender: 'Male',   email: 'adnan@clinic.com',    phone: '0300-2222004', role: 'receptionist', status: 'active' },
  { id: 'R005', name: 'Huma Tariq',       gender: 'Female', email: 'huma@clinic.com',     phone: '0300-2222005', role: 'receptionist', status: 'active' },
  { id: 'R006', name: 'Nasir Iqbal',      gender: 'Male',   email: 'nasir@clinic.com',    phone: '0300-2222006', role: 'receptionist', status: 'active' },
  { id: 'R007', name: 'Farah Naz',        gender: 'Female', email: 'farah@clinic.com',    phone: '0300-2222007', role: 'receptionist', status: 'active' },
  { id: 'R008', name: 'Imtiaz Hussain',   gender: 'Male',   email: 'imtiaz@clinic.com',   phone: '0300-2222008', role: 'receptionist', status: 'active' },
  { id: 'R009', name: 'Mehwish Aslam',    gender: 'Female', email: 'mehwish@clinic.com',  phone: '0300-2222009', role: 'receptionist', status: 'active' },
  { id: 'R010', name: 'Junaid Akram',     gender: 'Male',   email: 'junaid@clinic.com',   phone: '0300-2222010', role: 'receptionist', status: 'active' },
  { id: 'R011', name: 'Sobia Khalid',     gender: 'Female', email: 'sobia@clinic.com',    phone: '0300-2222011', role: 'receptionist', status: 'active' },
  { id: 'R012', name: 'Waheed Anjum',     gender: 'Male',   email: 'waheed@clinic.com',   phone: '0300-2222012', role: 'receptionist', status: 'active' },
  { id: 'R013', name: 'Bushra Parveen',   gender: 'Female', email: 'bushra@clinic.com',   phone: '0300-2222013', role: 'receptionist', status: 'active' },
  { id: 'R014', name: 'Irfan Sadiq',      gender: 'Male',   email: 'irfan@clinic.com',    phone: '0300-2222014', role: 'receptionist', status: 'active' },
  { id: 'R015', name: 'Nadia Pervez',     gender: 'Female', email: 'nadia.r@clinic.com',  phone: '0300-2222015', role: 'receptionist', status: 'active' },
];

/* ── PATIENTS (110) ───────────────────────────────────────────────── */
export const MOCK_PATIENTS_LIST = [
  { id: 'P001', name: 'Ali Hassan',         age: '35', gender: 'Male',   phone: '0300-3333001', email: 'ali@gmail.com',         status: 'active',    disease: 'Hypertension',       bloodType: 'B+',  doctorId: 'D001' },
  { id: 'P002', name: 'Nadia Akhtar',       age: '28', gender: 'Female', phone: '0300-3333002', email: 'nadia@gmail.com',       status: 'active',    disease: 'Migraine',           bloodType: 'A+',  doctorId: 'D002' },
  { id: 'P003', name: 'Bilal Sheikh',       age: '45', gender: 'Male',   phone: '0300-3333003', email: 'bilal@gmail.com',       status: 'active',    disease: 'Diabetes Type 2',    bloodType: 'O+',  doctorId: 'D001' },
  { id: 'P004', name: 'Sana Mirza',         age: '32', gender: 'Female', phone: '0300-3333004', email: 'sana@gmail.com',        status: 'active',    disease: 'Asthma',             bloodType: 'AB+', doctorId: 'D003' },
  { id: 'P005', name: 'Kamran Butt',        age: '52', gender: 'Male',   phone: '0300-3333005', email: 'kamran@gmail.com',      status: 'critical',  disease: 'Heart Disease',      bloodType: 'A-',  doctorId: 'D001' },
  { id: 'P006', name: 'Hira Nadeem',        age: '24', gender: 'Female', phone: '0300-3333006', email: 'hira@gmail.com',        status: 'active',    disease: 'Anemia',             bloodType: 'B-',  doctorId: 'D004' },
  { id: 'P007', name: 'Tariq Javed',        age: '41', gender: 'Male',   phone: '0300-3333007', email: 'tariq@gmail.com',       status: 'active',    disease: 'Arthritis',          bloodType: 'O-',  doctorId: 'D005' },
  { id: 'P008', name: 'Amna Siddiqui',      age: '29', gender: 'Female', phone: '0300-3333008', email: 'amna@gmail.com',        status: 'recovered', disease: 'Typhoid',            bloodType: 'A+',  doctorId: 'D007' },
  { id: 'P009', name: 'Zubair Ali',         age: '38', gender: 'Male',   phone: '0300-3333009', email: 'zubair@gmail.com',      status: 'active',    disease: 'Kidney Stone',       bloodType: 'B+',  doctorId: 'D009' },
  { id: 'P010', name: 'Rabia Qureshi',      age: '55', gender: 'Female', phone: '0300-3333010', email: 'rabia@gmail.com',       status: 'active',    disease: 'Osteoporosis',       bloodType: 'O+',  doctorId: 'D005' },
  { id: 'P011', name: 'Faisal Mahmood',     age: '47', gender: 'Male',   phone: '0300-3333011', email: 'faisal@gmail.com',      status: 'active',    disease: 'Cholesterol',        bloodType: 'AB-', doctorId: 'D001' },
  { id: 'P012', name: 'Lubna Nawaz',        age: '33', gender: 'Female', phone: '0300-3333012', email: 'lubna@gmail.com',       status: 'active',    disease: 'PCOS',               bloodType: 'A+',  doctorId: 'D006' },
  { id: 'P013', name: 'Asif Iqbal',         age: '60', gender: 'Male',   phone: '0300-3333013', email: 'asif@gmail.com',        status: 'critical',  disease: 'Stroke',             bloodType: 'B+',  doctorId: 'D002' },
  { id: 'P014', name: 'Mehwish Rehman',     age: '26', gender: 'Female', phone: '0300-3333014', email: 'mehwish@gmail.com',     status: 'active',    disease: 'Depression',         bloodType: 'O+',  doctorId: 'D008' },
  { id: 'P015', name: 'Usman Ghani',        age: '39', gender: 'Male',   phone: '0300-3333015', email: 'usman@gmail.com',       status: 'active',    disease: 'Hepatitis B',        bloodType: 'A-',  doctorId: 'D011' },
  { id: 'P016', name: 'Saima Farooq',       age: '44', gender: 'Female', phone: '0300-3333016', email: 'saima@gmail.com',       status: 'recovered', disease: 'Dengue Fever',       bloodType: 'B+',  doctorId: 'D007' },
  { id: 'P017', name: 'Naeem Baig',         age: '58', gender: 'Male',   phone: '0300-3333017', email: 'naeem@gmail.com',       status: 'active',    disease: 'COPD',               bloodType: 'O-',  doctorId: 'D013' },
  { id: 'P018', name: 'Faiza Saleem',       age: '31', gender: 'Female', phone: '0300-3333018', email: 'faiza@gmail.com',       status: 'active',    disease: 'Thyroid',            bloodType: 'AB+', doctorId: 'D012' },
  { id: 'P019', name: 'Adeel Chaudhry',     age: '27', gender: 'Male',   phone: '0300-3333019', email: 'adeel@gmail.com',       status: 'active',    disease: 'Gastritis',          bloodType: 'A+',  doctorId: 'D011' },
  { id: 'P020', name: 'Noor Fatima',        age: '22', gender: 'Female', phone: '0300-3333020', email: 'noor@gmail.com',        status: 'active',    disease: 'Tonsillitis',        bloodType: 'B-',  doctorId: 'D019' },
  { id: 'P021', name: 'Shahbaz Hussain',    age: '50', gender: 'Male',   phone: '0300-3333021', email: 'shahbaz@gmail.com',     status: 'active',    disease: 'Diabetes Type 1',    bloodType: 'O+',  doctorId: 'D012' },
  { id: 'P022', name: 'Iqra Ijaz',          age: '19', gender: 'Female', phone: '0300-3333022', email: 'iqra@gmail.com',        status: 'active',    disease: 'Iron Deficiency',    bloodType: 'A+',  doctorId: 'D004' },
  { id: 'P023', name: 'Rizwan Ashraf',      age: '42', gender: 'Male',   phone: '0300-3333023', email: 'rizwan@gmail.com',      status: 'critical',  disease: 'Liver Cirrhosis',    bloodType: 'AB+', doctorId: 'D015' },
  { id: 'P024', name: 'Sadia Khalid',       age: '36', gender: 'Female', phone: '0300-3333024', email: 'sadia@gmail.com',       status: 'active',    disease: 'Rheumatoid Arthritis', bloodType: 'B+', doctorId: 'D016' },
  { id: 'P025', name: 'Waheed Zaman',       age: '53', gender: 'Male',   phone: '0300-3333025', email: 'waheed@gmail.com',      status: 'active',    disease: 'Prostate Issue',     bloodType: 'O+',  doctorId: 'D009' },
  { id: 'P026', name: 'Huma Gul',           age: '48', gender: 'Female', phone: '0300-3333026', email: 'huma@gmail.com',        status: 'recovered', disease: 'Malaria',            bloodType: 'A-',  doctorId: 'D007' },
  { id: 'P027', name: 'Shoaib Akhtar',      age: '34', gender: 'Male',   phone: '0300-3333027', email: 'shoaib@gmail.com',      status: 'active',    disease: 'Back Pain',          bloodType: 'B+',  doctorId: 'D005' },
  { id: 'P028', name: 'Bushra Zafar',       age: '61', gender: 'Female', phone: '0300-3333028', email: 'bushra@gmail.com',      status: 'active',    disease: 'Cataracts',          bloodType: 'O+',  doctorId: 'D010' },
  { id: 'P029', name: 'Junaid Rauf',        age: '23', gender: 'Male',   phone: '0300-3333029', email: 'junaid@gmail.com',      status: 'active',    disease: 'Sinusitis',          bloodType: 'AB-', doctorId: 'D019' },
  { id: 'P030', name: 'Mahnoor Riaz',       age: '25', gender: 'Female', phone: '0300-3333030', email: 'mahnoor@gmail.com',     status: 'active',    disease: 'Anxiety Disorder',   bloodType: 'A+',  doctorId: 'D008' },
  { id: 'P031', name: 'Pervez Sultan',      age: '67', gender: 'Male',   phone: '0300-3333031', email: 'pervez@gmail.com',      status: 'critical',  disease: 'Heart Failure',      bloodType: 'B-',  doctorId: 'D001' },
  { id: 'P032', name: 'Tayyaba Imran',      age: '30', gender: 'Female', phone: '0300-3333032', email: 'tayyaba@gmail.com',     status: 'active',    disease: 'UTI',                bloodType: 'O-',  doctorId: 'D009' },
  { id: 'P033', name: 'Haroon Rashid',      age: '43', gender: 'Male',   phone: '0300-3333033', email: 'haroon@gmail.com',      status: 'active',    disease: 'Epilepsy',           bloodType: 'A+',  doctorId: 'D002' },
  { id: 'P034', name: 'Shazia Parveen',     age: '37', gender: 'Female', phone: '0300-3333034', email: 'shazia@gmail.com',      status: 'recovered', disease: 'Chicken Pox',        bloodType: 'B+',  doctorId: 'D003' },
  { id: 'P035', name: 'Waqas Ahmed',        age: '20', gender: 'Male',   phone: '0300-3333035', email: 'waqas@gmail.com',       status: 'active',    disease: 'Appendicitis',       bloodType: 'AB+', doctorId: 'D025' },
  { id: 'P036', name: 'Aisha Nawaz',        age: '54', gender: 'Female', phone: '0300-3333036', email: 'aisha@gmail.com',       status: 'active',    disease: 'Menopause Issues',   bloodType: 'O+',  doctorId: 'D006' },
  { id: 'P037', name: 'Nadeem Akram',       age: '46', gender: 'Male',   phone: '0300-3333037', email: 'nadeem@gmail.com',      status: 'active',    disease: 'Psoriasis',          bloodType: 'A-',  doctorId: 'D004' },
  { id: 'P038', name: 'Gulnaz Begum',       age: '70', gender: 'Female', phone: '0300-3333038', email: '',                      status: 'active',    disease: 'Dementia',           bloodType: 'B+',  doctorId: 'D002' },
  { id: 'P039', name: 'Salman Haider',      age: '18', gender: 'Male',   phone: '0300-3333039', email: 'salman@gmail.com',      status: 'active',    disease: 'Acne',               bloodType: 'O+',  doctorId: 'D004' },
  { id: 'P040', name: 'Fariha Munir',       age: '40', gender: 'Female', phone: '0300-3333040', email: 'fariha@gmail.com',      status: 'active',    disease: 'Fibromyalgia',       bloodType: 'AB+', doctorId: 'D016' },
  { id: 'P041', name: 'Bilal Muneer',       age: '56', gender: 'Male',   phone: '0300-3333041', email: 'bilal.m@gmail.com',     status: 'critical',  disease: 'Cancer - Lung',      bloodType: 'A+',  doctorId: 'D017' },
  { id: 'P042', name: 'Rukhsana Begum',     age: '62', gender: 'Female', phone: '0300-3333042', email: '',                      status: 'active',    disease: 'Glaucoma',           bloodType: 'O-',  doctorId: 'D010' },
  { id: 'P043', name: 'Tariq Aziz',         age: '49', gender: 'Male',   phone: '0300-3333043', email: 'tariq.a@gmail.com',     status: 'active',    disease: 'Fatty Liver',        bloodType: 'B+',  doctorId: 'D011' },
  { id: 'P044', name: 'Asma Javed',         age: '21', gender: 'Female', phone: '0300-3333044', email: 'asma@gmail.com',        status: 'active',    disease: 'PCOS',               bloodType: 'A+',  doctorId: 'D006' },
  { id: 'P045', name: 'Shahid Latif',       age: '63', gender: 'Male',   phone: '0300-3333045', email: 'shahid.l@gmail.com',    status: 'active',    disease: 'Gout',               bloodType: 'AB-', doctorId: 'D016' },
  { id: 'P046', name: 'Kiran Akhtar',       age: '27', gender: 'Female', phone: '0300-3333046', email: 'kiran@gmail.com',       status: 'recovered', disease: 'Flu',                bloodType: 'O+',  doctorId: 'D007' },
  { id: 'P047', name: 'Mohsin Raza',        age: '31', gender: 'Male',   phone: '0300-3333047', email: 'mohsin@gmail.com',      status: 'active',    disease: 'Peptic Ulcer',       bloodType: 'B-',  doctorId: 'D011' },
  { id: 'P048', name: 'Zara Qasim',         age: '16', gender: 'Female', phone: '0300-3333048', email: '',                      status: 'active',    disease: 'Scoliosis',          bloodType: 'A+',  doctorId: 'D005' },
  { id: 'P049', name: 'Farhan Saeed',       age: '44', gender: 'Male',   phone: '0300-3333049', email: 'farhan@gmail.com',      status: 'active',    disease: 'Hypertension',       bloodType: 'O+',  doctorId: 'D001' },
  { id: 'P050', name: 'Parveen Bibi',       age: '58', gender: 'Female', phone: '0300-3333050', email: '',                      status: 'active',    disease: 'Diabetes Type 2',    bloodType: 'B+',  doctorId: 'D012' },
  { id: 'P051', name: 'Aamir Liaqat',       age: '36', gender: 'Male',   phone: '0300-3333051', email: 'aamir@gmail.com',       status: 'active',    disease: 'Sleep Apnea',        bloodType: 'AB+', doctorId: 'D013' },
  { id: 'P052', name: 'Samina Gul',         age: '42', gender: 'Female', phone: '0300-3333052', email: 'samina@gmail.com',      status: 'active',    disease: 'Hypothyroidism',     bloodType: 'A-',  doctorId: 'D012' },
  { id: 'P053', name: 'Danish Mehmood',     age: '25', gender: 'Male',   phone: '0300-3333053', email: 'danish@gmail.com',      status: 'active',    disease: 'Allergies',          bloodType: 'O+',  doctorId: 'D020' },
  { id: 'P054', name: 'Shaista Waheed',     age: '50', gender: 'Female', phone: '0300-3333054', email: 'shaista@gmail.com',     status: 'active',    disease: 'Breast Cancer',      bloodType: 'B+',  doctorId: 'D017' },
  { id: 'P055', name: 'Qaiser Abbas',       age: '66', gender: 'Male',   phone: '0300-3333055', email: 'qaiser@gmail.com',      status: 'critical',  disease: 'Kidney Failure',     bloodType: 'O-',  doctorId: 'D015' },
  { id: 'P056', name: 'Shabana Azmi',       age: '39', gender: 'Female', phone: '0300-3333056', email: 'shabana@gmail.com',     status: 'active',    disease: 'Lupus',              bloodType: 'AB+', doctorId: 'D016' },
  { id: 'P057', name: 'Irfan Mehmood',      age: '29', gender: 'Male',   phone: '0300-3333057', email: 'irfan.m@gmail.com',     status: 'active',    disease: 'Hernia',             bloodType: 'A+',  doctorId: 'D025' },
  { id: 'P058', name: 'Uzma Tabassum',      age: '34', gender: 'Female', phone: '0300-3333058', email: 'uzma@gmail.com',        status: 'recovered', disease: 'COVID-19',           bloodType: 'B-',  doctorId: 'D007' },
  { id: 'P059', name: 'Khalid Mehmood',     age: '57', gender: 'Male',   phone: '0300-3333059', email: 'khalid@gmail.com',      status: 'active',    disease: 'Parkinson\'s',       bloodType: 'O+',  doctorId: 'D002' },
  { id: 'P060', name: 'Riffat Sultana',     age: '45', gender: 'Female', phone: '0300-3333060', email: '',                      status: 'active',    disease: 'Endometriosis',      bloodType: 'A+',  doctorId: 'D006' },
  { id: 'P061', name: 'Saleem Akhtar',      age: '52', gender: 'Male',   phone: '0300-3333061', email: 'saleem@gmail.com',      status: 'active',    disease: 'Enlarged Prostate',  bloodType: 'AB-', doctorId: 'D009' },
  { id: 'P062', name: 'Farzana Kausar',     age: '38', gender: 'Female', phone: '0300-3333062', email: 'farzana@gmail.com',     status: 'active',    disease: 'Anxiety Disorder',   bloodType: 'B+',  doctorId: 'D008' },
  { id: 'P063', name: 'Jahangir Khan',      age: '71', gender: 'Male',   phone: '0300-3333063', email: '',                      status: 'critical',  disease: 'Alzheimer\'s',       bloodType: 'O+',  doctorId: 'D002' },
  { id: 'P064', name: 'Munaza Rafiq',       age: '23', gender: 'Female', phone: '0300-3333064', email: 'munaza@gmail.com',      status: 'active',    disease: 'Irregular Periods',  bloodType: 'A-',  doctorId: 'D006' },
  { id: 'P065', name: 'Naseer Ahmed',       age: '48', gender: 'Male',   phone: '0300-3333065', email: 'naseer@gmail.com',      status: 'active',    disease: 'Gallstones',         bloodType: 'B+',  doctorId: 'D011' },
  { id: 'P066', name: 'Shagufta Bibi',      age: '55', gender: 'Female', phone: '0300-3333066', email: '',                      status: 'active',    disease: 'Macular Degeneration', bloodType: 'O+', doctorId: 'D010' },
  { id: 'P067', name: 'Zaheer Abbas',       age: '33', gender: 'Male',   phone: '0300-3333067', email: 'zaheer@gmail.com',      status: 'active',    disease: 'Eczema',             bloodType: 'AB+', doctorId: 'D004' },
  { id: 'P068', name: 'Tahira Naz',         age: '60', gender: 'Female', phone: '0300-3333068', email: 'tahira@gmail.com',      status: 'active',    disease: 'Arthritis',          bloodType: 'A+',  doctorId: 'D016' },
  { id: 'P069', name: 'Imran Khalil',       age: '22', gender: 'Male',   phone: '0300-3333069', email: 'imran.k@gmail.com',     status: 'active',    disease: 'Sports Injury',      bloodType: 'O-',  doctorId: 'D005' },
  { id: 'P070', name: 'Raheela Pervez',     age: '47', gender: 'Female', phone: '0300-3333070', email: 'raheela@gmail.com',     status: 'recovered', disease: 'Typhoid',            bloodType: 'B+',  doctorId: 'D007' },
  { id: 'P071', name: 'Babar Azam',         age: '40', gender: 'Male',   phone: '0300-3333071', email: 'babar@gmail.com',       status: 'active',    disease: 'Hypertension',       bloodType: 'A+',  doctorId: 'D001' },
  { id: 'P072', name: 'Sidra Tul Muntaha',  age: '26', gender: 'Female', phone: '0300-3333072', email: 'sidra@gmail.com',       status: 'active',    disease: 'Migraine',           bloodType: 'O+',  doctorId: 'D002' },
  { id: 'P073', name: 'Hamza Shahid',       age: '30', gender: 'Male',   phone: '0300-3333073', email: 'hamza@gmail.com',       status: 'active',    disease: 'Asthma',             bloodType: 'B-',  doctorId: 'D013' },
  { id: 'P074', name: 'Mariam Bibi',        age: '64', gender: 'Female', phone: '0300-3333074', email: '',                      status: 'active',    disease: 'Osteoporosis',       bloodType: 'AB+', doctorId: 'D005' },
  { id: 'P075', name: 'Saad Bin Amer',      age: '19', gender: 'Male',   phone: '0300-3333075', email: 'saad@gmail.com',        status: 'active',    disease: 'Tonsillitis',        bloodType: 'O+',  doctorId: 'D019' },
  { id: 'P076', name: 'Zainab Fatima',      age: '28', gender: 'Female', phone: '0300-3333076', email: 'zainab@gmail.com',      status: 'active',    disease: 'PCOS',               bloodType: 'A-',  doctorId: 'D006' },
  { id: 'P077', name: 'Umer Shareef',       age: '53', gender: 'Male',   phone: '0300-3333077', email: 'umer@gmail.com',        status: 'critical',  disease: 'Coronary Disease',   bloodType: 'B+',  doctorId: 'D001' },
  { id: 'P078', name: 'Humaira Tanveer',    age: '35', gender: 'Female', phone: '0300-3333078', email: 'humaira@gmail.com',     status: 'active',    disease: 'Anemia',             bloodType: 'O+',  doctorId: 'D004' },
  { id: 'P079', name: 'Nawaz Sharif',       age: '59', gender: 'Male',   phone: '0300-3333079', email: 'nawaz@gmail.com',       status: 'active',    disease: 'Diabetes Type 2',    bloodType: 'AB+', doctorId: 'D012' },
  { id: 'P080', name: 'Iram Shehzad',       age: '32', gender: 'Female', phone: '0300-3333080', email: 'iram@gmail.com',        status: 'recovered', disease: 'Dengue Fever',       bloodType: 'A+',  doctorId: 'D007' },
  { id: 'P081', name: 'Tahir Mehmood',      age: '44', gender: 'Male',   phone: '0300-3333081', email: 'tahir.m@gmail.com',     status: 'active',    disease: 'Hepatitis C',        bloodType: 'B+',  doctorId: 'D011' },
  { id: 'P082', name: 'Nagina Bibi',        age: '68', gender: 'Female', phone: '0300-3333082', email: '',                      status: 'active',    disease: 'Cataracts',          bloodType: 'O-',  doctorId: 'D010' },
  { id: 'P083', name: 'Adnan Farooq',       age: '37', gender: 'Male',   phone: '0300-3333083', email: 'adnan@gmail.com',       status: 'active',    disease: 'Kidney Stone',       bloodType: 'A+',  doctorId: 'D015' },
  { id: 'P084', name: 'Kanwal Aftab',       age: '21', gender: 'Female', phone: '0300-3333084', email: 'kanwal@gmail.com',      status: 'active',    disease: 'Iron Deficiency',    bloodType: 'B+',  doctorId: 'D004' },
  { id: 'P085', name: 'Ejaz Ul Haq',        age: '62', gender: 'Male',   phone: '0300-3333085', email: 'ejaz@gmail.com',        status: 'active',    disease: 'Cholesterol',        bloodType: 'AB-', doctorId: 'D001' },
  { id: 'P086', name: 'Ruqaiya Sultan',     age: '46', gender: 'Female', phone: '0300-3333086', email: 'ruqaiya@gmail.com',     status: 'active',    disease: 'Lupus',              bloodType: 'O+',  doctorId: 'D016' },
  { id: 'P087', name: 'Noman Bashir',       age: '24', gender: 'Male',   phone: '0300-3333087', email: 'noman@gmail.com',       status: 'active',    disease: 'Back Pain',          bloodType: 'A+',  doctorId: 'D005' },
  { id: 'P088', name: 'Mehreen Sohail',     age: '41', gender: 'Female', phone: '0300-3333088', email: 'mehreen@gmail.com',     status: 'active',    disease: 'Depression',         bloodType: 'B-',  doctorId: 'D008' },
  { id: 'P089', name: 'Asghar Ali',         age: '73', gender: 'Male',   phone: '0300-3333089', email: '',                      status: 'critical',  disease: 'Heart Failure',      bloodType: 'O+',  doctorId: 'D001' },
  { id: 'P090', name: 'Shahnaz Begum',      age: '56', gender: 'Female', phone: '0300-3333090', email: '',                      status: 'active',    disease: 'Hypothyroidism',     bloodType: 'A+',  doctorId: 'D012' },
  { id: 'P091', name: 'Kamran Akbar',       age: '27', gender: 'Male',   phone: '0300-3333091', email: 'kamran.a@gmail.com',    status: 'active',    disease: 'Sinusitis',          bloodType: 'AB+', doctorId: 'D019' },
  { id: 'P092', name: 'Fouzia Bibi',        age: '33', gender: 'Female', phone: '0300-3333092', email: 'fouzia@gmail.com',      status: 'recovered', disease: 'COVID-19',           bloodType: 'B+',  doctorId: 'D007' },
  { id: 'P093', name: 'Rashid Mehmood',     age: '51', gender: 'Male',   phone: '0300-3333093', email: 'rashid@gmail.com',      status: 'active',    disease: 'Gout',               bloodType: 'O-',  doctorId: 'D016' },
  { id: 'P094', name: 'Yasmin Akhtar',      age: '38', gender: 'Female', phone: '0300-3333094', email: 'yasmin@gmail.com',      status: 'active',    disease: 'Fibromyalgia',       bloodType: 'A-',  doctorId: 'D016' },
  { id: 'P095', name: 'Ghulam Mustafa',     age: '65', gender: 'Male',   phone: '0300-3333095', email: '',                      status: 'active',    disease: 'Parkinson\'s',       bloodType: 'B+',  doctorId: 'D002' },
  { id: 'P096', name: 'Ambreen Fatima',     age: '29', gender: 'Female', phone: '0300-3333096', email: 'ambreen@gmail.com',     status: 'active',    disease: 'Gastritis',          bloodType: 'O+',  doctorId: 'D011' },
  { id: 'P097', name: 'Sajid Hussain',      age: '46', gender: 'Male',   phone: '0300-3333097', email: 'sajid@gmail.com',       status: 'active',    disease: 'Epilepsy',           bloodType: 'AB+', doctorId: 'D002' },
  { id: 'P098', name: 'Rehana Khatoon',     age: '52', gender: 'Female', phone: '0300-3333098', email: 'rehana@gmail.com',      status: 'active',    disease: 'Arthritis',          bloodType: 'A+',  doctorId: 'D005' },
  { id: 'P099', name: 'Bashir Ahmad',       age: '74', gender: 'Male',   phone: '0300-3333099', email: '',                      status: 'critical',  disease: 'Kidney Failure',     bloodType: 'O+',  doctorId: 'D015' },
  { id: 'P100', name: 'Naseem Begum',       age: '43', gender: 'Female', phone: '0300-3333100', email: 'naseem@gmail.com',      status: 'active',    disease: 'PCOS',               bloodType: 'B+',  doctorId: 'D006' },
  { id: 'P101', name: 'Zafar Iqbal',        age: '39', gender: 'Male',   phone: '0300-3333101', email: 'zafar@gmail.com',       status: 'active',    disease: 'Fatty Liver',        bloodType: 'A+',  doctorId: 'D011' },
  { id: 'P102', name: 'Ghazala Bibi',       age: '31', gender: 'Female', phone: '0300-3333102', email: 'ghazala@gmail.com',     status: 'active',    disease: 'UTI',                bloodType: 'O-',  doctorId: 'D009' },
  { id: 'P103', name: 'Waseem Akram',       age: '48', gender: 'Male',   phone: '0300-3333103', email: 'waseem@gmail.com',      status: 'active',    disease: 'Hernia',             bloodType: 'B-',  doctorId: 'D025' },
  { id: 'P104', name: 'Surriya Bibi',       age: '57', gender: 'Female', phone: '0300-3333104', email: '',                      status: 'active',    disease: 'Dementia',           bloodType: 'AB+', doctorId: 'D002' },
  { id: 'P105', name: 'Nasir Jamal',        age: '26', gender: 'Male',   phone: '0300-3333105', email: 'nasir.j@gmail.com',     status: 'active',    disease: 'Acne',               bloodType: 'A+',  doctorId: 'D004' },
  { id: 'P106', name: 'Sana Tariq',         age: '22', gender: 'Female', phone: '0300-3333106', email: 'sana.t@gmail.com',      status: 'recovered', disease: 'Chicken Pox',        bloodType: 'O+',  doctorId: 'D003' },
  { id: 'P107', name: 'Liaqat Ali',         age: '61', gender: 'Male',   phone: '0300-3333107', email: 'liaqat@gmail.com',      status: 'active',    disease: 'COPD',               bloodType: 'B+',  doctorId: 'D013' },
  { id: 'P108', name: 'Sajida Perveen',     age: '49', gender: 'Female', phone: '0300-3333108', email: 'sajida@gmail.com',      status: 'active',    disease: 'Breast Cancer',      bloodType: 'A-',  doctorId: 'D017' },
  { id: 'P109', name: 'Atif Aslam',         age: '35', gender: 'Male',   phone: '0300-3333109', email: 'atif@gmail.com',        status: 'active',    disease: 'Hypertension',       bloodType: 'O+',  doctorId: 'D001' },
  { id: 'P110', name: 'Nargis Batool',      age: '44', gender: 'Female', phone: '0300-3333110', email: 'nargis@gmail.com',      status: 'active',    disease: 'Endometriosis',      bloodType: 'AB-', doctorId: 'D006' },
];

/* ── PATIENTS (for doctor dashboard - assigned to demo doctor) ────── */
export const MOCK_MY_PATIENTS = MOCK_PATIENTS_LIST.slice(0, 6).map(p => ({
  ...p, doctorId: 'DEMO_DOCTOR',
}));

/* ── APPOINTMENTS (for doctor dashboard) ─────────────────────────── */
export const MOCK_MY_APPOINTMENTS = [
  { id: 'A001', patientName: 'Ali Hassan',   doctorId: 'DEMO_DOCTOR', doctorName: 'Dr. Ahmed Khan', patientId: 'P001', date: today,     time: '09:00', type: 'General',    status: 'completed' },
  { id: 'A002', patientName: 'Nadia Akhtar', doctorId: 'DEMO_DOCTOR', doctorName: 'Dr. Ahmed Khan', patientId: 'P002', date: today,     time: '10:30', type: 'Follow-up',  status: 'in-progress' },
  { id: 'A003', patientName: 'Bilal Sheikh', doctorId: 'DEMO_DOCTOR', doctorName: 'Dr. Ahmed Khan', patientId: 'P003', date: today,     time: '11:00', type: 'Emergency',  status: 'pending' },
  { id: 'A004', patientName: 'Sana Mirza',   doctorId: 'DEMO_DOCTOR', doctorName: 'Dr. Ahmed Khan', patientId: 'P004', date: tomorrow,  time: '09:00', type: 'Specialist', status: 'pending' },
  { id: 'A005', patientName: 'Kamran Butt',  doctorId: 'DEMO_DOCTOR', doctorName: 'Dr. Ahmed Khan', patientId: 'P005', date: tomorrow,  time: '11:30', type: 'Follow-up',  status: 'pending' },
  { id: 'A006', patientName: 'Hira Nadeem',  doctorId: 'DEMO_DOCTOR', doctorName: 'Dr. Ahmed Khan', patientId: 'P006', date: yesterday, time: '14:00', type: 'General',    status: 'completed' },
];

/* ── APPOINTMENTS (for receptionist) ─────────────────────────────── */
export const MOCK_ALL_APPOINTMENTS = [
  { id: 'A001', patientName: 'Ali Hassan',    doctorName: 'Dr. Ahmed Khan',    patientId: 'P001', doctorId: 'D001', date: today,     time: '09:00', type: 'General',    status: 'completed' },
  { id: 'A002', patientName: 'Nadia Akhtar',  doctorName: 'Dr. Ahmed Khan',    patientId: 'P002', doctorId: 'D001', date: today,     time: '10:30', type: 'Follow-up',  status: 'in-progress' },
  { id: 'A003', patientName: 'Bilal Sheikh',  doctorName: 'Dr. Fatima Zahra',  patientId: 'P003', doctorId: 'D002', date: today,     time: '11:00', type: 'Emergency',  status: 'pending' },
  { id: 'A004', patientName: 'Sana Mirza',    doctorName: 'Dr. Fatima Zahra',  patientId: 'P004', doctorId: 'D002', date: today,     time: '14:00', type: 'Specialist', status: 'pending' },
  { id: 'A005', patientName: 'Kamran Butt',   doctorName: 'Dr. Ahmed Khan',    patientId: 'P005', doctorId: 'D001', date: tomorrow,  time: '09:30', type: 'General',    status: 'pending' },
  { id: 'A006', patientName: 'Hira Nadeem',   doctorName: 'Dr. Usman Malik',   patientId: 'P006', doctorId: 'D003', date: tomorrow,  time: '11:00', type: 'General',    status: 'pending' },
  { id: 'A007', patientName: 'Tariq Javed',   doctorName: 'Dr. Usman Malik',   patientId: 'P007', doctorId: 'D003', date: nextWeek,  time: '10:00', type: 'Follow-up',  status: 'pending' },
  { id: 'A008', patientName: 'Amna Siddiqui', doctorName: 'Dr. Ayesha Siddiqi',patientId: 'P008', doctorId: 'D004', date: yesterday, time: '15:00', type: 'General',    status: 'completed' },
];

/* ── APPOINTMENTS (for patient dashboard) ────────────────────────── */
export const MOCK_PATIENT_APPOINTMENTS = [
  { id: 'A001', doctorName: 'Dr. Ahmed Khan',   date: today,     time: '10:00', type: 'General',    status: 'pending' },
  { id: 'A002', doctorName: 'Dr. Fatima Zahra', date: tomorrow,  time: '11:30', type: 'Follow-up',  status: 'pending' },
  { id: 'A003', doctorName: 'Dr. Ahmed Khan',   date: yesterday, time: '09:00', type: 'General',    status: 'completed' },
  { id: 'A004', doctorName: 'Dr. Usman Malik',  date: nextWeek,  time: '14:00', type: 'Specialist', status: 'pending' },
];

/* ── PRESCRIPTIONS (for patient dashboard) ───────────────────────── */
export const MOCK_PRESCRIPTIONS = [
  {
    id: 'RX001',
    doctorName: 'Dr. Ahmed Khan',
    date: yesterday,
    medicines: [
      'Panadol 500mg - 2x daily (morning & evening)',
      'Amoxicillin 250mg - 3x daily after meals',
      'Vitamin C 1000mg - 1x daily',
    ],
    notes: 'Complete the antibiotic course. Rest and drink plenty of water.',
  },
  {
    id: 'RX002',
    doctorName: 'Dr. Fatima Zahra',
    date: new Date(Date.now() - 10 * 86400000).toISOString().split('T')[0],
    medicines: [
      'Brufen 400mg - After meals only',
      'Omeprazole 20mg - Before meals',
    ],
    notes: 'Avoid spicy food. Follow-up appointment in 2 weeks.',
  },
];

/* ── ADMIN USERS (all roles) ─────────────────────────────────────── */
export const MOCK_ADMIN_DOCTORS       = MOCK_DOCTORS;
export const MOCK_ADMIN_RECEPTIONISTS = MOCK_RECEPTIONISTS;
export const MOCK_ADMIN_PATIENTS      = MOCK_PATIENTS_LIST.map(p => ({ ...p, role: 'patient' }));
