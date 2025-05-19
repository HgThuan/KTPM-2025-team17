// models/MedicalDeclaration.js
const mongoose = require('mongoose');

const medicalDeclarationSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Họ tên bệnh nhân
  dob: { type: String, required: true }, // Ngày sinh
  gender: { type: String, required: true }, // Giới tính
  phone: { type: String, required: true }, // Số điện thoại
  symptoms: { type: String, required: true }, // Triệu chứng
  medicalHistory: { type: String }, // Tiền sử bệnh án
  currentMedications: { type: String }, // Thuốc hiện tại
  allergies: { type: String }, // Dị ứng
  additionalNotes: { type: String }, // Ghi chú thêm
  declarationDate: { type: Date, default: Date.now } // Ngày khai báo
});

const MedicalDeclaration = mongoose.model('MedicalDeclaration', medicalDeclarationSchema);
module.exports = MedicalDeclaration;
