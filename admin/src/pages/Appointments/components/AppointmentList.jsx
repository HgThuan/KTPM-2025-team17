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
      <h3>{format(selectedDate, 'PPPP', { locale: vi })}</h3>
      <ul>
        {appointments.map(appt => (
          <li key={appt.id} className="appointment-item">
            <div className="appointment-time">
              {appt.time}
            </div>
            <div className="appointment-details">
              <div className="patient-id">{appt.patientId}</div>
              <div className="patient-name">{appt.patientName}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;