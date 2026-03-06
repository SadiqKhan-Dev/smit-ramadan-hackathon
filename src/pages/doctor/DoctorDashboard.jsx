import React, { useState } from 'react';
import { collection, addDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import {
  MOCK_DOCTOR_PATIENTS, MOCK_DOCTOR_APPOINTMENTS,
  MOCK_DOCTOR_PRESCRIPTIONS, MOCK_DOCTOR_DOCUMENTS,
} from '../../data/mockData';
import { db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Users, Calendar, FileText, Folder, Plus, Edit, Trash2,
  CheckCircle, Clock, Activity, AlertTriangle, Search, File,
} from 'lucide-react';
import { Sidebar } from '../../components/layout/Sidebar';
import { Card, CardContent, StatCard } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/Input';
import { DataTable, StatusBadge, PageHeader, EmptyState, LoadingSkeleton } from '../../components/ui/components';
import { ModalForm, ConfirmDialog } from '../../components/ui/ModalForm';

export function DoctorDashboardPage() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Data — starts from mock, all changes are optimistic
  const [patients,      setPatients]      = useState(MOCK_DOCTOR_PATIENTS);
  const [appointments,  setAppointments]  = useState(MOCK_DOCTOR_APPOINTMENTS);
  const [prescriptions, setPrescriptions] = useState(MOCK_DOCTOR_PRESCRIPTIONS);
  const [documents,     setDocuments]     = useState(MOCK_DOCTOR_DOCUMENTS);

  // Patient modals
  const [showAddPatient,  setShowAddPatient]  = useState(false);
  const [showEditPatient, setShowEditPatient] = useState(false);
  const [editingPatient,  setEditingPatient]  = useState(null);

  // Appointment modals
  const [showAddAppt,  setShowAddAppt]  = useState(false);
  const [showEditAppt, setShowEditAppt] = useState(false);
  const [editingAppt,  setEditingAppt]  = useState(null);

  // Prescription modals
  const [showAddRx,  setShowAddRx]  = useState(false);
  const [showEditRx, setShowEditRx] = useState(false);
  const [editingRx,  setEditingRx]  = useState(null);

  // Document modals
  const [showAddDoc,  setShowAddDoc]  = useState(false);
  const [showEditDoc, setShowEditDoc] = useState(false);
  const [editingDoc,  setEditingDoc]  = useState(null);

  // Delete confirm
  const [showConfirm,  setShowConfirm]  = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Extract clean name from "role::Name" displayName format
  const doctorName = currentUser?.displayName?.includes('::')
    ? currentUser.displayName.split('::')[1]
    : currentUser?.displayName || currentUser?.email;

  const handleLogout = async () => { await logout(); navigate('/'); };

  // Fire-and-forget Firestore sync
  function sync(promise) {
    promise.catch(e => console.warn('Firestore sync:', e.message));
  }

  /* ─── PATIENT HANDLERS ─────────────────────────────────────── */
  function handleAddPatient(e) {
    const f = new FormData(e.target);
    const p = {
      id: `DP${Date.now()}`, name: f.get('name'), age: f.get('age') || '',
      gender: f.get('gender') || '', phone: f.get('phone') || '',
      email: f.get('email') || '', bloodType: f.get('bloodType') || '',
      disease: f.get('disease') || '', status: f.get('status') || 'active',
      lastVisit: new Date().toISOString().split('T')[0],
    };
    setPatients(prev => [p, ...prev]);
    setShowAddPatient(false);
    sync(addDoc(collection(db, 'patients'), { ...p, doctorId: currentUser?.uid }));
  }

  function handleUpdatePatient(e) {
    if (!editingPatient) return;
    const f = new FormData(e.target);
    const updated = {
      ...editingPatient,
      name: f.get('name') || editingPatient.name,
      age: f.get('age') || editingPatient.age,
      phone: f.get('phone') || editingPatient.phone,
      email: f.get('email') || editingPatient.email,
      bloodType: f.get('bloodType') || editingPatient.bloodType,
      disease: f.get('disease') || editingPatient.disease,
      status: f.get('status') || editingPatient.status,
      gender: f.get('gender') || editingPatient.gender,
    };
    setPatients(prev => prev.map(p => p.id === editingPatient.id ? updated : p));
    setShowEditPatient(false); setEditingPatient(null);
    sync(setDoc(doc(db, 'patients', editingPatient.id), updated, { merge: true }));
  }

  /* ─── APPOINTMENT HANDLERS ─────────────────────────────────── */
  function handleAddAppt(e) {
    const f = new FormData(e.target);
    const a = {
      id: `DA${Date.now()}`, patientName: f.get('patientName'),
      date: f.get('date') || '', time: f.get('time') || '',
      type: f.get('type') || 'General', status: f.get('status') || 'scheduled',
      notes: f.get('notes') || '',
    };
    setAppointments(prev => [a, ...prev]);
    setShowAddAppt(false);
    sync(addDoc(collection(db, 'appointments'), { ...a, doctorId: currentUser?.uid }));
  }

  function handleUpdateAppt(e) {
    if (!editingAppt) return;
    const f = new FormData(e.target);
    const updated = {
      ...editingAppt,
      patientName: f.get('patientName') || editingAppt.patientName,
      date: f.get('date') || editingAppt.date,
      time: f.get('time') || editingAppt.time,
      type: f.get('type') || editingAppt.type,
      status: f.get('status') || editingAppt.status,
      notes: f.get('notes') || editingAppt.notes,
    };
    setAppointments(prev => prev.map(a => a.id === editingAppt.id ? updated : a));
    setShowEditAppt(false); setEditingAppt(null);
    sync(setDoc(doc(db, 'appointments', editingAppt.id), updated, { merge: true }));
  }

  /* ─── PRESCRIPTION HANDLERS ────────────────────────────────── */
  function handleAddRx(e) {
    const f = new FormData(e.target);
    const rx = {
      id: `RD${Date.now()}`, patientName: f.get('patientName'),
      date: new Date().toISOString().split('T')[0],
      diagnosis: f.get('diagnosis') || '',
      medicines: f.get('medicines') || '',
      notes: f.get('notes') || '',
      followUp: f.get('followUp') || '',
    };
    setPrescriptions(prev => [rx, ...prev]);
    setShowAddRx(false);
    sync(addDoc(collection(db, 'prescriptions'), { ...rx, doctorId: currentUser?.uid, doctorName }));
  }

  function handleUpdateRx(e) {
    if (!editingRx) return;
    const f = new FormData(e.target);
    const updated = {
      ...editingRx,
      patientName: f.get('patientName') || editingRx.patientName,
      diagnosis: f.get('diagnosis') || editingRx.diagnosis,
      medicines: f.get('medicines') || editingRx.medicines,
      notes: f.get('notes') || editingRx.notes,
      followUp: f.get('followUp') || editingRx.followUp,
    };
    setPrescriptions(prev => prev.map(r => r.id === editingRx.id ? updated : r));
    setShowEditRx(false); setEditingRx(null);
    sync(setDoc(doc(db, 'prescriptions', editingRx.id), updated, { merge: true }));
  }

  /* ─── DOCUMENT HANDLERS ────────────────────────────────────── */
  function handleAddDoc(e) {
    const f = new FormData(e.target);
    const d = {
      id: `DD${Date.now()}`, name: f.get('name'),
      type: f.get('type') || 'Lab Report',
      patientName: f.get('patientName') || '',
      date: new Date().toISOString().split('T')[0],
      size: '—', status: 'pending',
    };
    setDocuments(prev => [d, ...prev]);
    setShowAddDoc(false);
    sync(addDoc(collection(db, 'documents'), { ...d, doctorId: currentUser?.uid }));
  }

  function handleUpdateDoc(e) {
    if (!editingDoc) return;
    const f = new FormData(e.target);
    const updated = {
      ...editingDoc,
      name: f.get('name') || editingDoc.name,
      type: f.get('type') || editingDoc.type,
      patientName: f.get('patientName') || editingDoc.patientName,
      status: f.get('status') || editingDoc.status,
    };
    setDocuments(prev => prev.map(d => d.id === editingDoc.id ? updated : d));
    setShowEditDoc(false); setEditingDoc(null);
    sync(setDoc(doc(db, 'documents', editingDoc.id), updated, { merge: true }));
  }

  /* ─── DELETE ────────────────────────────────────────────────── */
  function handleDelete() {
    if (!deleteTarget) return;
    const { section, id } = deleteTarget;
    if (section === 'patients')      setPatients(prev      => prev.filter(x => x.id !== id));
    if (section === 'appointments')  setAppointments(prev  => prev.filter(x => x.id !== id));
    if (section === 'prescriptions') setPrescriptions(prev => prev.filter(x => x.id !== id));
    if (section === 'documents')     setDocuments(prev     => prev.filter(x => x.id !== id));
    setShowConfirm(false); setDeleteTarget(null);
    const collMap = { patients: 'patients', appointments: 'appointments', prescriptions: 'prescriptions', documents: 'documents' };
    sync(deleteDoc(doc(db, collMap[section], id)));
  }

  function confirmDelete(section, item) {
    setDeleteTarget({ section, id: item.id, name: item.name || item.patientName });
    setShowConfirm(true);
  }

  /* ─── STATS ─────────────────────────────────────────────────── */
  const today = new Date().toISOString().split('T')[0];
  const todayApts = appointments.filter(a => a.date === today);
  const stats = {
    patients:     patients.length,
    todayApts:    todayApts.length,
    completed:    todayApts.filter(a => a.status === 'completed').length,
    critical:     patients.filter(p => p.status === 'critical').length,
    prescriptions: prescriptions.length,
    documents:    documents.length,
  };

  /* ─── STATUS CONFIGS ────────────────────────────────────────── */
  const apptVariant = s => ({ scheduled: 'default', 'in-progress': 'warning', completed: 'success', cancelled: 'danger' }[s] || 'default');
  const patVariant  = s => ({ active: 'success', critical: 'danger', recovered: 'info', inactive: 'default' }[s] || 'default');
  const docVariant  = s => ({ reviewed: 'success', pending: 'warning' }[s] || 'default');

  /* ─── CONTENT RENDER ────────────────────────────────────────── */
  const renderContent = () => {
    switch (activeSection) {

      /* ── DASHBOARD ─────────────────────────────────────────── */
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="My Patients"    value={stats.patients}      change="Total"          trend="up"     icon={Users}         color="blue"   />
              <StatCard title="Today's Appts"  value={stats.todayApts}     change="Scheduled"      trend="stable" icon={Calendar}      color="purple" />
              <StatCard title="Completed"       value={stats.completed}     change="Today"          trend="up"     icon={CheckCircle}   color="green"  />
              <StatCard title="Critical"        value={stats.critical}      change="Need attention" trend="down"   icon={AlertTriangle} color="red"    />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <StatCard title="Prescriptions"  value={stats.prescriptions} change="Issued"         trend="up"     icon={FileText}      color="orange" />
              <StatCard title="Documents"       value={stats.documents}     change="On file"        trend="stable" icon={Folder}        color="blue"   />
            </div>
            {/* Quick today's schedule */}
            <Card>
              <div className="p-5 border-b border-gray-100">
                <h3 className="text-base font-semibold text-gray-900">Today's Schedule</h3>
                <p className="text-xs text-gray-500">{todayApts.length} appointments</p>
              </div>
              <CardContent className="p-0">
                {todayApts.length === 0 ? (
                  <div className="p-8 text-center text-gray-400 text-sm">No appointments today</div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {todayApts.slice(0, 8).map(a => (
                      <div key={a.id} className="flex items-center justify-between px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">
                            {a.patientName?.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{a.patientName}</p>
                            <p className="text-xs text-gray-500">{a.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-500">{a.time}</span>
                          <StatusBadge variant={apptVariant(a.status)} size="sm">{a.status}</StatusBadge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      /* ── PATIENTS ───────────────────────────────────────────── */
      case 'patients':
        return (
          <div className="space-y-6">
            <PageHeader
              title="My Patients"
              subtitle={`${patients.length} patients under your care`}
              actions={<Button icon={Plus} onClick={() => setShowAddPatient(true)}>Add Patient</Button>}
            />
            <DataTable
              columns={[
                { key: 'name', header: 'Patient', render: (v, row) => (
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">{v?.charAt(0)}</div>
                    <div><p className="font-medium text-gray-900 text-sm">{v}</p><p className="text-xs text-gray-500">{row.email || '—'}</p></div>
                  </div>
                )},
                { key: 'age',       header: 'Age',        render: v => v || '—' },
                { key: 'gender',    header: 'Gender',     render: v => v ? <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${v === 'Male' ? 'bg-blue-50 text-blue-700' : 'bg-pink-50 text-pink-700'}`}>{v}</span> : '—' },
                { key: 'bloodType', header: 'Blood',      render: v => v ? <span className="px-2 py-0.5 bg-red-50 text-red-700 rounded-full text-xs font-bold">{v}</span> : '—' },
                { key: 'disease',   header: 'Condition',  render: v => v ? <span className="px-2 py-0.5 bg-orange-50 text-orange-700 rounded-full text-xs">{v}</span> : '—' },
                { key: 'status',    header: 'Status',     render: v => <StatusBadge variant={patVariant(v)} size="sm" dot>{v}</StatusBadge> },
                { key: 'lastVisit', header: 'Last Visit', render: v => v || '—' },
              ]}
              data={patients} searchable sortable
              actions={row => (
                <div className="flex gap-1">
                  <button onClick={() => { setEditingPatient(row); setShowEditPatient(true); }} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => confirmDelete('patients', row)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              )}
            />
          </div>
        );

      /* ── APPOINTMENTS ───────────────────────────────────────── */
      case 'appointments':
        return (
          <div className="space-y-6">
            <PageHeader
              title="Appointments"
              subtitle={`${appointments.length} total appointments`}
              actions={<Button icon={Plus} onClick={() => setShowAddAppt(true)}>Add Appointment</Button>}
            />
            <DataTable
              columns={[
                { key: 'patientName', header: 'Patient', render: (v, row) => (
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold text-sm">{v?.charAt(0)}</div>
                    <div><p className="font-medium text-gray-900 text-sm">{v}</p><p className="text-xs text-gray-500">{row.type}</p></div>
                  </div>
                )},
                { key: 'date',   header: 'Date',   render: v => v || '—' },
                { key: 'time',   header: 'Time',   render: v => v || '—' },
                { key: 'status', header: 'Status', render: v => <StatusBadge variant={apptVariant(v)} size="sm" dot>{v}</StatusBadge> },
                { key: 'notes',  header: 'Notes',  render: v => <span className="text-xs text-gray-500 truncate max-w-[180px] block">{v || '—'}</span> },
              ]}
              data={appointments} searchable sortable
              actions={row => (
                <div className="flex gap-1">
                  <button onClick={() => { setEditingAppt(row); setShowEditAppt(true); }} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => confirmDelete('appointments', { ...row, name: row.patientName })} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              )}
            />
          </div>
        );

      /* ── PRESCRIPTIONS ──────────────────────────────────────── */
      case 'prescriptions':
        return (
          <div className="space-y-6">
            <PageHeader
              title="Prescriptions"
              subtitle={`${prescriptions.length} prescriptions issued`}
              actions={<Button icon={Plus} onClick={() => setShowAddRx(true)}>New Prescription</Button>}
            />
            <DataTable
              columns={[
                { key: 'patientName', header: 'Patient',   render: (v, row) => (
                  <div><p className="font-medium text-gray-900 text-sm">{v}</p><p className="text-xs text-gray-500">{row.date}</p></div>
                )},
                { key: 'diagnosis',   header: 'Diagnosis', render: v => <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs">{v || '—'}</span> },
                { key: 'medicines',   header: 'Medicines', render: v => (
                  <div className="max-w-[220px]">
                    {(v || '').split('\n').slice(0, 2).map((m, i) => (
                      <p key={i} className="text-xs text-gray-600 truncate">{m}</p>
                    ))}
                    {(v || '').split('\n').length > 2 && <p className="text-xs text-gray-400">+{(v || '').split('\n').length - 2} more</p>}
                  </div>
                )},
                { key: 'followUp',    header: 'Follow-up', render: v => v || '—' },
                { key: 'notes',       header: 'Notes',     render: v => <span className="text-xs text-gray-500 truncate max-w-[150px] block">{v || '—'}</span> },
              ]}
              data={prescriptions} searchable sortable
              actions={row => (
                <div className="flex gap-1">
                  <button onClick={() => { setEditingRx(row); setShowEditRx(true); }} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => confirmDelete('prescriptions', { ...row, name: row.patientName })} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              )}
            />
          </div>
        );

      /* ── DOCUMENTS ──────────────────────────────────────────── */
      case 'documents':
        return (
          <div className="space-y-6">
            <PageHeader
              title="Documents"
              subtitle={`${documents.length} documents on file`}
              actions={<Button icon={Plus} onClick={() => setShowAddDoc(true)}>Add Document</Button>}
            />
            <DataTable
              columns={[
                { key: 'name', header: 'Document', render: (v, row) => (
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center"><File className="w-4 h-4 text-gray-500" /></div>
                    <div><p className="font-medium text-gray-900 text-sm">{v}</p><p className="text-xs text-gray-500">{row.size}</p></div>
                  </div>
                )},
                { key: 'type',        header: 'Type',    render: v => <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium">{v}</span> },
                { key: 'patientName', header: 'Patient', render: v => v || '—' },
                { key: 'date',        header: 'Date',    render: v => v || '—' },
                { key: 'status',      header: 'Status',  render: v => <StatusBadge variant={docVariant(v)} size="sm" dot>{v}</StatusBadge> },
              ]}
              data={documents} searchable sortable
              actions={row => (
                <div className="flex gap-1">
                  <button onClick={() => { setEditingDoc(row); setShowEditDoc(true); }} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => confirmDelete('documents', row)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              )}
            />
          </div>
        );

      /* ── SETTINGS ───────────────────────────────────────────── */
      case 'settings':
        return (
          <div className="space-y-6 max-w-2xl">
            <PageHeader title="Settings" subtitle="Manage your account preferences" />
            <Card><CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-gray-900">Profile Info</h3>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Full Name" defaultValue={doctorName} disabled />
                <Input label="Email" defaultValue={currentUser?.email} disabled />
              </div>
              <Input label="Role" defaultValue="Doctor" disabled />
            </CardContent></Card>
          </div>
        );

      default:
        return null;
    }
  };

  /* ─── OPTION ARRAYS ─────────────────────────────────────────── */
  const bloodTypeOpts  = ['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(v => ({ value: v, label: v }));
  const patStatusOpts  = ['active','critical','recovered','inactive'].map(v => ({ value: v, label: v.charAt(0).toUpperCase()+v.slice(1) }));
  const genderOpts     = [{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }];
  const apptTypeOpts   = ['General','Follow-up','Emergency','Consultation','Specialist'].map(v => ({ value: v, label: v }));
  const apptStatusOpts = ['scheduled','in-progress','completed','cancelled'].map(v => ({ value: v, label: v.charAt(0).toUpperCase()+v.slice(1) }));
  const docTypeOpts    = ['Lab Report','X-Ray','MRI','Blood Test','ECG','Ultrasound','Biopsy Report','Eye Test','Bone Density Scan','Discharge Summary','Evaluation','Endoscopy Report'].map(v => ({ value: v, label: v }));
  const docStatusOpts  = [{ value: 'pending', label: 'Pending' }, { value: 'reviewed', label: 'Reviewed' }];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        currentPage={activeSection}
        onNavigate={setActiveSection}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        userRole="doctor"
        onLogout={handleLogout}
      />

      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="text-xl font-bold text-gray-900 capitalize">{activeSection}</h1>
            <p className="text-xs text-gray-500">{doctorName} • Doctor</p>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
        </header>

        <main className="p-6">{renderContent()}</main>
      </div>

      {/* ── ADD PATIENT ────────────────────────────────────────── */}
      <ModalForm isOpen={showAddPatient} onClose={() => setShowAddPatient(false)} title="Add Patient" submitLabel="Add Patient" isLoading={false} onSubmit={handleAddPatient}>
        <div className="space-y-4">
          <Input name="name" label="Full Name" placeholder="Muhammad Ali" required />
          <div className="grid grid-cols-2 gap-4">
            <Input name="age"   label="Age"   placeholder="35" />
            <Select name="gender" label="Gender" placeholder="Select" options={genderOpts} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input name="phone" label="Phone" placeholder="0300-0000000" />
            <Input name="email" type="email" label="Email" placeholder="patient@gmail.com" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select name="bloodType" label="Blood Type" placeholder="Select" options={bloodTypeOpts} />
            <Select name="status"    label="Status"     placeholder="Select" options={patStatusOpts} />
          </div>
          <Input name="disease" label="Disease / Condition" placeholder="e.g. Hypertension" />
        </div>
      </ModalForm>

      {/* ── EDIT PATIENT ───────────────────────────────────────── */}
      <ModalForm key={editingPatient?.id || 'ep'} isOpen={showEditPatient} onClose={() => { setShowEditPatient(false); setEditingPatient(null); }} title="Edit Patient" submitLabel="Save Changes" isLoading={false} onSubmit={handleUpdatePatient}>
        <div className="space-y-4">
          <Input name="name" label="Full Name" defaultValue={editingPatient?.name || ''} required />
          <div className="grid grid-cols-2 gap-4">
            <Input name="age"   label="Age"   defaultValue={editingPatient?.age || ''} />
            <Select name="gender" label="Gender" placeholder="Select" defaultValue={editingPatient?.gender || ''} options={genderOpts} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input name="phone" label="Phone" defaultValue={editingPatient?.phone || ''} />
            <Input name="email" type="email" label="Email" defaultValue={editingPatient?.email || ''} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select name="bloodType" label="Blood Type" placeholder="Select" defaultValue={editingPatient?.bloodType || ''} options={bloodTypeOpts} />
            <Select name="status"    label="Status"     placeholder="Select" defaultValue={editingPatient?.status || 'active'} options={patStatusOpts} />
          </div>
          <Input name="disease" label="Disease / Condition" defaultValue={editingPatient?.disease || ''} />
        </div>
      </ModalForm>

      {/* ── ADD APPOINTMENT ────────────────────────────────────── */}
      <ModalForm isOpen={showAddAppt} onClose={() => setShowAddAppt(false)} title="Add Appointment" submitLabel="Add Appointment" isLoading={false} onSubmit={handleAddAppt}>
        <div className="space-y-4">
          <Input name="patientName" label="Patient Name" placeholder="Muhammad Ali" required />
          <div className="grid grid-cols-2 gap-4">
            <Input name="date" type="date" label="Date" required />
            <Input name="time" label="Time"  placeholder="09:00 AM" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select name="type"   label="Type"   placeholder="Select" options={apptTypeOpts}   />
            <Select name="status" label="Status" placeholder="Select" options={apptStatusOpts} />
          </div>
          <Input name="notes" label="Notes" placeholder="Reason / notes for appointment" />
        </div>
      </ModalForm>

      {/* ── EDIT APPOINTMENT ───────────────────────────────────── */}
      <ModalForm key={editingAppt?.id || 'ea'} isOpen={showEditAppt} onClose={() => { setShowEditAppt(false); setEditingAppt(null); }} title="Edit Appointment" submitLabel="Save Changes" isLoading={false} onSubmit={handleUpdateAppt}>
        <div className="space-y-4">
          <Input name="patientName" label="Patient Name" defaultValue={editingAppt?.patientName || ''} required />
          <div className="grid grid-cols-2 gap-4">
            <Input name="date" type="date" label="Date" defaultValue={editingAppt?.date || ''} />
            <Input name="time" label="Time" defaultValue={editingAppt?.time || ''} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select name="type"   label="Type"   placeholder="Select" defaultValue={editingAppt?.type || ''}   options={apptTypeOpts}   />
            <Select name="status" label="Status" placeholder="Select" defaultValue={editingAppt?.status || ''} options={apptStatusOpts} />
          </div>
          <Input name="notes" label="Notes" defaultValue={editingAppt?.notes || ''} />
        </div>
      </ModalForm>

      {/* ── ADD PRESCRIPTION ───────────────────────────────────── */}
      <ModalForm isOpen={showAddRx} onClose={() => setShowAddRx(false)} title="New Prescription" submitLabel="Save Prescription" isLoading={false} onSubmit={handleAddRx}>
        <div className="space-y-4">
          <Input name="patientName" label="Patient Name" placeholder="Muhammad Ali" required />
          <Input name="diagnosis"   label="Diagnosis"    placeholder="e.g. Hypertension" required />
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Medicines (one per line)</label>
            <textarea name="medicines" rows={4} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Amlodipine 5mg - Once daily&#10;Aspirin 75mg - Once daily" />
          </div>
          <Input name="followUp" type="date" label="Follow-up Date" />
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Notes</label>
            <textarea name="notes" rows={2} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Diet, precautions, instructions..." />
          </div>
        </div>
      </ModalForm>

      {/* ── EDIT PRESCRIPTION ──────────────────────────────────── */}
      <ModalForm key={editingRx?.id || 'er'} isOpen={showEditRx} onClose={() => { setShowEditRx(false); setEditingRx(null); }} title="Edit Prescription" submitLabel="Save Changes" isLoading={false} onSubmit={handleUpdateRx}>
        <div className="space-y-4">
          <Input name="patientName" label="Patient Name" defaultValue={editingRx?.patientName || ''} required />
          <Input name="diagnosis"   label="Diagnosis"    defaultValue={editingRx?.diagnosis   || ''} required />
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Medicines (one per line)</label>
            <textarea name="medicines" rows={4} defaultValue={editingRx?.medicines || ''} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>
          <Input name="followUp" type="date" label="Follow-up Date" defaultValue={editingRx?.followUp || ''} />
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Notes</label>
            <textarea name="notes" rows={2} defaultValue={editingRx?.notes || ''} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>
        </div>
      </ModalForm>

      {/* ── ADD DOCUMENT ───────────────────────────────────────── */}
      <ModalForm isOpen={showAddDoc} onClose={() => setShowAddDoc(false)} title="Add Document" submitLabel="Add Document" isLoading={false} onSubmit={handleAddDoc}>
        <div className="space-y-4">
          <Input name="name" label="Document Name" placeholder="e.g. Muhammad Ali - ECG Report" required />
          <Select name="type" label="Document Type" placeholder="Select type" options={docTypeOpts} />
          <Input name="patientName" label="Patient Name" placeholder="Muhammad Ali" />
        </div>
      </ModalForm>

      {/* ── EDIT DOCUMENT ──────────────────────────────────────── */}
      <ModalForm key={editingDoc?.id || 'ed'} isOpen={showEditDoc} onClose={() => { setShowEditDoc(false); setEditingDoc(null); }} title="Edit Document" submitLabel="Save Changes" isLoading={false} onSubmit={handleUpdateDoc}>
        <div className="space-y-4">
          <Input name="name" label="Document Name" defaultValue={editingDoc?.name || ''} required />
          <Select name="type"   label="Type"        placeholder="Select" defaultValue={editingDoc?.type   || ''} options={docTypeOpts}   />
          <Input name="patientName" label="Patient Name" defaultValue={editingDoc?.patientName || ''} />
          <Select name="status" label="Status"      placeholder="Select" defaultValue={editingDoc?.status || ''} options={docStatusOpts} />
        </div>
      </ModalForm>

      {/* ── DELETE CONFIRM ─────────────────────────────────────── */}
      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => { setShowConfirm(false); setDeleteTarget(null); }}
        onConfirm={handleDelete}
        title="Delete?"
        message={`"${deleteTarget?.name}" ko permanently delete karna chahte hain?`}
        confirmLabel="Haan, Delete Karo"
        cancelLabel="Cancel"
        variant="danger"
      />
    </div>
  );
}

export default DoctorDashboardPage;
