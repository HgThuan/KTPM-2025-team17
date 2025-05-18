import React, { useState, useRef } from 'react';
import Button from '../../Components/UI/Button';
import Modal from '../../Components/UI/Modal';
import './DoctorProfile.css';

const DoctorProfile = () => {
  // State quản lý thông tin bác sĩ
  const [doctor, setDoctor] = useState({
    name: 'BS. Lê Văn C',
    specialty: 'Nội tổng quát',
    phone: '0911111111',
    email: 'levanc@example.com',
    address: 'Bệnh viện ABC, Hà Nội',
    avatar: 'doctor-avatar.png'
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const fileInputRef = useRef(null);

  // Xử lý thay đổi avatar
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setDoctor(prev => ({ ...prev, avatar: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Xử lý thay đổi thông tin
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctor(prev => ({ ...prev, [name]: value }));
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Gọi API cập nhật thông tin
    console.log('Updated doctor info:', doctor);
    setIsEditMode(false);
    setShowEditModal(false);
  };

  return (
    <section className="doctor-profile-section">
      <h2>Thông tin cá nhân bác sĩ</h2>

      {!isEditMode ? (
        // Chế độ xem thông tin
        <div className="doctor-info-view">
          <div className="avatar-container">
            <img 
              src={doctor.avatar} 
              alt="Ảnh bác sĩ" 
              className="doctor-avatar"
              onError={(e) => {
                e.target.src = 'default-avatar.png';
              }}
            />
            <div className="avatar-actions">
              <input 
                type="file" 
                ref={fileInputRef}
                accept="image/*" 
                onChange={handleAvatarChange}
                className="hidden-file-input"
              />
              <Button 
                onClick={() => fileInputRef.current.click()}
                className="change-avatar-btn"
              >
                Đổi ảnh
              </Button>
            </div>
          </div>

          <div className="doctor-details">
            <table className="styled-table">
              <tbody>
                <tr>
                  <th>Họ tên</th>
                  <td>{doctor.name}</td>
                </tr>
                <tr>
                  <th>Chuyên khoa</th>
                  <td>{doctor.specialty}</td>
                </tr>
                <tr>
                  <th>Số điện thoại</th>
                  <td>{doctor.phone}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{doctor.email}</td>
                </tr>
                <tr>
                  <th>Địa chỉ làm việc</th>
                  <td>{doctor.address}</td>
                </tr>
              </tbody>
            </table>
            <div className="action-buttons">
              <Button 
                className="edit"
                onClick={() => setShowEditModal(true)}
              >
                Sửa thông tin
              </Button>
            </div>
          </div>
        </div>
      ) : (
        // Chế độ chỉnh sửa (inline)
        <form className="doctor-edit-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Họ tên:</label>
              <input
                type="text"
                name="name"
                value={doctor.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Chuyên khoa:</label>
              <input
                type="text"
                name="specialty"
                value={doctor.specialty}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Số điện thoại:</label>
              <input
                type="text"
                name="phone"
                value={doctor.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={doctor.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group full-width">
            <label>Địa chỉ làm việc:</label>
            <input
              type="text"
              name="address"
              value={doctor.address}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-actions">
            <Button type="submit" className="edit">
              Lưu thông tin
            </Button>
            <Button 
              type="button" 
              onClick={() => setIsEditMode(false)}
            >
              Huỷ
            </Button>
          </div>
        </form>
      )}

      {/* Modal chỉnh sửa */}
      <Modal 
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Sửa thông tin bác sĩ"
        size="small"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Họ tên:</label>
            <input
              type="text"
              name="name"
              value={doctor.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Chuyên khoa:</label>
            <input
              type="text"
              name="specialty"
              value={doctor.specialty}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Số điện thoại:</label>
            <input
              type="text"
              name="phone"
              value={doctor.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={doctor.email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Địa chỉ làm việc:</label>
            <input
              type="text"
              name="address"
              value={doctor.address}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="modal-actions">
            <Button type="submit" className="edit">
              Lưu
            </Button>
            <Button 
              type="button" 
              onClick={() => setShowEditModal(false)}
            >
              Huỷ
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default DoctorProfile;