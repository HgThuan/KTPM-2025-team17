import React, { useState } from 'react';
import Button from '../../../Components/UI/Button';
import './PrescriptionForm.css';

const PrescriptionForm = () => {
  const [formData, setFormData] = useState({
    patientId: '',
    diagnosis: '',
    medicines: [{ name: '', quantity: '' }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMedicineChange = (index, e) => {
      const { name, value } = e.target;
      const newMedicines = [...formData.medicines];
      newMedicines[index][name] = value; // giữ nguyên chuỗi
      setFormData(prev => ({ ...prev, medicines: newMedicines }));
  };

  const addMedicine = () => {
    setFormData(prev => ({
      ...prev,
      medicines: [...prev.medicines, { name: '', quantity: 1 }]
    }));
  };

  const removeMedicine = (index) => {
    if (formData.medicines.length <= 1) return;
    setFormData(prev => ({
      ...prev,
      medicines: prev.medicines.filter((_, i) => i !== index)
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch('http://localhost:5000/api/prescriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    console.log('Prescription saved:', result);
    alert('Prescription saved successfully!');
    
    // Reset form after successful submission
    setFormData({
      patientId: '',
      diagnosis: '',
      medicines: [{ name: '', quantity: 1 }]
    });
    
  } catch (error) {
    console.error('Error saving prescription:', error);
    alert('Failed to save prescription. Please try again.');
  }
};

  return (
    <section className="prescription-section">
      <h2>Tạo đơn thuốc / phiếu khám</h2>
      
      <form onSubmit={handleSubmit} className="prescription-form">
        <div className="form-group">
          <label>Mã bệnh nhân:</label>
          <input
            type="text"
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            placeholder="BN001"
            required
          />
        </div>

        <div className="form-group">
          <label>Chẩn đoán:</label>
          <textarea
            name="diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
            rows="3"
            required
          />
        </div>

        <div className="form-group">
          <label>Đơn thuốc:</label>
          <div className="medicines-list">
            {formData.medicines.map((medicine, index) => (
              <div key={index} className="medicine-row">
                <input
                  type="text"
                  name="name"
                  value={medicine.name}
                  onChange={(e) => handleMedicineChange(index, e)}
                  placeholder="Tên thuốc..."
                  required
                />
                <input
                    type="text"
                    name="quantity"
                    value={medicine.quantity}
                    onChange={(e) => handleMedicineChange(index, e)}
                    placeholder="Cách dùng + liều lượng"
                    required
                    className="quantity-input"
                />
                <Button
                  type="button"
                  className="delete"
                  onClick={() => removeMedicine(index)}
                  disabled={formData.medicines.length <= 1}
                >
                  Xoá
                </Button>
              </div>
            ))}
          </div>
          <Button
            type="button"
            className="add-medicine-btn"
            onClick={addMedicine}
          >
            + Thêm thuốc
          </Button>
        </div>

        <div className="form-actions">
          <Button type="submit" className="edit">
            Gửi chuẩn đoán
          </Button>
        </div>
      </form>
    </section>
  );
};

export default PrescriptionForm;