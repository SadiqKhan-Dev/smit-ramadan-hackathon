import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, FileText, Clock, Activity, Pill, History
} from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { DataTable, StatusBadge, EmptyState } from '../../components/ui/components';

/**
 * Patient Dashboard Component
 */
export function PatientDashboard() {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [medicalHistory, setMedicalHistory] = useState([]);

  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const patientId = currentUser?.uid;

  useEffect(() => {
    if (patientId) {
      fetchPatientData();
    }
  }, [patientId]);

  async function fetchPatientData() {
    try {
      setLoading(true);
      
      const appointmentsRef = collection(db, 'appointments');
      const prescriptionsRef = collection(db, 'prescriptions');

      const appointmentsQuery = query(appointmentsRef, where('patientId', '==', patientId));
      const prescriptionsQuery = query(prescriptionsRef, where('patientId', '==', patientId));

      const [appointmentsSnap, prescriptionsSnap] = await Promise.all([
        getDocs(appointmentsQuery),
        getDocs(prescriptionsQuery),
      ]);

      const appointmentsData = appointmentsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const prescriptionsData = prescriptionsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setAppointments(appointmentsData);
      setPrescriptions(prescriptionsData);
      setMedicalHistory(appointmentsData.filter(a => a.status === 'completed'));
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const statusConfig = {
    pending: { variant: 'default', label: 'Scheduled' },
    confirmed: { variant: 'primary', label: 'Confirmed' },
    completed: { variant: 'success', label: 'Completed' },
    cancelled: { variant: 'danger', label: 'Cancelled' },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Patient Portal</h1>
              <p className="text-xs text-gray-500">{currentUser?.displayName}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Welcome Card */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back, {currentUser?.displayName?.split(' ')[0]}!
            </h2>
            <p className="text-gray-600">
              Manage your appointments, view prescriptions, and access your medical history.
            </p>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Appointments</p>
                  <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Pill className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Prescriptions</p>
                  <p className="text-2xl font-bold text-gray-900">{prescriptions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <History className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Visits</p>
                  <p className="text-2xl font-bold text-gray-900">{medicalHistory.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Appointments */}
        <Card>
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">My Appointments</h3>
            </div>
          </div>
          <CardContent className="p-0">
            {appointments.length === 0 ? (
              <EmptyState
                icon={Calendar}
                title="No appointments"
                description="You don't have any scheduled appointments"
              />
            ) : (
              <DataTable
                columns={[
                  { key: 'date', header: 'Date', render: (v) => v || 'TBD' },
                  { key: 'time', header: 'Time', render: (v) => v || 'TBD' },
                  { key: 'doctorName', header: 'Doctor', render: (v) => v || 'TBD' },
                  { key: 'type', header: 'Type', render: (v) => v || 'General' },
                  { key: 'status', header: 'Status', render: (v) => <StatusBadge variant={statusConfig[v]?.variant || 'default'} size="sm">{v || 'pending'}</StatusBadge> },
                ]}
                data={appointments}
                searchable={false}
                sortable
              />
            )}
          </CardContent>
        </Card>

        {/* Prescriptions */}
        <Card>
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">My Prescriptions</h3>
            </div>
          </div>
          <CardContent className="p-0">
            {prescriptions.length === 0 ? (
              <EmptyState
                icon={FileText}
                title="No prescriptions"
                description="Your prescriptions will appear here"
              />
            ) : (
              <div className="divide-y divide-gray-100">
                {prescriptions.map((rx) => (
                  <div key={rx.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Prescribed by {rx.doctorName || 'Doctor'}</p>
                        <p className="text-sm text-gray-500">{rx.date || 'Date not available'}</p>
                      </div>
                      <Button variant="ghost" size="sm">View Details</Button>
                    </div>
                    {rx.medicines && rx.medicines.length > 0 && (
                      <div className="mt-3 space-y-1">
                        {rx.medicines.slice(0, 3).map((med, i) => (
                          <p key={i} className="text-sm text-gray-600">• {med}</p>
                        ))}
                        {rx.medicines.length > 3 && (
                          <p className="text-sm text-gray-500">+{rx.medicines.length - 3} more medicines</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Medical History Timeline */}
        <Card>
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Medical History</h3>
            </div>
          </div>
          <CardContent className="p-6">
            {medicalHistory.length === 0 ? (
              <EmptyState
                icon={Activity}
                title="No history yet"
                description="Your visit history will appear here"
              />
            ) : (
              <div className="space-y-4">
                {medicalHistory.slice(0, 5).map((visit, index) => (
                  <div key={visit.id} className="flex gap-4">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      {index < medicalHistory.length - 1 && (
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-px h-8 bg-gray-200" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-sm text-gray-900">
                        Visit to <span className="font-medium">{visit.doctorName || 'Doctor'}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{visit.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function CheckCircle(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  );
}

export default PatientDashboard;
