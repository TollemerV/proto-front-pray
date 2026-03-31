import { useState } from 'react';

export default function PrayerRequest({ avatar, avatarBg, name, time, text, count, status = 'en_cours' }) {
  const [prayed, setPrayed] = useState(false);
  const [prayerCount, setPrayerCount] = useState(count);

  const handlePray = () => {
    if (!prayed) {
      setPrayed(true);
      setPrayerCount(prayerCount + 1);
    }
  };

  const statusLabel = status === 'exaucee' ? '🟢 Exaucée' : '🟡 En cours';

  return (
    <div className={`prayer-request status-${status}`}>
      <div className="prayer-request-header">
        <div className="prayer-request-avatar" style={{ background: avatarBg }}>{avatar}</div>
        <div className="prayer-request-info-wrapper">
          <div className="prayer-request-name-row">
            <span className="prayer-request-name">{name}</span>
            <span className={`prayer-status-badge ${status}`}>{statusLabel}</span>
          </div>
          <div className="prayer-request-time">{time}</div>
        </div>
      </div>
      <div className="prayer-request-text">{text}</div>
      
      <div className="prayer-request-actions-row">
        <button className="prayer-evolution-btn">
          Voir l'évolution <span className="arrow-right">→</span>
        </button>
      </div>

      <div className="prayer-request-footer">
        <span className="prayer-count">🙏 {prayerCount} personnes prient avec toi</span>
        <button
          className={`pray-small-btn ${prayed ? 'prayed' : ''}`}
          onClick={handlePray}
        >
          {prayed ? '✓ Prié' : '🙏 Soutenir'}
        </button>
      </div>
    </div>
  );
}
