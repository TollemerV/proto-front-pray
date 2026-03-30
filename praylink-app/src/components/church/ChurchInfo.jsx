export default function ChurchInfo() {
  return (
    <div className="church-info">
      <div className="church-icon-container">⛪</div>
      <h1 className="church-name">Église Béthel Paris</h1>
      <div className="church-location">📍 Paris, 11e arrondissement</div>
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
