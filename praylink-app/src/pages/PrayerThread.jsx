import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PrayerThread.css';

export default function PrayerThread() {
  const navigate = useNavigate();
  const [prayed, setPrayed] = useState(false);

  const handlePray = () => {
    setPrayed(true);
  };

  return (
    <div className="prayer-thread-page">
      {/* Header */}
      <div className="thread-header">
        <button className="thread-back-btn" onClick={() => navigate(-1)}>
          <span className="icon">←</span>
          <span>Retour</span>
        </button>
        <span className="thread-header-title">Requête de prière</span>
      </div>

      <div className="thread-content">
        {/* Initial Post */}
        <div className="thread-initial-post">
          <div className="post-author-row">
            <div className="post-avatar" style={{ background: 'var(--accent-blue-light)' }}>👩🏽</div>
            <div className="post-author-info">
              <span className="post-author-name">Marie Dupont</span>
              <span className="post-time">Hier à 14:30</span>
            </div>
          </div>
          <div className="post-text">
            Priez pour la guérison de mon père qui est hospitalisé. Merci pour votre soutien 🙏
          </div>
          <div className="post-status-badge en_cours">🟡 En cours</div>
        </div>

        {/* Timeline */}
        <div className="timeline-container">
          
          <div className="timeline-item system-event">
            <div className="timeline-dot system"></div>
            <div className="timeline-content">
              <span className="system-text">🙏 45 personnes ont rejoint la prière</span>
            </div>
          </div>

          <div className="timeline-item user-update">
            <div className="timeline-dot user">👩🏽</div>
            <div className="timeline-content">
              <div className="update-author">Marie (mise à jour) <span className="update-time">Hier à 19:15</span></div>
              <div className="update-text">Merci tout le monde, il va un peu mieux aujourd’hui 🙏</div>
            </div>
          </div>

          <div className="timeline-item system-event">
            <div className="timeline-dot system"></div>
            <div className="timeline-content">
              <span className="system-text">🔥 127 personnes prient maintenant</span>
            </div>
          </div>

          <div className="timeline-item user-update">
            <div className="timeline-dot user">👩🏽</div>
            <div className="timeline-content">
              <div className="update-author">Marie (mise à jour) <span className="update-time">Ce matin à 09:00</span></div>
              <div className="update-text">L’opération s’est très bien passée ❤️ Dieu est bon !</div>
            </div>
          </div>

          <div className="timeline-item final-status">
            <div className="timeline-dot final"></div>
            <div className="timeline-content">
              <div className="final-status-badge">
                🟢 Prière exaucée
              </div>
            </div>
          </div>

        </div>

        {/* Espace pour ne pas cacher la fin par la barre collante */}
        <div className="thread-bottom-spacer"></div>
      </div>

      {/* Sticky Actions Footer */}
      <div className="thread-sticky-footer">
        <button 
          className={`sticky-btn primary ${prayed ? 'prayed' : ''}`}
          onClick={handlePray}
        >
          {prayed ? '✓ Prié' : '🙏 Je prie'}
        </button>
        <button className="sticky-btn secondary">💬 Message</button>
      </div>
    </div>
  );
}
