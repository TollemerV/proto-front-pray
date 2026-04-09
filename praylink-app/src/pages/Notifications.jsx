import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import '../styles/Notifications.css';

/* ── Événements inscrits (mock) ─────────────────────────────────
   On calcule "dans X jours" relativement à aujourd'hui.
   Les dates sont définies en offset depuis now for demo purposes.
─────────────────────────────────────────────────────────────── */
const today = new Date();
const addDays = (d) => { const r = new Date(today); r.setDate(r.getDate() + d); return r; };

const INITIAL_EVENTS = [
  {
    id: 1,
    title: 'Soirée de louange & adoration',
    church: 'Église Béthel Paris',
    date: addDays(2),
    time: '19h30',
    location: 'Salle principale',
    emoji: '🎶',
    color: 'var(--accent-pray)',
    description: 'Venez vivre un moment de louange intense en la présence de Dieu. Musique, prière collective et temps de partage fraternel. Ouvert à tous, n\'hésitez pas à inviter vos proches !',
    organizer: 'Pasteur Samuel',
    attendees: 47,
  },
  {
    id: 2,
    title: 'Maraude solidaire',
    church: 'Église Béthel Paris',
    date: addDays(9),
    time: '14h00',
    location: 'Place de la République',
    emoji: '🤝',
    color: '#10B981',
    description: 'Distribution de repas chauds et de vêtements aux personnes sans-abri. Rendez-vous à 13h45 devant l\'église pour le départ groupé. Pensez à apporter gants et sacs.',
    organizer: 'Équipe solidarité',
    attendees: 23,
  },
  {
    id: 3,
    title: 'Groupe de jeunes — Bible study',
    church: 'Église Béthel Paris',
    date: addDays(14),
    time: '18h00',
    location: 'Salle annexe — 1er étage',
    emoji: '📖',
    color: '#F59E0B',
    description: 'Étude biblique interactive sur le livre des Actes. Apportez votre Bible et un carnet. Un moment convivial avec goûter partagé est prévu après l\'étude.',
    organizer: 'Responsable jeunesse — Claire',
    attendees: 15,
  },
];

/* Notifications feed (mock) */
const NOTIFS = [
  { id: 1,  type: 'prayer',    avatar:'👩🏽', name:'Marie Dupont',    time:'Il y a 5 min',   text:'a prié pour votre requête 🙏',                        unread: true  },
  { id: 2,  type: 'comment',   avatar:'👨🏿', name:'Pasteur Samuel', time:'Il y a 20 min',  text:'a commenté votre publication',                        unread: true  },
  { id: 3,  type: 'church',    avatar:'⛪',  name:'Église Béthel',   time:'Il y a 1h',     text:'a publié une nouvelle annonce : "Culte de Pâques"',   unread: true  },
  { id: 4,  type: 'prayer',    avatar:'👩🏾', name:'Esther Mbeki',   time:'Il y a 2h',     text:'a rejoint votre cercle de prière',                     unread: false },
  { id: 5,  type: 'like',      avatar:'👨🏻', name:'Thomas Bernard', time:'Il y a 3h',     text:'a aimé votre témoignage',                             unread: false },
  { id: 6,  type: 'church',    avatar:'⛪',  name:'Église Béthel',   time:'Il y a 5h',     text:'a répondu à votre prière',                            unread: false },
  { id: 7,  type: 'comment',   avatar:'👩🏽', name:'Marie Dupont',    time:'Hier',          text:'a mentionné vous dans un commentaire',                 unread: false },
  { id: 8,  type: 'prayer',    avatar:'👨🏾', name:'Lucas Okafor',   time:'Hier',          text:'prie pour vous 🙏',                                   unread: false },
];

/* ── Helpers ── */
function daysUntil(date) {
  const diff = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
  return diff;
}

function formatDate(date) {
  return date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
}

