import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserNavbar from "../HomePage/usernavbar";
import "./Results.css";

const Results = () => {
  const { patientId } = useParams();
  console.log("patientId:", patientId);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
useEffect(() => {
    const fetchLatestPrescription = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/prescriptions/latest`);
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || 'Failed to fetch prescription data');
        }
        const data = await response.json();
        setResult(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPrescription();
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!result) return <div>No prescription found.</div>;

  return (
    <div>
      <UserNavbar/>
      <div className="container">
        <h1 className="title">Tra cứu kết quả</h1>

        <div className="info-section">
          <h2>Mã bệnh nhân:</h2>
          <p className="paragraph">{result.patientId}</p>
        </div>

        <div className="info-section">
          <h2>Thông tin đơn thuốc:</h2>
          <div className="medicines-list">
            {result.medicines.map((medicine, index) => (
              <div key={index} className="medicine-item">
                <p><strong>Tên thuốc:</strong> {medicine.name}</p>
                <p><strong>Cách dùng + liều lượng:</strong> {medicine.quantity}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="info-section">
          <h2>Chuẩn đoán từ bác sĩ:</h2>
          <p className="paragraph">{result.diagnosis}</p>
        </div>
      </div>
    </div>
  );
};

export default Results;