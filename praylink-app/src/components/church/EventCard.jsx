import { useState } from 'react';

export default function EventCard({ month, day, title, time }) {
  const [attending, setAttending] = useState(false);

  const handleAttend = () => {
    if (!attending) {
      setAttending(true);
    }
  };

  return (
    <div className="event-card">
      <div className="event-date-box">
        <span className="event-date-month">{month}</span>
        <span className="event-date-day">{day}</span>
      </div>
      <div className="event-info">
        <div className="event-title">{title}</div>
        <div className="event-time">{time}</div>
      </div>
      <button
        className="event-attend-btn"
        onClick={handleAttend}
        style={attending ? {
          background: 'var(--accent-blue)',
          color: 'white',
          borderColor: 'var(--accent-blue)',
        } : {}}
      >
        {attending ? '✓ Inscrit' : 'Participer'}
      </button>
    </div>
  );
}
