import React, { useState } from 'react';
import Button from '../../../Components/UI/Button';

const SendRecordModal = ({ patient, onClose, onSubmit }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    onSubmit({ email: patient.email, message });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h3>Gửi kết quả khám cho: {patient.name}</h3>
        <textarea 
          rows="5" 
          placeholder="Nhập nội dung gửi..." 
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="form-actions">
          <Button onClick={handleSubmit}>Gửi</Button>
          <Button onClick={onClose}>Huỷ</Button>
        </div>
      </div>
    </div>
  );
};

export default SendRecordModal;
