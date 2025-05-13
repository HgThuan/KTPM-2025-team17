import React from "react";

export default function Footer() {
  return (
    <footer className="bg-green-700 text-white py-10 px-4 text-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-6">
        {/* Cột thông tin bệnh viện */}
        <div className="md:w-1/2">
          
          <h2 className="text-base font-bold uppercase mb-2">
            Cổng thông tin điện tử<br />Bệnh viện XXXXXXXXXXX
          </h2>
          <p>Địa chỉ: 78 Đường Giải Phóng, Phương Mai, Đống Đa, Hà Nội</p>
          <p>Đường dây nóng: 1900.888.866 - 096.985.1616</p>
          <p>Giấy phép số: 115/GP-BC do BVHTT cấp ngày 05/8/2005</p>
          <p>Chịu trách nhiệm chính: PGS.TS. XXX XXXX XX - Giám đốc bệnh viện</p>
        </div>

        {/* Cột liên kết */}
        <div className="md:w-1/2">
          
          <div className="mb-4">
            
          </div>
        </div>
      </div>

    </footer>
  );
}
