const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const cors = require('cors');

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// User routes (giữ nguyên nếu có)
app.use("/api/v1/user", require("./routes/userRoutes"));

// --- Định nghĩa Schema và Model cho Patients (gộp cả MedicalDeclaration)
const patientSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },       // dùng idNumber làm id
  fullName: String,
  dob: Date,
  gender: String,
  idNumber: String,
  nationality: String,
  phone: String,
  email: String,
  address: String,

  hasBHYT: Boolean,
  bhytCode: String,
  bhytPlace: String,
  bhytStartDate: Date,
  bhytEndDate: Date,

  underlyingDiseases: String,
  pastDiseases: String,
  takingMedicine: Boolean,
  medicineInfo: String,

  hasSymptoms: Boolean,
  symptoms: [String],
  symptomStartDate: Date,

  deleted: { type: Boolean, default: false }, // xóa mềm
}, { timestamps: true });

const Patient = mongoose.model("Patient", patientSchema);

// --- API nhận dữ liệu form MedicalDeclaration, lưu hoặc cập nhật bệnh nhân
app.post("/api/medical-declaration/md", async (req, res) => {
  try {
    const data = req.body;

    if (!data.idNumber) {
      return res.status(400).json({ error: "Thiếu trường idNumber (CMND/CCCD)" });
    }

    const patientData = {
      id: data.idNumber,
      fullName: data.fullName,
      dob: data.dob,
      gender: data.gender,
      idNumber: data.idNumber,
      nationality: data.nationality,
      phone: data.phone,
      email: data.email,
      address: data.address,

      hasBHYT: data.hasBHYT,
      bhytCode: data.bhytCode,
      bhytPlace: data.bhytPlace,
      bhytStartDate: data.bhytStartDate,
      bhytEndDate: data.bhytEndDate,

      underlyingDiseases: data.underlyingDiseases,
      pastDiseases: data.pastDiseases,
      takingMedicine: data.takingMedicine,
      medicineInfo: data.medicineInfo,

      hasSymptoms: data.hasSymptoms,
      symptoms: Array.isArray(data.symptoms) ? data.symptoms : [],
      symptomStartDate: data.symptomStartDate,

      deleted: false,
    };

    // Tìm bệnh nhân đã có, update nếu có, tạo mới nếu chưa
    let patient = await Patient.findOne({ id: patientData.id });
    if (patient) {
      patient = await Patient.findOneAndUpdate({ id: patientData.id }, patientData, { new: true });
    } else {
      patient = new Patient(patientData);
      await patient.save();
    }

    res.status(200).json({ message: "Khai báo y tế đã được lưu/cập nhật thành công", patient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi server, không thể lưu khai báo" });
  }
});

// --- API lấy danh sách bệnh nhân chưa xóa
app.get('/api/v1/patients', async (req, res) => {
  try {
    const patients = await Patient.find({ deleted: false });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- API lấy chi tiết bệnh nhân theo id
app.get('/api/v1/patients/:id', async (req, res) => {
  try {
    const patient = await Patient.findOne({ id: req.params.id });
    if (!patient) return res.status(404).json({ message: 'Không tìm thấy bệnh nhân' });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- API cập nhật bệnh nhân theo id
app.put('/api/v1/patients/:id', async (req, res) => {
  try {
    const patient = await Patient.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!patient) return res.status(404).json({ message: 'Không tìm thấy bệnh nhân' });
    res.json(patient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// --- API xóa mềm bệnh nhân
app.delete('/api/v1/patients/:id', async (req, res) => {
  try {
    const patient = await Patient.findOneAndUpdate({ id: req.params.id }, { deleted: true }, { new: true });
    if (!patient) return res.status(404).json({ message: 'Không tìm thấy bệnh nhân' });
    res.json({ message: 'Đã xóa bệnh nhân' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- API khôi phục bệnh nhân đã xóa
app.post('/api/v1/patients/:id/restore', async (req, res) => {
  try {
    const patient = await Patient.findOneAndUpdate({ id: req.params.id }, { deleted: false }, { new: true });
    if (!patient) return res.status(404).json({ message: 'Không tìm thấy bệnh nhân' });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server đang chạy trên port ${PORT}`);
});
