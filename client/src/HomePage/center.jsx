import React from "react";
import { useNavigate } from 'react-router-dom';
export default function Center() {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/md"); // hoặc đường dẫn tương ứng với route bạn đã đặt
  };
  return (
    <div className="bg-[#f5f6fa] min-h-screen py-10 px-4">
      <div className="max-w-screen-xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-green-800 mb-2">Các hình thức đặt khám</h2>
        <p className="text-gray-700 mb-8">
          Vui lòng chọn dịch vụ y tế mà bạn muốn sử dụng. Chúng tôi cung cấp một loạt các dịch vụ chăm sóc sức khỏe bao gồm khám tổng quát, kiểm tra chuyên khoa, tư vấn sức khỏe, dịch vụ xét nghiệm tại nhà và các chương trình điều trị đặc biệt.
        </p>

        {/* Danh sách dịch vụ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
          {/* Đặt lịch khám bác sĩ */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center"onClick={() => navigate("/datlich")}>
            <img src="https://dkkham.bachmai.gov.vn/build/assets/stethoscope-1c43adff.png" alt="Đặt lịch khám bác sĩ" className="w-20 h-20 mb-4" />
            <h3 className="text-lg font-semibold text-green-800">Đặt lịch khám bác sĩ</h3>
          </div>

          {/* Thông tin bác sĩ */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center"onClick={() => navigate("/thongtinbacsi")}>
            <img src="https://dkkham.bachmai.gov.vn/build/assets/medical-book-5772752e.png" alt="Thông tin bác sĩ" className="w-20 h-20 mb-4" />
            <h3 className="text-lg font-semibold text-green-800">Thông tin bác sĩ</h3>
          </div>

          {/* Khai báo y tế */}
        
          <div
              onClick={handleClick}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center cursor-pointer hover:shadow-lg transition"
              >
              <img
                src="https://dkkham.bachmai.gov.vn/build/assets/healthcare-ca9c18b6.png"
                alt="Khai báo y tế"
                className="w-20 h-20 mb-4"
              />
              <h3 className="text-lg font-semibold text-green-800">Khai báo y tế</h3>
            </div>
        </div>
        {/* Thông tin tổng đài */}
        <div className="mt-10 border-2 border-dashed border-green-500 p-4 rounded-lg bg-white max-w-xl mx-auto">
          <p className="text-sm text-black font-semibold mb-1">
            Ngoài ra để đặt lịch khám chữa bệnh theo yêu cầu quý khách vui lòng liên hệ tổng đài
          </p>
          <p className="text-red-600 font-bold text-lg mb-2">1900 888 866</p>
          <p className="text-gray-700">
            Thời gian làm việc của tổng đài: <br />
            T2 - T6 từ 7:30 đến 21:00 | T7 - CN từ 7:30 đến 16:30
          </p>
        </div>
      </div>
    </div>
  );
}
