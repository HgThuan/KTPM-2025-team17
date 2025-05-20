import React, { useState } from 'react';
import './AppointmentForm.css'
const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/v1/appointments/datlich', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        setMessage(data.message || 'Đặt lịch thành công!');
        setFormData({ name: '', phone: '', date: '', time: '' });
      } else {
        const errorData = await res.json();
        setMessage(errorData.message || 'Đặt lịch thất bại!');
      }
    } catch (error) {
      setMessage('Lỗi kết nối server!');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Đặt lịch khám</h2>

      <label>Họ tên:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label>Số điện thoại:</label>
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      <label>Ngày khám:</label>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />

      <label>Khung giờ:</label>
      <select
        name="time"
        value={formData.time}
        onChange={handleChange}
        required
      >
        <option value="">-- Chọn khung giờ --</option>
        <option value="08:00 - 09:00">08:00 - 09:00</option>
        <option value="09:00 - 10:00">09:00 - 10:00</option>
        <option value="14:00 - 15:00">14:00 - 15:00</option>
        <option value="15:00 - 16:00">15:00 - 16:00</option>
      </select>

      <button type="submit" disabled={loading} style={{ marginTop: 10 }}>
        {loading ? 'Đang gửi...' : 'Đặt lịch'}
      </button>

      {message && (
        <p style={{ marginTop: 10, color: message.includes('thành công') ? 'green' : 'red' }}>
          {message}
        </p>
      )}
    </form>
  );
};

export default AppointmentForm;
