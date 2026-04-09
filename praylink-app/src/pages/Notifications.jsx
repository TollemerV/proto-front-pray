import AppHeader from '../components/AppHeader';
import '../styles/Notifications.css';

/* ── Événements inscrits (mock) ─────────────────────────────────
   On calcule "dans X jours" relativement à aujourd'hui.
   Les dates sont définies en offset depuis now for demo purposes.
─────────────────────────────────────────────────────────────── */
const today = new Date();
const addDays = (d) => { const r = new Date(today); r.setDate(r.getDate() + d); return r; };

const MY_EVENTS = [
  {
    id: 1,
    title: 'Soirée de louange & adoration',
    church: 'Église Béthel Paris',
    date: addDays(2),
    time: '19h30',
    location: 'Salle principale',
    emoji: '🎶',
    color: 'var(--accent-pray)',
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

const TYPE_ICON = {
  prayer:  '🙏',
  comment: '💬',
  church:  '⛪',
  like:    '❤️',
};

/* ── Event card épinglé ── */
function PinnedEventCard({ event }) {
  const days = daysUntil(event.date);
  const urgency = days <= 2 ? 'urgent' : days <= 7 ? 'soon' : 'normal';

  return (
    <div className="notif-event-card">
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

/* ── Notification row ── */
function NotifRow({ notif }) {
  return (
    <div className={`notif-row ${notif.unread ? 'unread' : ''}`}>
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
    </div>
  );
}

/* ── Page principale ── */
export default function Notifications() {
  const unreadCount = NOTIFS.filter(n => n.unread).length;

  return (
    <>
      <AppHeader title="Activité" showActions={false} />

      {/* ── Section épinglée : mes événements ── */}
      <div className="notif-section">
        <div className="notif-section-header">
          <span className="notif-section-title">📌 Mes événements</span>
          <span className="notif-section-count">{MY_EVENTS.length} à venir</span>
        </div>
        <div className="notif-events-list">
          {MY_EVENTS.map(e => <PinnedEventCard key={e.id} event={e} />)}
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
          {NOTIFS.map(n => <NotifRow key={n.id} notif={n} />)}
        </div>
      </div>

      <div style={{ height: 24 }} />
    </>
  );
}
