const express = require("express");
const morgan = require ("morgan");
const dotenv = require ("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const cors = require('cors');

dotenv.config();
const app = express();

//mongoose.connect("mongodb+srv://hoangvanthuan010:123@cluster0.b0a9r5d.mongodb.net/doc_db");
// Middleware
connectDB();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//router
app.use("/api/v1/user", require("./routes/userRoutes"));
const doctorRoutes = require('./routes/doctor');
app.use('/api/v1/doctor', doctorRoutes);
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server đang chạy trên port ${PORT}`);
});