function formatDateLong(date) {
  return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

const TYPE_ICON = {
  prayer:  '🙏',
  comment: '💬',
  church:  '⛪',
  like:    '❤️',
};

/* ── Event card épinglé ── */
function PinnedEventCard({ event, onClick }) {
  const days = daysUntil(event.date);
  const urgency = days <= 2 ? 'urgent' : days <= 7 ? 'soon' : 'normal';

  return (
    <div className="notif-event-card" onClick={() => onClick(event)}>
      <div className="notif-event-emoji" style={{ background: event.color + '22' }}>
        {event.emoji}
      </div>
      <div className="notif-event-info">
        <span className="notif-event-title">{event.title}</span>
        <span className="notif-event-meta">{formatDate(event.date)} · {event.time}</span>
        <span className="notif-event-location">📍 {event.location}</span>
      </div>
      <div className={`notif-event-countdown ${urgency}`}>
        <span className="notif-event-days">{days}</span>
        <span className="notif-event-days-label">jours</span>
      </div>
    </div>
  );
}

/* ── Event Detail Bottom Sheet ── */
function EventDetailSheet({ event, onClose, onCancel }) {
  const days = daysUntil(event.date);
  const urgency = days <= 2 ? 'urgent' : days <= 7 ? 'soon' : 'normal';
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="event-detail-overlay" onClick={onClose}>
      <div className="event-detail-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Drag handle */}
        <div className="event-detail-handle" />

        {/* Header with emoji + title */}
        <div className="event-detail-hero">
          <div
            className="event-detail-emoji"
            style={{ background: event.color + '18', color: event.color }}
          >
            {event.emoji}
          </div>
          <div className="event-detail-header-info">
            <h2 className="event-detail-title">{event.title}</h2>
            <span className="event-detail-church">{event.church}</span>
          </div>
        </div>

        {/* Info pills */}
        <div className="event-detail-pills">
          <div className="event-detail-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
            </svg>
            <span>{formatDateLong(event.date)}</span>
          </div>
          <div className="event-detail-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>{event.time}</span>
          </div>
          <div className="event-detail-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            <span>{event.location}</span>
          </div>
        </div>

        {/* Countdown badge */}
        <div className={`event-detail-countdown-strip ${urgency}`}>
          <span className="event-detail-countdown-icon">⏰</span>
          <span className="event-detail-countdown-text">
            {days <= 1 ? 'C\'est demain !' : `Dans ${days} jours`}
          </span>
        </div>

        {/* Description */}
        <div className="event-detail-section">
          <h3 className="event-detail-section-title">Description</h3>
          <p className="event-detail-description">{event.description}</p>
        </div>

        {/* Organizer + attendees */}
        <div className="event-detail-meta-row">
          <div className="event-detail-meta-item">
            <span className="event-detail-meta-label">Organisateur</span>
            <span className="event-detail-meta-value">{event.organizer}</span>
          </div>
          <div className="event-detail-meta-item">
            <span className="event-detail-meta-label">Inscrits</span>
            <span className="event-detail-meta-value">{event.attendees} personnes</span>
          </div>
        </div>

        {/* Actions */}
        <div className="event-detail-actions">
          {!showConfirm ? (
            <>
              <button className="event-detail-btn-primary" onClick={onClose}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Inscrit(e)
              </button>
              <button className="event-detail-btn-cancel" onClick={() => setShowConfirm(true)}>
                Annuler mon inscription
              </button>
            </>
          ) : (
            <div className="event-detail-confirm">
              <p className="event-detail-confirm-text">
                Voulez-vous vraiment annuler votre inscription ?
              </p>
              <div className="event-detail-confirm-btns">
                <button
                  className="event-detail-btn-keep"
                  onClick={() => setShowConfirm(false)}
                >
                  Non, rester inscrit(e)
                </button>
                <button
                  className="event-detail-btn-remove"
                  onClick={() => onCancel(event.id)}
                >
                  Oui, annuler
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Notification row ── */
function NotifRow({ notif, onClick }) {
  return (
    <div
      className={`notif-row ${notif.unread ? 'unread' : ''}`}
      onClick={() => onClick(notif)}
      style={{ cursor: 'pointer' }}
    >
      <div className="notif-avatar-wrap">
        <span className="notif-avatar">{notif.avatar}</span>
        <span className="notif-type-badge">{TYPE_ICON[notif.type]}</span>
      </div>
      <div className="notif-content">
        <p className="notif-text">
          <strong>{notif.name}</strong> {notif.text}
        </p>
        <span className="notif-time">{notif.time}</span>
      </div>
      {notif.unread && <div className="notif-dot" />}
      <svg className="notif-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 18 6-6-6-6"/>
      </svg>
    </div>
  );
}

/* ── Page principale ── */
export default function Notifications() {
  const navigate = useNavigate();
  const unreadCount = NOTIFS.filter(n => n.unread).length;
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleCancelEvent = (eventId) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
    setSelectedEvent(null);
  };

  const handleNotifClick = (notif) => {
    if (notif.type === 'church') {
      navigate('/community/bethel');
    } else {
      navigate('/feed');
    }
  };

  return (
    <div className="notif-frame">
      <div className="notif-scroll-area">
        <AppHeader title="Activité" showActions={false} />

        {/* ── Section épinglée : mes événements ── */}
        <div className="notif-section">
          <div className="notif-section-header">
            <span className="notif-section-title">📌 Mes événements</span>
            <span className="notif-section-count">{events.length} à venir</span>
          </div>
          <div className="notif-events-list">
            {events.map(e => (
              <PinnedEventCard
                key={e.id}
                event={e}
                onClick={setSelectedEvent}
              />
            ))}
            {events.length === 0 && (
              <div className="notif-events-empty">
                <span>📅</span>
                <p>Aucun événement à venir</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Section notifications ── */}
        <div className="notif-section">
          <div className="notif-section-header">
            <span className="notif-section-title">🔔 Notifications</span>
            {unreadCount > 0 && (
              <span className="notif-section-badge">{unreadCount} nouvelles</span>
            )}
          </div>
          <div className="notif-feed">
            {NOTIFS.map(n => <NotifRow key={n.id} notif={n} onClick={handleNotifClick} />)}
          </div>
        </div>

        <div style={{ height: 24 }} />
      </div>

      {/* ── Event Detail Bottom Sheet ── */}
      {selectedEvent && (
        <EventDetailSheet
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onCancel={handleCancelEvent}
        />
      )}
    </div>
  );
}
