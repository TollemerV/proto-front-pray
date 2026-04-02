import { useNavigate } from 'react-router-dom';
import { Icons } from '../../components/church/ChurchIcons';

export default function ChurchPrayers() {
  const navigate = useNavigate();

  const requests = [
    { author: 'Marie Dupont', time: 'Il y a 30 min', text: 'Priez pour la guérison de mon père qui est hospitalisé.', prayers: 127, color: 'var(--accent-pray-light)' },
    { author: 'Thomas Bernard', time: 'Il y a 2h', text: 'Je cherche un logement à Paris depuis 3 mois. Prions ensemble 🏠', prayers: 23, color: 'var(--accent-blue-light)' }
  ];

  return (
    <div className="church-page-container">
      
      <div className="church-page-header">
        <button onClick={() => navigate('/church')} className="church-back-btn">
          <Icons.ArrowLeft size={20} />
        </button>
        <div className="church-page-title-group">
          <h1 className="church-page-title">Prières</h1>
          <p className="church-page-subtitle">Modérez et accompagnez les requêtes</p>
        </div>
      </div>

      <div className="church-stat-grid-modern">
        <div className="church-stat-pill">
          <div className="church-stat-pill-icon" style={{ background: 'var(--accent-pray-light)' }}>
            <Icons.Prayer size={18} stroke="var(--accent-pray)" />
          </div>
          <div>
            <div className="church-stat-pill-value">14</div>
            <div className="church-stat-pill-label">Actives</div>
          </div>
        </div>
        <div className="church-stat-pill">
          <div className="church-stat-pill-icon" style={{ background: 'var(--accent-gold-light)' }}>
            <Icons.Alert size={18} stroke="var(--accent-gold)" />
          </div>
          <div>
            <div className="church-stat-pill-value">5</div>
            <div className="church-stat-pill-label">À répondre</div>
          </div>
        </div>
      </div>

      <div className="church-list">
        {requests.map((r, i) => (
          <div key={i} className="church-item-card" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="church-icon-wrapper" style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: r.color, fontSize: '14px' }}>
                  {r.author[0]}
                </div>
                <div style={{ fontWeight: '800', fontSize: '14px', color: 'var(--text-primary)' }}>{r.author}</div>
              </div>
              <div style={{ color: 'var(--text-tertiary)', fontSize: '12px', fontWeight: '500' }}>{r.time}</div>
            </div>
            
            <p style={{ fontSize: '15px', marginBottom: '16px', lineHeight: '1.5', color: 'var(--text-primary)' }}>{r.text}</p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--accent-pray)', fontWeight: '800', fontSize: '13px' }}>
              <Icons.Prayer size={16} />
              {r.prayers} personnes prient
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="church-action-btn church-action-btn-secondary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Icons.Message size={14} />
                Répondre
              </button>
              <button className="church-action-btn church-action-btn-primary" style={{ flex: 1, backgroundColor: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Icons.Check size={14} />
                Exaucée
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
