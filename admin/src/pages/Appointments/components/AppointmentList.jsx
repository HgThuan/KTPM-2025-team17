import React from 'react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import './AppointmentList.css';

const AppointmentList = ({ appointments, selectedDate }) => {
  if (appointments.length === 0) {
    return (
      <div className="appointments-list empty">
        <p>Không có lịch hẹn nào vào {format(selectedDate, 'PPPP', { locale: vi })}</p>
      </div>
    );
  }

  return (
    <div className="appointments-list">
      <h3>{format(selectedDate, 'PPPP', { locale: vi })} (Lịch hẹn)</h3>
      <ul>
        {appointments.map(appt => (
          <li key={appt._id} className="appointment-item">
            <div className="appointment-time">
              {appt.time}
            </div>
            <div className="appointment-details">
              <div><strong>Họ tên:</strong> {appt.name || 'Chưa có' }</div>
              <div><strong>Số điện thoại:</strong> {appt.patientId || appt.phone || 'Chưa có'}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
