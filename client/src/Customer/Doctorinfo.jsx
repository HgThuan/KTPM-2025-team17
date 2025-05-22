import React, { useEffect, useState } from "react";
import "./Doctorinfo.css";
import Navbar from "../HomePage/navbar";

const Doctorinfo = () => {
  const [bacSiData, setBacSiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/doctors")
      .then((res) => res.json())
      .then((data) => {
        setBacSiData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu bác sĩ:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Đang tải dữ liệu bác sĩ...</div>;

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 className="title">Danh sách bác sĩ</h1>
        <ul className="doctor-list">
          {bacSiData.length === 0 && <li>Không có bác sĩ nào.</li>}
          {bacSiData.map((bacSi, index) => (
            <li key={index} className="doctor-item">
              <img
                src={bacSi.anh}
                alt={`Ảnh bác sĩ ${bacSi.hoTen}`}
                className="doctor-avatar"
              />
              <div className="doctor-info">
                <div className="doctor-header">
                  <h3 className="doctor-name">{bacSi.hoTen}</h3>
                  <span
                    className={`status-dot ${
                      bacSi.dangHoatDong ? "active" : "inactive"
                    }`}
                    title={bacSi.dangHoatDong ? "Đang hoạt động" : "Không hoạt động"}
                  />
                </div>
                <p><b>Chuyên khoa:</b> {bacSi.chuyenKhoa}</p>
                <p><b>Số điện thoại:</b> {bacSi.soDienThoai}</p>
                <p><b>Email:</b> {bacSi.email}</p>
                <p><b>Địa chỉ làm việc:</b> {bacSi.diaChi}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Doctorinfo;
