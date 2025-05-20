const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  time: { type: String, required: true },          // Giờ hẹn (ví dụ: "08:00")
  patientId: { type: String, required: true },     // Mã bệnh nhân
  patientName: { type: String, required: true },   // Tên bệnh nhân
  date: { type: String, required: true },          // Ngày hẹn, định dạng yyyy-MM-dd
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
