// routes/doctor.js
const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// Lấy thông tin bác sĩ (giả sử chỉ có 1 bác sĩ duy nhất)
router.get('/', async (req, res) => {
  try {
    let doctor = await Doctor.findOne();
    if (!doctor) {
      // Nếu chưa có trong DB thì tạo bản mặc định
      doctor = await Doctor.create({
        name: "BS. Lê Văn C",
        specialty: "Nội tổng quát",
        phone: "0911111111",
        email: "levanc@example.com",
        address: "Bệnh viện ABC, Hà Nội",
        avatarUrl: "",
      });
    }
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Cập nhật thông tin bác sĩ
router.put('/', async (req, res) => {
  try {
    const { name, specialty, phone, email, address, avatarUrl } = req.body;

    let doctor = await Doctor.findOne();
    if (!doctor) {
      doctor = new Doctor();
    }

    doctor.name = name;
    doctor.specialty = specialty;
    doctor.phone = phone;
    doctor.email = email;
    doctor.address = address;
    doctor.avatarUrl = avatarUrl;

    await doctor.save();
    res.json({ message: 'Cập nhật thành công', doctor });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
