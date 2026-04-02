import { useNavigate } from 'react-router-dom';
import { Icons } from '../../components/church/ChurchIcons';

export default function ChurchMembers() {
  const navigate = useNavigate();

  const members = [
    { name: 'Marie Dupont', status: 'Actif', avatar: '👩🏽', lastSeen: 'Hier', color: 'var(--accent-blue-light)' },
    { name: 'Thomas Bernard', status: 'Inactif', avatar: '👨🏻', lastSeen: 'Il y a 3 mois', color: 'var(--accent-gold-light)' },
    { name: 'Esther Mbeki', status: 'Actif', avatar: '👩🏾', lastSeen: 'Aujourd\'hui', color: 'var(--accent-pray-light)' },
    { name: 'Jean-Christophe L.', status: 'Actif', avatar: '👨🏼', lastSeen: 'Il y a 2h', color: 'var(--accent-green-light)' },
  ];

  return (
    <div className="church-page-container">
      
      <div className="church-page-header">
        <button onClick={() => navigate('/church')} className="church-back-btn">
          <Icons.ArrowLeft size={20} />
        </button>
        <div className="church-page-title-group">
          <h1 className="church-page-title">Membres</h1>
          <p className="church-page-subtitle">248 membres enregistrés</p>
        </div>
      </div>

      <div className="church-stat-grid-modern">
        <div className="church-stat-pill">
          <div className="church-stat-pill-icon" style={{ background: 'var(--accent-green-light)' }}>
            <Icons.Plus size={18} stroke="var(--accent-green)" />
          </div>
          <div>
            <div className="church-stat-pill-value">+12</div>
            <div className="church-stat-pill-label">Cette semaine</div>
          </div>
        </div>
        <div className="church-stat-pill">
          <div className="church-stat-pill-icon" style={{ background: 'var(--accent-red-light)' }}>
            <Icons.Activity size={18} stroke="var(--accent-red)" />
          </div>
          <div>
            <div className="church-stat-pill-value">3</div>
            <div className="church-stat-pill-label">Inactifs</div>
          </div>
        </div>
      </div>

      <div className="church-list">
        {members.map((m, i) => (
          <div key={i} className="church-item-card">
            <div className="church-icon-wrapper" style={{ backgroundColor: m.color, fontSize: '24px' }}>
              {m.avatar}
            </div>
            <div className="church-item-content">
              <div className="church-item-title">{m.name}</div>
              <div className="church-item-info">
                <span style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  backgroundColor: m.status === 'Actif' ? 'var(--accent-green)' : 'var(--text-tertiary)',
                  display: 'inline-block'
                }}></span>
                {m.status} • {m.lastSeen}
              </div>
            </div>
            
            <div className="church-item-actions">
              <button className="church-action-btn church-action-btn-secondary">Profil</button>
              <button className="church-action-btn church-action-btn-primary">Contacter</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
