import React from 'react';
import Button from '../../../Components/UI/Button';
import './MedicalRecordModal.css';

const MedicalRecordModal = ({ patient, onClose, onSend }) => {
  // Đảm bảo records là mảng, tránh lỗi undefined
  const records = Array.isArray(patient?.records) ? patient.records : [];

  return (
    <div className="modal-overlay">
      <div className="modal-content small">
        <div className="modal-header">
          <h3>Hồ sơ bệnh án của {patient?.fullName || patient?.name}</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body">
          <table className="styled-table">
            <tbody>
              <tr>
                <th>Mã BN</th>
                <td>{patient?.id || patient?.idNumber}</td>
              </tr>
              <tr>
                <th>Họ tên</th>
                <td>{patient?.fullName || patient?.name}</td>
              </tr>
              <tr>
                <th>Ngày sinh</th>
                <td>{patient?.dob}</td>
              </tr>
              <tr>
                <th>Giới tính</th>
                <td>{patient?.gender}</td>
              </tr>
              <tr>
                <th>Số điện thoại</th>
                <td>{patient?.phone}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{patient?.email}</td>
              </tr>
              <tr>
                <th>CCCD/CMND</th>
                <td>{patient?.idNumber || patient?.cccd}</td>
              </tr>
              <tr>
                <th>Địa chỉ</th>
                <td>{patient?.address}</td>
              </tr>
              <tr>
                <th>Mã BHYT</th>
                <td>{patient?.bhytCode || patient?.bhyt}</td>
              </tr>
              <tr>
                <th>Tiền sử bệnh án</th>
                <td>{patient?.underlyingDiseases || patient?.medicalHistory}</td>
              </tr>
              <tr>
                <th>Triệu chứng hiện tại</th>
                <td>{patient?.symptoms?.join(', ') || patient?.symptoms}</td>
              </tr>
            </tbody>
          </table>

          <h4>Lịch sử khám bệnh</h4>
          {records.length > 0 ? (
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Ngày khám</th>
                  <th>Chẩn đoán</th>
                  <th>Đơn thuốc</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr key={index}>
                    <td>{record.date}</td>
                    <td>{record.diagnosis}</td>
                    <td>{record.prescription}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Chưa có lịch sử khám bệnh.</p>
          )}
        </div>

        <div className="modal-actions">
          <Button onClick={onSend}>Gửi kết quả</Button>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordModal;
