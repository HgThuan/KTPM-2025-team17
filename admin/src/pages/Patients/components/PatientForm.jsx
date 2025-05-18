import React, { useState, useEffect } from 'react';
import Button from '../../../Components/UI/Button';
import './PatientForm.css';

const PatientForm = ({ patient, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    dob: '',
    gender: 'Nam',
    phone: '',
    email: ''
  });

  // Nếu là chỉnh sửa, load dữ liệu bệnh nhân
  useEffect(() => {
    if (patient) {
      setFormData(patient);
    }
  }, [patient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content small">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h3>{patient ? 'Sửa thông tin bệnh nhân' : 'Thêm bệnh nhân'}</h3>
        
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="index" value={formData.index} />
          
          <div className="form-group">
            <label>Mã BN:</label>
            <input 
              type="text" 
              name="id" 
              value={formData.id} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          {/* Các trường khác tương tự */}
          
          <div className="form-actions">
            <Button type="submit" className="edit">Lưu</Button>
            <Button type="button" onClick={onClose}>Huỷ</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientForm;