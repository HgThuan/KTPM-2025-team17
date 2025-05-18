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
  useEffect(() => {
    // TODO: Fetch data từ API
    const mockPatients = [
      { id: 'BN001', name: 'Nguyễn Văn A', dob: '1990-01-01', gender: 'Nam', phone: '0987654321', email: 'a@example.com' }
    ];
    setPatients(mockPatients);
  }, []);

  // Xử lý thêm bệnh nhân
  const handleAddPatient = (newPatient) => {
    setPatients([...patients, newPatient]);
    setShowAddModal(false);
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