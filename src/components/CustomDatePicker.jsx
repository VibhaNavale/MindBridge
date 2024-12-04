import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({ sessions, onDateSelect }) => {
  // Get all session dates
  const sessionDates = sessions.map(session => new Date(session.date));
  
  // Custom day rendering to show session indicators
  const renderDayContents = (day, date) => {
    const isSessionDay = sessionDates.some(sessionDate => 
      sessionDate.toDateString() === date.toDateString()
    );

    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <span className={isSessionDay ? 'text-amber-900 font-medium' : ''}>
          {day}
        </span>
        {isSessionDay && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-600 rounded-full" />
        )}
      </div>
    );
  };

  return (
    <div className="date-picker-wrapper bg-white rounded-lg shadow-lg">
      <DatePicker
        inline
        renderDayContents={renderDayContents}
        onChange={onDateSelect}
        highlightDates={sessionDates}
        calendarClassName="bg-white rounded-lg shadow-lg border border-amber-300"
        dayClassName={date => 
          sessionDates.some(sessionDate => 
            sessionDate.toDateString() === date.toDateString()
          ) ? 'session-day' : undefined
        }
      />
      <style jsx global>{`
        .date-picker-wrapper .react-datepicker {
          font-family: inherit;
          border-color: #FED7AA;
          border-radius: 0.75rem;
          border: 1px solid #FED7AA;
          background-color: white;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }
        
        .date-picker-wrapper .react-datepicker__header {
          background-color: #FFF7ED;
          border-bottom: 1px solid #FED7AA;
          border-top-right-radius: 0.75rem;
          border-top-left-radius: 0.75rem;
          padding-top: 0.75rem;
        }
        
        .date-picker-wrapper .react-datepicker__current-month {
          color: #EA580C;
          font-weight: 600;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }
        
        .date-picker-wrapper .react-datepicker__navigation {
          top: 0.75rem;
        }
        
        .date-picker-wrapper .react-datepicker__day-name {
          color: #9CA3AF;
          margin: 0.4rem;
        }
        
        .date-picker-wrapper .react-datepicker__day {
          margin: 0.4rem;
          color: #374151;
          border-radius: 0.375rem;
        }
        
        .date-picker-wrapper .react-datepicker__day:hover {
          background-color: #FED7AA;
          border-radius: 0.375rem;
        }
        
        .date-picker-wrapper .react-datepicker__day--selected {
          background-color: #EA580C;
          color: white;
          border-radius: 0.375rem;
        }
        
        .date-picker-wrapper .session-day {
          color: #EA580C;
          font-weight: 500;
        }
        
        .date-picker-wrapper .react-datepicker__day--keyboard-selected {
          background-color: #FED7AA;
          color: #EA580C;
        }
      `}</style>
    </div>
  );
};

export default CustomDatePicker;