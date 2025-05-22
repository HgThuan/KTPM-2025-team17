import React from 'react';
import Button from '../../../Components/UI/Button';

const PatientTable = ({ patients, onViewRecord }) => {
  return (
    <div className="table-wrapper">
      <table className="styled-table">
        <thead>
          <tr>
            <th>Mã BN</th>
            <th>Họ tên</th>
            <th>Ngày sinh</th>
            <th>Giới tính</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>CCCD/CMND</th> {/* Thêm cột CCCD/CMND */}
            <th>Địa chỉ</th> {/* Thêm cột Địa chỉ */}
            <th>Mã BHYT</th> {/* Thêm cột Mã BHYT */}
            <th>Tiền sử bệnh án</th> {/* Thêm cột Tiền sử bệnh án */}
            <th>Triệu chứng hiện tại</th> {/* Thêm cột Triệu chứng hiện tại */}
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={index}>
              <td>{patient.userId}</td>
              <td>{patient.name}</td>
              <td>{patient.dob}</td>
              <td>{patient.gender}</td>
              <td>{patient.phone}</td>
              <td>{patient.email}</td>
              <td>{patient.cccd}</td> {/* Hiển thị CCCD/CMND */}
              <td>{patient.address}</td> {/* Hiển thị Địa chỉ */}
              <td>{patient.bhyt}</td> {/* Hiển thị Mã BHYT */}
              <td>{patient.medicalHistory}</td> {/* Hiển thị Tiền sử bệnh án */}
              <td>{patient.symptoms}</td> {/* Hiển thị Triệu chứng hiện tại */}
              <td>
                <Button 
                  size="small" 
                  onClick={() => onViewRecord(patient)}
                >
                  Xem hồ sơ
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientTable;