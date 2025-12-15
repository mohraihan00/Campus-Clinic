import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import PatientDashboard from '@/components/dashboards/PatientDashboard';
import DoctorDashboard from '@/components/dashboards/DoctorDashboard';
import StaffDashboard from '@/components/dashboards/StaffDashboard';
import AdminDashboard from '@/components/dashboards/AdminDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  switch (user.role) {
    case 'patient':
      return <PatientDashboard />;
    case 'doctor':
      return <DoctorDashboard />;
    case 'staff':
      return <StaffDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <Navigate to="/" replace />;
  }
};

export default Dashboard;
