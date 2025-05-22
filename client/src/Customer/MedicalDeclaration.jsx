import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../HomePage/navbar";

export default function MedicalDeclaration() {
  const navigate = useNavigate();

  // State quản lý form
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    idNumber: "",
    nationality: "Việt Nam",
    phone: "",
    email: "",
    address: "",
    bhyt: "",
    bhytPlace: "",
    bhytStartDate: "",
    bhytEndDate: "",
    medicalHistory: "",
    pastDiseases: "",
    medicineInfo: "",
    symptomStartDate: "",
  });

  // Checkbox riêng
  const [hasBHYT, setHasBHYT] = useState(false);
  const [takingMedicine, setTakingMedicine] = useState(false);
  const [hasSymptoms, setHasSymptoms] = useState(false);

  // Triệu chứng dạng array
  const [symptoms, setSymptoms] = useState([]);

  const inputStyle = "bg-white border border-black p-2 rounded w-full";

  // Handle input thay đổi chung
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle checkbox triệu chứng
  const handleSymptomChange = (e) => {
    const { value, checked } = e.target;
    setSymptoms((prev) =>
      checked ? [...prev, value] : prev.filter((s) => s !== value)
    );
  };

  // Handle submit
  const handleSubmit = async (e) => {
  e.preventDefault();

  // 🔐 Lấy userId từ token
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Chưa đăng nhập. Vui lòng đăng nhập lại.");
    return;
  }

  let userId = "";
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    userId = payload.id;
  } catch (err) {
    alert("Token không hợp lệ");
    return;
  }

  const payload = {
    userId, // ✅ GỬI KÈM userId
    fullName: formData.name,
    dob: formData.dob,
    gender: formData.gender,
    idNumber: formData.idNumber,
    nationality: formData.nationality,
    phone: formData.phone,
    email: formData.email,
    address: formData.address,

    hasBHYT,
    bhytCode: hasBHYT ? formData.bhyt : "",
    bhytPlace: hasBHYT ? formData.bhytPlace : "",
    bhytStartDate: hasBHYT ? formData.bhytStartDate : null,
    bhytEndDate: hasBHYT ? formData.bhytEndDate : null,

    underlyingDiseases: formData.medicalHistory,
    pastDiseases: formData.pastDiseases,
    takingMedicine,
    medicineInfo: takingMedicine ? formData.medicineInfo : "",

    hasSymptoms,
    symptoms: hasSymptoms ? symptoms : [],
    symptomStartDate: hasSymptoms ? formData.symptomStartDate : null,
  };

  try {
    const res = await fetch("http://localhost:5000/api/medical-declaration/md", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("Thành công khai báo y tế!");
      navigate("/");
    } else {
      alert("Gửi khai báo thất bại");
    }
  } catch (err) {
    alert("Lỗi gửi dữ liệu");
    console.error(err);
  }
};
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Khai báo y tế</h1>

        <form onSubmit={handleSubmit}>
          {/* Thông tin cá nhân */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">🧍 Thông tin cá nhân của bệnh nhân</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className={inputStyle}
                placeholder="Họ và tên *"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                className={inputStyle}
                type="date"
                placeholder="Ngày tháng năm sinh *"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                required
              />

              <select
                className={inputStyle}
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Giới tính *</option>
                <option>Nam</option>
                <option>Nữ</option>
                <option>Khác</option>
              </select>

              <input
                className={inputStyle}
                placeholder="CMND/CCCD/Hộ chiếu *"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleInputChange}
                required
              />

              <input
                className={inputStyle}
                placeholder="Quốc tịch"
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
              />
              <input
                className={inputStyle}
                placeholder="Số điện thoại *"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              <input
                className={inputStyle}
                placeholder="Email (nếu có)"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <textarea
              className={`${inputStyle} mt-2`}
              placeholder="Địa chỉ thường trú *"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </section>

          {/* Thông tin BHYT */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">💳 Thông tin bảo hiểm y tế</h2>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={hasBHYT}
                onChange={() => setHasBHYT(!hasBHYT)}
              />
              Có tham gia BHYT?
            </label>
            {hasBHYT && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <input
                  className={inputStyle}
                  placeholder="Mã số BHYT *"
                  name="bhyt"
                  value={formData.bhyt}
                  onChange={handleInputChange}
                  required
                />
                <input
                  className={inputStyle}
                  placeholder="Nơi đăng ký KCB ban đầu"
                  name="bhytPlace"
                  value={formData.bhytPlace}
                  onChange={handleInputChange}
                />
                <div>
                  <label className="block">Thời hạn thẻ BHYT:</label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      className={inputStyle}
                      name="bhytStartDate"
                      value={formData.bhytStartDate}
                      onChange={handleInputChange}
                    />
                    <input
                      type="date"
                      className={inputStyle}
                      name="bhytEndDate"
                      value={formData.bhytEndDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Bệnh án & sức khỏe */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">🩺 Tiền sử bệnh án & Tình trạng sức khỏe hiện tại</h2>
            <textarea
              className={`${inputStyle} w-full mt-2 resize rounded min-h-[80px]`}
              placeholder="Đang mắc bệnh nền nào?"
              name="medicalHistory"
              value={formData.medicalHistory}
              onChange={handleInputChange}
            />
            <textarea
              className={`${inputStyle} w-full mt-2 resize rounded min-h-[80px]`}
              placeholder="Đã từng mắc bệnh gì đáng chú ý?"
              name="pastDiseases"
              value={formData.pastDiseases}
              onChange={handleInputChange}
            />
            <label className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={takingMedicine}
                onChange={() => setTakingMedicine(!takingMedicine)}
              />
              Có đang dùng thuốc điều trị?
            </label>
            {takingMedicine && (
              <textarea
                className={`${inputStyle} w-full mt-2`}
                placeholder="Tên thuốc và liều lượng"
                name="medicineInfo"
                value={formData.medicineInfo}
                onChange={handleInputChange}
              />
            )}
            <label className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                checked={hasSymptoms}
                onChange={() => setHasSymptoms(!hasSymptoms)}
              />
              Có triệu chứng hiện tại không?
            </label>
            {hasSymptoms && (
              <div className="mt-2">
                <label>Chọn triệu chứng:</label>
                <div className="flex flex-wrap gap-2">
                  {["Sốt", "Ho", "Khó thở", "Mệt mỏi", "Mất khứu giác"].map(
                    (symptom) => (
                      <label key={symptom} className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          value={symptom}
                          checked={symptoms.includes(symptom)}
                          onChange={handleSymptomChange}
                        />
                        {symptom}
                      </label>
                    )
                  )}
                </div>
                <input
                  className={`${inputStyle} mt-2`}
                  type="date"
                  placeholder="Ngày khởi phát triệu chứng"
                  name="symptomStartDate"
                  value={formData.symptomStartDate}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </section>

          <button
            type="submit"
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded"
          >
            Gửi khai báo
          </button>
        </form>
      </div>
    </div>
  );
}
