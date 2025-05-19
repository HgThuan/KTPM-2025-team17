import React, { useState, useEffect } from 'react';
import PatientForm from './components/PatientForm';
import PatientTable from './components/PatientTable';
import MedicalRecordModal from './components/MedicalRecordModal';
import SendRecordModal from './components/SendRecordModal';
import Button from '../../Components/UI/Button';
import './Patients.css';

const Patients = () => {
  // State quản lý
  const [patients, setPatients] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showMedicalRecord, setShowMedicalRecord] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [deletedPatients, setDeletedPatients] = useState([]);
  const [showRestoreModal, setShowRestoreModal] = useState(false);

  // Load dữ liệu ban đầu
// Lấy danh sách bệnh nhân khi load trang (sửa lại useEffect)
useEffect(() => {
  async function fetchPatients() {
    try {
      const res = await fetch('http://localhost:5000/api/v1/patients');
      const data = await res.json();
      setPatients(data);
    } catch (error) {
      alert('Lỗi khi tải danh sách bệnh nhân');
      console.error(error);
    }
  }
  fetchPatients();
}, []);
// Cập nhật bệnh nhân - gọi API PUT
const handleUpdatePatient = async (updatedPatient) => {
  try {
    const res = await fetch(`http://localhost:5000/api/v1/patients/${updatedPatient.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPatient),
    });
    const data = await res.json();
    setPatients(patients.map(p => (p.id === data.id ? data : p)));
    setShowAddModal(false);
  } catch (error) {
    alert('Lỗi khi cập nhật bệnh nhân');
    console.error(error);
  }
};

// Thêm bệnh nhân - gọi API POST
const handleAddPatient = async (newPatient) => {
  try {
    const res = await fetch('http://localhost:5000/api/v1/patients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPatient),
    });
    const data = await res.json();
    setPatients([...patients, data]);
    setShowAddModal(false);
  } catch (error) {
    alert('Lỗi khi thêm bệnh nhân');
    console.error(error);
  }
};

  // Xử lý khôi phục bệnh nhân
  const handleRestorePatient = (patient) => {
    setPatients([...patients, patient]);
    setDeletedPatients(deletedPatients.filter(p => p.id !== patient.id));
  };

  return (
    <section className="patients-section">
      <h2>Quản lý bệnh nhân</h2>
      
      <div className="patients-actions">
        <Button 
          className="edit" 
          onClick={() => setShowAddModal(true)}
        >
          Thêm bệnh nhân
        </Button>
        <Button 
          style={{ background: '#ffc107', color: '#333', fontWeight: 'bold' }}
          onClick={() => setShowRestoreModal(true)}
        >
          Khôi phục
        </Button>
      </div>

      {/* Modal thêm bệnh nhân */}
      {showAddModal && (
        <PatientForm 
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddPatient}
          patient={null} // Null để xác định là thêm mới
        />
      )}

      {/* Bảng hiển thị */}
      <PatientTable 
        patients={patients}
        onViewRecord={(patient) => {
          setSelectedPatient(patient);
          setShowMedicalRecord(true);
        }}
      />

      {/* Modal hồ sơ bệnh án */}
      {showMedicalRecord && selectedPatient && (
        <MedicalRecordModal
          patient={selectedPatient}
          onClose={() => setShowMedicalRecord(false)}
          onSend={() => {
            setShowMedicalRecord(false);
            setShowSendModal(true);
          }}
        />
      )}

      {/* Modal gửi kết quả */}
      {showSendModal && selectedPatient && (
        <SendRecordModal
          patient={selectedPatient}
          onClose={() => setShowSendModal(false)}
          onSubmit={(data) => {
            // Xử lý gửi email
            console.log('Gửi kết quả:', data);
            setShowSendModal(false);
          }}
        />
      )}
    </section>
  );
};

export default Patients;