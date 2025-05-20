const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Định nghĩa schema cho lịch hẹn
const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
}, { timestamps: true });

// Tạo model
const Appointment = mongoose.model('Appointment', appointmentSchema);

// --- API ĐẶT LỊCH: POST /api/v1/appointments/datlich
router.post('/datlich', async (req, res) => {
  try {
    const { name, phone, date, time } = req.body;

    if (!name || !phone || !date || !time) {
      return res.status(400).json({ message: 'Thiếu thông tin đặt lịch' });
    }

    const newAppointment = new Appointment({ name, phone, date, time });
    await newAppointment.save();

    res.status(201).json({ message: 'Đặt lịch thành công', appointment: newAppointment });
  } catch (err) {
    console.error('Lỗi khi đặt lịch:', err);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// --- API LẤY TOÀN BỘ LỊCH HẸN (tùy chọn)
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
