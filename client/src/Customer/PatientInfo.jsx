import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../HomePage/navbar";

export default function PatientInfo() {
  const { idNumber } = useParams(); // Lấy idNumber từ URL, ví dụ /patient-info/:idNumber
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
    fetch(`http://localhost:5000/api/medical-declaration/latest`)
      .then((res) => {
        if (!res.ok) throw new Error("Không tìm thấy bệnh nhân");
        return res.json();
      })
      .then((data) => {
        setPatient(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Lỗi khi tải dữ liệu");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Đang tải dữ liệu...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!patient) return <div className="error">Không có dữ liệu bệnh nhân</div>;

  return (
    <div className="patient-info-page">
      <Navbar />
      <div className="container">
        <h1 className="title">Thông tin bệnh nhân</h1>

        <section className="section">
          <h2>🧍 Thông tin cá nhân</h2>
          <div className="info-grid">
            <div><strong>Họ và tên:</strong> {patient.fullName || "-"}</div>
            <div><strong>Ngày sinh:</strong> {patient.dob || "-"}</div>
            <div><strong>Giới tính:</strong> {patient.gender || "-"}</div>
            <div><strong>CMND/CCCD/Hộ chiếu:</strong> {patient.idNumber || "-"}</div>
            <div><strong>Quốc tịch:</strong> {patient.nationality || "-"}</div>
            <div><strong>Số điện thoại:</strong> {patient.phone || "-"}</div>
            <div><strong>Email:</strong> {patient.email || "-"}</div>
            <div className="full-width"><strong>Địa chỉ:</strong> {patient.address || "-"}</div>
          </div>
        </section>

        <section className="section">
          <h2>💳 Thông tin bảo hiểm y tế</h2>
          <p><strong>Có tham gia BHYT:</strong> {patient.hasBHYT ? "Có" : "Không"}</p>
          {patient.hasBHYT && (
            <>
              <p><strong>Mã số BHYT:</strong> {patient.bhytCode || "-"}</p>
              <p><strong>Nơi đăng ký KCB ban đầu:</strong> {patient.bhytPlace || "-"}</p>
              <p><strong>Thời hạn thẻ BHYT:</strong> {patient.bhytStartDate || "-"} đến {patient.bhytEndDate || "-"}</p>
            </>
          )}
        </section>

        <section className="section">
          <h2>🩺 Tiền sử bệnh án & Tình trạng sức khỏe</h2>
          <p><strong>Bệnh nền đang mắc:</strong> {patient.underlyingDiseases || "-"}</p>
          <p><strong>Tiền sử bệnh đã từng mắc:</strong> {patient.pastDiseases || "-"}</p>
          <p><strong>Đang dùng thuốc điều trị:</strong> {patient.takingMedicine ? "Có" : "Không"}</p>
          {patient.takingMedicine && (
            <p><strong>Thông tin thuốc:</strong> {patient.medicineInfo || "-"}</p>
          )}
          <p><strong>Có triệu chứng hiện tại:</strong> {patient.hasSymptoms ? "Có" : "Không"}</p>
          {patient.hasSymptoms && (
            <>
              <p><strong>Triệu chứng:</strong> {patient.symptoms?.length > 0 ? patient.symptoms.join(", ") : "-"}</p>
              <p><strong>Ngày khởi phát triệu chứng:</strong> {patient.symptomStartDate || "-"}</p>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
