import { useState } from 'react';

export default function EventCard({ month, day, title, time, location, description, participants, audience, organizer }) {
  const [attending, setAttending] = useState(false);
  const [participantCount, setParticipantCount] = useState(participants || Math.floor(Math.random() * 50) + 10);
  const [expanded, setExpanded] = useState(false);

  const handleAttend = () => {
    if (!attending) {
      setAttending(true);
      setParticipantCount(c => c + 1);
    }
  };

  return (
    <div className={`event-card ${expanded ? 'event-card-expanded' : ''}`}>

      {/* ── Ligne principale (layout original) ── */}
      <div className="event-date-box">
        <span className="event-date-month">{month}</span>
        <span className="event-date-day">{day}</span>
      </div>
      <div className="event-info">
        <div className="event-title">{title}</div>
        <div className="event-time">🕐 {time}{location ? ` — ${location.split('—')[0].trim()}` : ''}</div>
        <div className="event-participants">👥 {participantCount} participants</div>
        <div className="event-card-actions">
          <button
            className="event-attend-btn"
            onClick={handleAttend}
            style={attending ? { background: 'var(--accent-blue)', color: 'white', borderColor: 'var(--accent-blue)' } : {}}
          >
            {attending ? '✓ Inscrit' : 'Participer'}
          </button>
          <button
            className="event-details-btn"
            onClick={() => setExpanded(e => !e)}
            style={expanded ? { background: 'var(--accent-pray)', color: 'white', borderColor: 'var(--accent-pray)' } : {}}
          >
            {expanded ? 'Fermer' : 'Détails'}
          </button>
        </div>
      </div>

      {/* ── Accordéon inline ── */}
      {expanded && (
        <div className="event-accordion">
          <div className="event-accordion-rows">
            {time && (
              <div className="event-accordion-row">
                <span className="event-accordion-icon">🕐</span>
                <span className="event-accordion-label">Heure</span>
                <span className="event-accordion-value">{time}</span>
              </div>
            )}
            {location && (
              <div className="event-accordion-row">
                <span className="event-accordion-icon">📍</span>
                <span className="event-accordion-label">Lieu</span>
                <span className="event-accordion-value">{location}</span>
              </div>
            )}
            {audience && (
              <div className="event-accordion-row">
                <span className="event-accordion-icon">🌍</span>
                <span className="event-accordion-label">Audience</span>
                <span className="event-accordion-value">{audience === 'public' ? 'Ouvert au public' : 'Membres seulement'}</span>
              </div>
            )}
            {organizer && (
              <div className="event-accordion-row">
                <span className="event-accordion-icon">👤</span>
                <span className="event-accordion-label">Organisateur</span>
                <span className="event-accordion-value">{organizer}</span>
              </div>
            )}
          </div>
          {description && (
            <p className="event-accordion-desc">{description}</p>
          )}
        </div>
      )}
    </div>
  );
}
