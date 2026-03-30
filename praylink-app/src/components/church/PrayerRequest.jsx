import { useState } from 'react';

export default function PrayerRequest({ avatar, avatarBg, name, time, text, count }) {
  const [prayed, setPrayed] = useState(false);
  const [prayerCount, setPrayerCount] = useState(count);

  const handlePray = () => {
    if (!prayed) {
      setPrayed(true);
      setPrayerCount(prayerCount + 1);
    }
  };

  return (
    <div className="prayer-request">
      <div className="prayer-request-header">
        <div className="prayer-request-avatar" style={{ background: avatarBg }}>{avatar}</div>
        <div>
          <div className="prayer-request-name">{name}</div>
          <div className="prayer-request-time">{time}</div>
        </div>
      </div>
      <div className="prayer-request-text">{text}</div>
      <div className="prayer-request-footer">
        <span className="prayer-count">🙏 {prayerCount} personnes prient</span>
        <button
          className="pray-small-btn"
          onClick={handlePray}
          style={prayed ? { background: 'var(--accent-pray)', color: 'white' } : {}}
        >
          {prayed ? '✓ Prié' : '🙏 Prier'}
        </button>
      </div>
    </div>
  );
}
