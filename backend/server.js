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
  userId: { type: String, required: true, unique: true },  
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
      userId:data.userId,
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
//dat lich
const appointmentRoutes = require('./routes/appointmentRoutes');
app.use('/api/v1/appointments', appointmentRoutes);



// --- API danh sách bác sĩ
const bacSiData = [
  {
    anh: "https://i.pravatar.cc/120?img=10",
    dangHoatDong: true,
    hoTen: "Nguyễn Văn A",
    chuyenKhoa: "Nội khoa",
    soDienThoai: "0901234567",
    email: "nguyenvana@example.com",
    diaChi: "Bệnh viện Đa khoa Hà Nội",
  },
  {
    anh: "https://i.pravatar.cc/120?img=15",
    dangHoatDong: false,
    hoTen: "Trần Thị B",
    chuyenKhoa: "Ngoại khoa",
    soDienThoai: "0912345678",
    email: "tranthib@example.com",
    diaChi: "Bệnh viện Việt Đức",
  },
  {
    anh: "https://i.pravatar.cc/120?img=20",
    dangHoatDong: true,
    hoTen: "Lê Văn C",
    chuyenKhoa: "Tai mũi họng",
    soDienThoai: "0987654321",
    email: "levanc@example.com",
    diaChi: "Bệnh viện Bạch Mai",
  },
];
app.get("/api/doctors", (req, res) => {
  res.json(bacSiData);
});

// đơn thuốc
const prescriptionSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  diagnosis: { type: String, required: true },
  medicines: [{
    name: { type: String, required: true },
    quantity: { type: String, required: true }
  }],
  createdAt: { type: Date, default: Date.now }
});


const Prescription = mongoose.model('Prescription', prescriptionSchema);

// API POST lưu đơn thuốc
app.post('/api/prescriptions', async (req, res) => {
  try {
    const { patientId, diagnosis, medicines } = req.body;

    // Validate đơn giản
    if (!patientId || !diagnosis || !Array.isArray(medicines) || medicines.length === 0) {
      return res.status(400).json({ success: false, message: 'Dữ liệu không hợp lệ' });
    }

    // Tạo bản ghi mới
    const newPrescription = new Prescription({
      patientId,
      diagnosis,
      medicines
    });

    await newPrescription.save();

    return res.json({ success: true, message: 'Lưu đơn thuốc thành công' });
  } catch (error) {
    console.error('Error saving prescription:', error);
    return res.status(500).json({ success: false, message: 'Lỗi server' });
  }
});

// API GET lấy kết quả theo patientId (mới thêm)
app.get('/api/prescriptions/latest', async (req, res) => {
 try {
    const latestPrescription = await Prescription.findOne().sort({ createdAt: -1 });

    if (!latestPrescription) {
      return res.status(404).json({ error: 'No prescriptions found' });
    }

    res.json(latestPrescription);
  } catch (error) {
    console.error('Error fetching latest prescription:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single prescription by ID
app.get('/api/prescriptions/:id', async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);
    
    if (!prescription) {
      return res.status(404).json({ error: 'Prescription not found' });
    }
    
    res.json(prescription);
  } catch (error) {
    console.error('Error fetching prescription:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/medical-declaration/latest', async (req, res) => {
  try {
    const latestPatient = await Patient.findOne().sort({ createdAt: -1 });

    if (!latestPatient) {
      return res.status(404).json({ error: 'Không tìm thấy bệnh nhân' });
    }

    res.json(latestPatient);
  } catch (err) {
    console.error('Lỗi server:', err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server đang chạy trên port ${PORT}`);
});