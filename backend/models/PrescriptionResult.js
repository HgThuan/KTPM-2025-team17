const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 }
});

const prescriptionResultSchema = new mongoose.Schema({
  patientId: { type: String, required: true, index: true },
  trangThai: { type: String, default: 'Đã chuẩn đoán' },  // trạng thái đơn thuốc
  thongTinChuanDoan: { type: String, required: true },
  thongTinDonThuoc: { type: String, required: true },     // lưu dạng text, mỗi thuốc trên 1 dòng
  thongBaoBacSi: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const PrescriptionResult = mongoose.model('PrescriptionResult', prescriptionResultSchema);

module.exports = PrescriptionResult;
