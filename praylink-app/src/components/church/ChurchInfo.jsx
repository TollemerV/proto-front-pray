export default function ChurchInfo() {
  return (
    <div className="church-info">
      <div className="church-icon-container">⛪</div>
      <h1 className="church-name">Église Béthel Paris</h1>
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

      <div className="church-location" style={{ marginBottom: '6px' }}>📍 Paris, 11e arrondissement</div>
      <div className="church-location">📅 Culte le dimanche à 10h00</div>
      <div className="church-stats">
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
