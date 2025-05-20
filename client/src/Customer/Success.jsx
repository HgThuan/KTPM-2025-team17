import React from "react";
import Navbar from "../HomePage/navbar";

export default function Success() {
  return (
    <div>
        <Navbar/>
            <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
                <h1 className="text-3xl font-bold text-green-700 mb-4">Khai báo thành công!</h1>
                <p className="text-green-600">Cảm ơn bạn đã gửi thông tin khai báo y tế.</p>
            </div>
    </div>
  );
}