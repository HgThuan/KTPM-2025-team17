import React from 'react';
import Button from '../../../Components/UI/Button';

const MedicalRecordModal = ({ patient, onClose, onSend }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h3>Hồ sơ bệnh án</h3>
        <p><strong>Mã BN:</strong> {patient.id}</p>
        <p><strong>Họ tên:</strong> {patient.name}</p>
        <p><strong>Ngày sinh:</strong> {patient.dob}</p>
        <p><strong>Giới tính:</strong> {patient.gender}</p>
        <p><strong>Số điện thoại:</strong> {patient.phone}</p>
        <p><strong>Email:</strong> {patient.email}</p>
        
        <div className="form-actions">
          <Button onClick={onSend}>Gửi kết quả</Button>
          <Button onClick={onClose}>Đóng</Button>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordModal;
