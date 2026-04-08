import { useState } from 'react';
import { Icons } from '../../components/church/ChurchIcons';

function PrayerCard({ author, time, text, prayers, color, initialAnswered }) {
  const [answered, setAnswered] = useState(initialAnswered);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleMarkAnswered = () => {
    setAnswered(true);
    setReplyOpen(false);
  };

  return (
    <div className={`ch-prayer-card ${answered ? 'ch-prayer-done' : 'ch-prayer-pending'}`}>
      {/* ── Header ── */}
      <div className="ch-prayer-top">
        <div className="ch-prayer-author-row">
          <div className="ch-prayer-avatar" style={{ backgroundColor: color }}>
            {author[0]}
          </div>
          <div>
            <span className="ch-prayer-author">{author}</span>
            <span className="ch-prayer-time">{time}</span>
          </div>
        </div>
        {answered
          ? <span className="ch-prayer-badge badge-done">Exaucée ✨</span>
          : <span className="ch-prayer-badge badge-pending">Sans réponse</span>
        }
      </div>

      {/* ── Text ── */}
      <p className="ch-prayer-text">{text}</p>

      {/* ── Footer ── */}
      <div className="ch-prayer-footer">
        <span className="ch-prayer-count">
          <Icons.Heart size={14} stroke="var(--accent-pray)" style={{ marginRight: 4 }} />
          {prayers} prient
        </span>

        {!answered && (
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

      {/* ── Reply box (inline) ── */}
      {replyOpen && !answered && (
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
              onClick={() => { setReplyOpen(false); setReplyText(''); }}
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

export default function ChurchPrayers() {
  const requests = [
    { author: 'Marie Dupont',  time: 'Il y a 30 min', text: 'Priez pour la guérison de mon père qui est hospitalisé.', prayers: 127, color: 'var(--accent-pray-light)',  initialAnswered: false },
    { author: 'Thomas Bernard', time: 'Il y a 2h',    text: 'Je cherche un logement à Paris depuis 3 mois. Prions ensemble 🏠', prayers: 23, color: 'var(--accent-blue-light)', initialAnswered: false },
    { author: 'Esther M.',     time: 'Il y a 4h',    text: 'Merci pour vos prières, ma maman va mieux ! 🙌', prayers: 89, color: 'var(--accent-green-light)', initialAnswered: true  },
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
        {requests.map((r, i) => (
          <PrayerCard key={i} {...r} />
        ))}
      </div>
    </div>
  );
}
