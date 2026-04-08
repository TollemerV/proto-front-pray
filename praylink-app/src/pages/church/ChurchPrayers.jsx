import { useState } from 'react';
import { Icons } from '../../components/church/ChurchIcons';

/* ─────────────────────────────────────────
   Prayer Thread Modal (inline dans le dashboard)
───────────────────────────────────────── */
function PrayerThreadModal({ prayer, onClose }) {
  return (
    <div className="cpt-overlay" onClick={onClose}>
      <div className="cpt-modal" onClick={e => e.stopPropagation()}>

        {/* Handle */}
        <div className="cpt-handle" />

        {/* Top bar */}
        <div className="cpt-topbar">
          <button className="cpt-close" onClick={onClose}>‹ Retour</button>
          <span className="cpt-title">Suivi de prière</span>
          <span />
        </div>

        {/* Initial post */}
        <div className={`cpt-initial-post ${prayer.status}`}>
          <div className="cpt-post-author-row">
            <div className="cpt-avatar" style={{ backgroundColor: prayer.color }}>{prayer.author[0]}</div>
            <div>
              <span className="cpt-author">{prayer.author}</span>
              <span className="cpt-time">{prayer.time}</span>
            </div>
          </div>
          <p className="cpt-post-text">{prayer.text}</p>
          <div className={`cpt-status-badge ${prayer.status}`}>{prayer.statusLabel}</div>
        </div>

        {/* Timeline */}
        <div className="cpt-timeline">
          {prayer.timeline.map((item, i) => (
            <div key={i} className={`cpt-timeline-item ${item.type}`}>
              <div className={`cpt-timeline-dot ${item.type}`}>
                {item.type === 'system' && <Icons.Prayer size={12} stroke="var(--accent-pray)" />}
                {item.type === 'user'   && <span style={{ fontSize: 13 }}>{item.avatar}</span>}
                {item.type === 'church' && <Icons.Check size={11} stroke="white" />}
                {item.type === 'final'  && <Icons.Check size={11} stroke="white" />}
              </div>
              <div className="cpt-timeline-content">
                {item.type === 'system' && (
                  <span className="cpt-system-text">{item.text}</span>
                )}
                {item.type === 'user' && (
                  <>
                    <div className="cpt-update-author">{item.author} <span className="cpt-update-time">{item.time}</span></div>
                    <div className="cpt-update-text">{item.text}</div>
                  </>
                )}
                {item.type === 'church' && (
                  <>
                    <div className="cpt-update-author" style={{ color: 'var(--accent-pray)' }}>
                      ⛪ Église <span className="cpt-update-time">{item.time}</span>
                    </div>
                    <div className="cpt-update-text">{item.text}</div>
                  </>
                )}
                {item.type === 'final' && (
                  <div className="cpt-final-badge">{item.text}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: 24 }} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   PrayerCard
───────────────────────────────────────── */
function PrayerCard({ prayer, onOpenThread }) {
  const { author, time, text, prayers, color, status, initialAnswered, initialReplies } = prayer;

  const [answered, setAnswered] = useState(initialAnswered);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState(initialReplies || []);

  const handleMarkAnswered = () => {
    setAnswered(true);
    setReplyOpen(false);
  };

  const handleSend = () => {
    if (!replyText.trim()) return;
    setReplies(prev => [...prev, {
      author: 'Pasteur Emmanuel',
      avatar: 'PE',
      time: 'À l\'instant',
      text: replyText.trim(),
    }]);
    setReplyText('');
    setReplyOpen(false);
  };

  const badgeLabel = status === 'en_cours' ? '🟡 En cours'
    : answered ? 'Exaucée ✨' : 'Sans réponse';
  const badgeClass = status === 'en_cours' ? 'badge-in-progress'
    : answered ? 'badge-done' : 'badge-pending';

  return (
    <div className={`ch-prayer-card ${answered ? 'ch-prayer-done' : status === 'en_cours' ? 'ch-prayer-in-progress' : 'ch-prayer-pending'}`}>

      {/* ── Header cliquable → thread ── */}
      <div
        className="ch-prayer-top ch-prayer-top-clickable"
        onClick={() => onOpenThread(prayer)}
        title="Voir le suivi"
      >
        <div className="ch-prayer-author-row">
          <div className="ch-prayer-avatar" style={{ backgroundColor: color }}>
            {author[0]}
          </div>
          <div>
            <span className="ch-prayer-author">{author}</span>
            <span className="ch-prayer-time">{time}</span>
          </div>
        </div>
        <span className={`ch-prayer-badge ${badgeClass}`}>{badgeLabel}</span>
      </div>

      {/* ── Text cliquable → thread ── */}
      <p
        className="ch-prayer-text"
        onClick={() => onOpenThread(prayer)}
        style={{ cursor: 'pointer' }}
      >
        {text}
      </p>

      {/* ── Replies (commentaires) ── */}
      {replies.length > 0 && (
        <div className="ch-prayer-replies">
          {replies.map((r, i) => (
            <div key={i} className="ch-reply-item">
              <div className="ch-reply-avatar">{r.avatar}</div>
              <div className="ch-reply-body">
                <div className="ch-reply-author-row">
                  <span className="ch-reply-author">{r.author}</span>
                  <span className="ch-reply-time">{r.time}</span>
                </div>
                <p className="ch-reply-text">{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Footer ── */}
      <div className="ch-prayer-footer">
        <span className="ch-prayer-count">
          <Icons.Heart size={14} stroke="var(--accent-pray)" style={{ marginRight: 4 }} />
          {prayers} prient
        </span>

        {/* Boutons selon statut */}
        {status === 'en_cours' && !answered && (
          <div className="ch-prayer-btns">
            <button
              className={`ch-prayer-btn ch-btn-reply ${replyOpen ? 'active' : ''}`}
              onClick={() => setReplyOpen(o => !o)}
            >
              <Icons.Message size={13} />
              {replyOpen ? 'Annuler' : 'Répondre'}
            </button>
            <button
              className="ch-prayer-btn ch-btn-done"
              onClick={handleMarkAnswered}
            >
              <Icons.Check size={13} />
              Exaucée
            </button>
          </div>
        )}

        {status !== 'en_cours' && !answered && (
          <div className="ch-prayer-btns">
            <button
              className={`ch-prayer-btn ch-btn-reply ${replyOpen ? 'active' : ''}`}
              onClick={() => setReplyOpen(o => !o)}
            >
              <Icons.Message size={13} />
              {replyOpen ? 'Annuler' : 'Répondre'}
            </button>
            <button
              className="ch-prayer-btn ch-btn-done"
              onClick={handleMarkAnswered}
            >
              <Icons.Check size={13} />
              Exaucée
            </button>
          </div>
        )}
      </div>

      {/* ── Reply box ── */}
      {replyOpen && (
        <div className="ch-prayer-reply-box">
          <textarea
            className="ch-prayer-reply-input"
            placeholder="Écrivez votre réponse pastorale…"
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            rows={3}
            autoFocus
          />
          <div className="ch-prayer-reply-actions">
            <button
              className="ch-prayer-reply-send"
              onClick={handleSend}
              disabled={!replyText.trim()}
            >
              <Icons.Check size={14} stroke="white" />
              Envoyer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Page
───────────────────────────────────────── */
export default function ChurchPrayers() {
  const [selectedPrayer, setSelectedPrayer] = useState(null);

  const requests = [
    {
      id: 1,
      author: 'Marie Dupont',
      time: 'Il y a 30 min',
      text: 'Priez pour la guérison de mon père qui est hospitalisé.',
      prayers: 127,
      color: 'var(--accent-pray-light)',
      status: 'pending',
      statusLabel: '🔴 Sans réponse',
      initialAnswered: false,
      initialReplies: [],
      timeline: [
        { type: 'system', text: '127 personnes prient pour cette requête' },
        { type: 'user', avatar: '👩🏽', author: 'Marie (mise à jour)', time: 'Il y a 10 min', text: 'Mon père est en salle d\'opération. Merci pour vos prières 🙏' },
      ],
    },
    {
      id: 2,
      author: 'Thomas Bernard',
      time: 'Il y a 2h',
      text: 'Je cherche un logement à Paris depuis 3 mois. Prions ensemble 🏠',
      prayers: 23,
      color: 'var(--accent-blue-light)',
      status: 'pending',
      statusLabel: '🔴 Sans réponse',
      initialAnswered: false,
      initialReplies: [],
      timeline: [
        { type: 'system', text: '23 personnes prient pour cette requête' },
      ],
    },
    {
      id: 3,
      author: 'Esther M.',
      time: 'Il y a 4h',
      text: 'Merci pour vos prières, ma maman va mieux ! 🙌',
      prayers: 89,
      color: 'var(--accent-green-light)',
      status: 'done',
      statusLabel: '🟢 Exaucée',
      initialAnswered: true,
      initialReplies: [],
      timeline: [
        { type: 'system', text: '89 personnes ont prié pour cette requête' },
        { type: 'church', time: 'Il y a 2h', text: 'Quelle belle nouvelle ! Que Dieu soit loué pour cette guérison 🙏' },
        { type: 'final', text: '🟢 Prière exaucée' },
      ],
    },
    {
      id: 4,
      author: 'Lucas Okafor',
      time: 'Hier',
      text: 'Priez pour ma famille qui traverse une période difficile. Nous avons besoin de paix et de sagesse. 🕊️',
      prayers: 41,
      color: 'rgba(139,92,246,0.15)',
      status: 'en_cours',
      statusLabel: '🟡 En cours',
      initialAnswered: false,
      initialReplies: [
        {
          author: 'Pasteur Emmanuel',
          avatar: 'PE',
          time: 'Il y a 5h',
          text: 'Nous prions avec toi Lucas. Que la paix de Dieu qui surpasse toute intelligence garde ton cœur et tes pensées. Philippiens 4:7 🙏',
        },
      ],
      timeline: [
        { type: 'system', text: '41 personnes prient pour cette requête' },
        { type: 'church', time: 'Il y a 5h', text: 'Nous prions avec toi Lucas. Que la paix de Dieu qui surpasse toute intelligence garde ton cœur et tes pensées. Philippiens 4:7 🙏' },
        { type: 'user', avatar: '👨🏾', author: 'Lucas (mise à jour)', time: 'Il y a 2h', text: 'Merci au Pasteur et à toute la communauté. Nous sentons vos prières ❤️' },
      ],
    },
  ];

  return (
    <div className="ch-tab-page">
      <div className="ch-tab-header">
        <h1 className="ch-tab-title">Prières</h1>
        <p className="ch-tab-subtitle">Modérez et accompagnez les requêtes</p>
      </div>

      <div className="ch-stats-row">
        <div className="ch-stat-pill">
          <div className="ch-stat-pill-icon" style={{ background: 'var(--accent-pray-light)' }}>
            <Icons.Prayer size={18} stroke="var(--accent-pray)" />
          </div>
          <div>
            <div className="ch-stat-pill-value">14</div>
            <div className="ch-stat-pill-label">Actives</div>
          </div>
        </div>
        <div className="ch-stat-pill">
          <div className="ch-stat-pill-icon" style={{ background: 'var(--accent-gold-light)' }}>
            <Icons.Alert size={18} stroke="var(--accent-gold)" />
          </div>
          <div>
            <div className="ch-stat-pill-value">5</div>
            <div className="ch-stat-pill-label">À répondre</div>
          </div>
        </div>
      </div>

      <div className="ch-prayer-list">
        {requests.map((r) => (
          <PrayerCard key={r.id} prayer={r} onOpenThread={setSelectedPrayer} />
        ))}
      </div>

      {/* Thread modal */}
      {selectedPrayer && (
        <PrayerThreadModal
          prayer={selectedPrayer}
          onClose={() => setSelectedPrayer(null)}
        />
      )}
    </div>
  );
}
