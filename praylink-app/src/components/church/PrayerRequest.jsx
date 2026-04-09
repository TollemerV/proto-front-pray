import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppIcons } from '../Icons';

export default function PrayerRequest({ avatar, avatarBg, name, time, text, count, status = 'en_cours' }) {
  const [prayed, setPrayed] = useState(false);
  const [prayerCount, setPrayerCount] = useState(count);
  const [prayAnimate, setPrayAnimate] = useState(false);
  const navigate = useNavigate();

  const handlePray = () => {
    if (!prayed) {
      setPrayed(true);
      setPrayerCount(prayerCount + 1);
      setPrayAnimate(true);
      setTimeout(() => setPrayAnimate(false), 400);
    } else {
      setPrayed(false);
      setPrayerCount(prayerCount - 1);
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
        <button className="prayer-evolution-btn" onClick={() => navigate('/prayer/1')}>
          Voir l'évolution <AppIcons.More size={16} style={{ transform: 'rotate(90deg)' }} />
        </button>
      </div>

      <div className="prayer-request-footer">
        <div className="prayer-count-group">
          <AppIcons.Prayer size={18} stroke="var(--accent-pray)" fill="rgba(123, 104, 238, 0.1)" />
          <span className="prayer-count">{prayerCount} personnes prient</span>
        </div>
        <button
          className={`pray-modern-btn ${prayed ? 'active' : ''}`}
          onClick={handlePray}
        >
          <AppIcons.Prayer 
            size={22} 
            stroke={prayed ? "var(--accent-pray)" : "var(--text-secondary)"}
            fill={prayed ? "var(--accent-pray)" : "none"}
            className={prayAnimate ? 'pray-animate' : ''}
          />
        </button>
      </div>
    </div>
  );
}
