import React from "react";
import { useNavigate } from "react-router-dom";
import { TelephoneFill, PersonFill, GeoAltFill } from "react-bootstrap-icons";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 max-w-screen-xl mx-auto">
        {/* Logo & Slogan */}
        <div className="flex items-center space-x-4" onClick={() => navigate("/")}>
          <img
            src="https://dkkham.bachmai.gov.vn/build/assets/logo_bm_text-2d7d8ba1.png"
            alt="Logo"
            className="h-14"
          />
          <img
            src="https://dkkham.bachmai.gov.vn/build/assets/slogan-703c91d9.png"
            alt="Slogan"
            className="h-10"
          />
        </div>

        {/* Info */}
        <div className="text-sm text-right space-y-1">
          <div className="flex items-center gap-2 justify-end">
            <TelephoneFill />
            <span>1900.888.866</span>

            {/* 👇 Đăng nhập (click để chuyển trang) */}
            <div
              onClick={() => navigate("/login")}
              className="cursor-pointer flex items-center gap-1 hover:text-gray-300"
            >
              <PersonFill />
              <span>Đăng xuất</span>
            </div>

          </div>

          <div className="flex items-center gap-2 justify-end">
            <GeoAltFill />
            <span>78 Đường Giải Phóng, Phường Mai, Đống Đa, Hà Nội</span>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="bg-[#00723F]">
        <div className="max-w-screen-xl mx-auto flex justify-center space-x-8 py-2">
          <a href="https://moh.gov.vn/" className="text-white font-semibold uppercase text-sm">Cổng thông tin</a>
          <a href="#" className="text-white font-semibold uppercase text-sm"onClick={() => navigate("/info")}>Thông tin bệnh nhân</a>
          <a href="" className="text-white font-semibold uppercase text-sm" onClick={() => navigate("/datlich")}>Đặt lịch khám</a>
          <a href="" className="text-white font-semibold uppercase text-sm" onClick={() => navigate("/ketqua")}>Tra cứu kết quả</a>
        </div>
      </div>
    </div>
  );
}
