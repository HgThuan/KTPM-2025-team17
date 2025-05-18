import React from 'react';
import './Prescriptions.css';
import PrescriptionForm from './components/PrescriptionForm';

const Prescriptions = () => {
  return (
    <div className="prescriptions-page">
      <PrescriptionForm />
    </div>
  );
};

export default Prescriptions;