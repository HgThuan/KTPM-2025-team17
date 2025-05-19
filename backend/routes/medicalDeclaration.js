// routes/medicalDeclaration.js
const express = require('express');
const router = express.Router();
const MedicalDeclaration = require('../models/MedicalDeclaration');

// Nhận thông tin khai báo y tế từ frontend
router.post('/', async (req, res) => {
  try {
    const { patientId, name, dob, gender, phone, symptoms, medicalHistory, currentMedications, allergies, additionalNotes } = req.body;

    const newDeclaration = new MedicalDeclaration({
      patientId,
      name,
      dob,
      gender,
      phone,
      symptoms,
      medicalHistory,
      currentMedications,
      allergies,
      additionalNotes,
    });

    await newDeclaration.save();
    res.status(201).json({ message: 'Khai báo y tế thành công', declaration: newDeclaration });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi khi lưu khai báo y tế' });
  }
});

// Lấy thông tin khai báo y tế của bệnh nhân
router.get('/:patientId', async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const declarations = await MedicalDeclaration.find({ patientId });
    res.status(200).json(declarations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi khi lấy thông tin khai báo y tế' });
  }
});

module.exports = router;
