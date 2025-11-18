import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarView.css';

const CalendarView = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="calendar-container">
      <h2>Post Scheduling Calendar</h2>
      <Calendar onChange={setDate} value={date} />
      <p>Selected date: {date.toDateString()}</p>
    </div>
  );
};

export default CalendarView;
