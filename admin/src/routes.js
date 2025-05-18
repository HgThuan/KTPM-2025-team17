import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import Appointments from './pages/Appointments/Appointments';
import Prescriptions from './pages/Prescriptions/Prescriptions';
import Patients from './Pages/Patients/Patients';
import Doctors from './pages/Doctors/Doctors';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="prescriptions" element={<Prescriptions />}/>
          <Route path="doctors" element={<Doctors />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;