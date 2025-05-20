import React, { useState, useEffect } from 'react';
import { format, addWeeks, subWeeks, startOfWeek, addDays } from 'date-fns';
import { vi } from 'date-fns/locale';
import Button from '../../Components/UI/Button';
import Modal from '../../Components/UI/Modal';
import AppointmentList from './components/AppointmentList';
import './Appointments.css';

const Appointments = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    time: '',
    patientId: '',
    patientName: ''
  });

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };
  // Tạo danh sách ngày trong tuần
  const getWeekDays = () => {
    const startDate = startOfWeek(currentWeek, { locale: vi });
    return Array.from({ length: 7 }).map((_, index) => 
      addDays(startDate, index)
    );
  };

  // Xử lý thay đổi tuần
  const handlePrevWeek = () => setCurrentWeek(subWeeks(currentWeek, 1));
  const handleNextWeek = () => setCurrentWeek(addWeeks(currentWeek, 1));

  // Xử lý thay đổi form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({ ...prev, [name]: value }));
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const newAppt = {
      ...newAppointment,
      date: selectedDate,
      id: Date.now().toString()
    };
    setAppointments([...appointments, newAppt]);
    setShowAddModal(false);
    setNewAppointment({ time: '', patientId: '', patientName: '' });
  };

  // Lấy các cuộc hẹn trong ngày được chọn
  const getDailyAppointments = () => {
    return appointments.filter(appt => 
      format(appt.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
    );
  };
  // Fetch lịch hẹn khi selectedDate hoặc currentWeek thay đổi
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const dateStr = formatDate(selectedDate);
        const res = await fetch(`http://localhost:5000/api/v1/appointments?date=${dateStr}`);
        const data = await res.json();
        setAppointments(data);
      } catch (error) {
        console.error('Lỗi lấy lịch hẹn:', error);
      }
    };
    fetchAppointments();
  }, [selectedDate, currentWeek]);
  return (
    <section className="appointments-section">
      <h2>Lịch hẹn</h2>

      {/* Lịch tuần */}
      <div className="calendar-container">
        <div className="calendar-header">
          <Button 
            className="calendar-arrow"
            onClick={handlePrevWeek}
          >
            &#8592;
          </Button>
          <span className="calendar-date-label">
            {format(currentWeek, 'MMMM yyyy', { locale: vi })}
          </span>
          <Button 
            className="calendar-arrow"
            onClick={handleNextWeek}
          >
            &#8594;
          </Button>
        </div>

        <div className="calendar-days">
          {getWeekDays().map((day) => (
            <div 
              key={day.toString()}
              className={`calendar-day ${
                format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') ? 'active' : ''
              }`}
              onClick={() => setSelectedDate(day)}
            >
              <div className="day-name">
                {format(day, 'EEE', { locale: vi })}
              </div>
              <div className="day-number">
                {format(day, 'd')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Danh sách lịch hẹn */}
      <AppointmentList 
        appointments={getDailyAppointments()} 
        selectedDate={selectedDate} 
      />

      {/* Nút thêm lịch hẹn */}
      <div className="add-appointment-btn-container">
        <Button 
          className="primary"
          onClick={() => setShowAddModal(true)}
        >
          Thêm lịch hẹn
        </Button>
      </div>

      {/* Modal thêm lịch hẹn */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Thêm lịch hẹn"
        size="small"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Giờ hẹn:</label>
            <input
              type="time"
              name="time"
              value={newAppointment.time}
              onChange={handleInputChange}
              required
              step="60"
            />
          </div>
          
          <div className="form-group">
            <label>Mã BN:</label>
            <input
              type="text"
              name="patientId"
              value={newAppointment.patientId}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Tên bệnh nhân:</label>
            <input
              type="text"
              name="patientName"
              value={newAppointment.patientName}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-actions">
            <Button type="submit" className="edit">
              Lưu
            </Button>
            <Button 
              type="button" 
              onClick={() => setShowAddModal(false)}
            >
              Huỷ
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default Appointments;