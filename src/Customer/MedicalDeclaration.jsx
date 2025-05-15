import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../HomePage/navbar";


export default function MedicalDeclaration() {
  const [hasBHYT, setHasBHYT] = useState(false);
  const [takingMedicine, setTakingMedicine] = useState(false);
  const [hasSymptoms, setHasSymptoms] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Xử lý gửi dữ liệu khai báo y tế ở đây

    // Sau khi gửi thành công, điều hướng sang trang Success
    navigate("/success");
  };

  const inputStyle = "bg-white border border-black p-2 rounded w-full";

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Khai báo y tế</h1>

        {/* 🧍 Thông tin cá nhân */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">🧍 Thông tin cá nhân của bệnh nhân</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className={inputStyle} placeholder="Họ và tên *" required />
            <input className={inputStyle} type="date" placeholder="Ngày tháng năm sinh *" required />

            <select className={inputStyle} required>
              <option>Giới tính *</option>
              <option>Nam</option>
              <option>Nữ</option>
              <option>Khác</option>
            </select>
            <input className={inputStyle} placeholder="CMND/CCCD/Hộ chiếu *" required />

            <input className={inputStyle} placeholder="Quốc tịch" defaultValue="Việt Nam" />
            <input className={inputStyle} placeholder="Số điện thoại *" required />
            <input className={inputStyle} placeholder="Email (nếu có)" />
          </div>
          <textarea className={`${inputStyle} mt-2`} placeholder="Địa chỉ thường trú *" required />
        </section>

        {/* 💳 Thông tin BHYT */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">💳 Thông tin bảo hiểm y tế</h2>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={hasBHYT} onChange={() => setHasBHYT(!hasBHYT)} />
            Có tham gia BHYT?
          </label>
          {hasBHYT && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <input className={inputStyle} placeholder="Mã số BHYT *" required />
              <input className={inputStyle} placeholder="Nơi đăng ký KCB ban đầu" />
              <div>
                <label className="block">Thời hạn thẻ BHYT:</label>
                <div className="flex gap-2">
                  <input type="date" className={inputStyle} />
                  <input type="date" className={inputStyle} />
                </div>
              </div>
              
            </div>
          )}
        </section>

        {/* 🩺 Bệnh án & sức khỏe */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">🩺 Tiền sử bệnh án & Tình trạng sức khỏe hiện tại</h2>
          <textarea className={`${inputStyle} w-full mt-2 resize rounded min-h-[80px]`} placeholder="Đang mắc bệnh nền nào?" />
          <textarea className={`${inputStyle} w-full mt-2 resize rounded min-h-[80px]`} placeholder="Đã từng mắc bệnh gì đáng chú ý?" />
          <label className="flex items-center gap-2 mt-2">
            <input type="checkbox" checked={takingMedicine} onChange={() => setTakingMedicine(!takingMedicine)} />
            Có đang dùng thuốc điều trị?
          </label>
          {takingMedicine && (
            <textarea className={`${inputStyle} w-full mt-2`} placeholder="Tên thuốc và liều lượng" />
          )}
          <label className="flex items-center gap-2 mt-4">
            <input type="checkbox" checked={hasSymptoms} onChange={() => setHasSymptoms(!hasSymptoms)} />
            Có triệu chứng hiện tại không?
          </label>
          {hasSymptoms && (
            <div className="mt-2">
              <label>Chọn triệu chứng:</label>
              <div className="flex flex-wrap gap-2">
                {['Sốt', 'Ho', 'Khó thở', 'Mệt mỏi', 'Mất khứu giác'].map((symptom) => (
                  <label key={symptom} className="flex items-center gap-1">
                    <input type="checkbox" /> {symptom}
                  </label>
                ))}
              </div>
              <input className={`${inputStyle} mt-2`} type="date" placeholder="Ngày khởi phát triệu chứng" />
            </div>
          )}
        </section>
        <form onSubmit={handleSubmit}>
          {/* Form fields ... */}
          {/* ... giữ nguyên phần form bạn đã làm ... */}

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
