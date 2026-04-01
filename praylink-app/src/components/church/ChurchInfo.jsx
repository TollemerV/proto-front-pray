import { useState } from 'react';

export default function ChurchInfo() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="church-info">
      <div className="church-icon-container">⛪</div>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <h1 className="church-name">
          Église Béthel Paris
          <button 
            className="info-bubble-btn"
            onMouseEnter={() => setShowInfo(true)}
            onMouseLeave={() => setShowInfo(false)}
            onClick={() => setShowInfo(!showInfo)}
            aria-label="Plus d'informations"
            style={{ position: 'relative' }}
          >
            i
            {showInfo && (
              <div className="church-info-tooltip">
                <div className="church-location" style={{ marginBottom: '6px', fontSize: '13px', whiteSpace: 'nowrap' }}>📍 Paris, 11e arrondissement</div>
                <div className="church-location" style={{ marginBottom: 0, fontSize: '13px', whiteSpace: 'nowrap' }}>📅 Culte le dimanche à 10h00</div>
              </div>
            )}
          </button>
        </h1>
      </div>

      <p className="church-slogan">"Une famille pour grandir ensemble dans la présence de Dieu."</p>
      
      <div className="church-indicators-group">
        <div className="church-live-indicator">
          <span className="live-dot"></span>
          <span className="live-text">4 membres actifs en ce moment</span>
        </div>
        <div className="church-prayer-indicator">
          <span className="prayer-text">🙏 89 prières cette semaine</span>
        </div>
      </div>

      <div className="church-stats" style={{ marginTop: '16px' }}>
        <div className="church-stat">
          <span className="church-stat-value">1,247</span>
          <span className="church-stat-label">Membres</span>
        </div>
        <div className="church-stat">
          <span className="church-stat-value">89</span>
          <span className="church-stat-label">Prières</span>
        </div>
        <div className="church-stat">
          <span className="church-stat-value">12</span>
          <span className="church-stat-label">Événements</span>
        </div>
      </div>
      <div className="church-actions">
        <button className="church-btn primary">✝ Rejoindre</button>
        <button className="church-btn secondary">💛 Faire un don</button>
      </div>
    </div>
  );
}
