import { useNavigate } from 'react-router-dom';
import { Icons } from '../../components/church/ChurchIcons';

export default function ChurchEvents() {
  const navigate = useNavigate();

  const events = [
    { title: 'Soirée de louange & adoration', date: '02 Avril', inscrits: 142, statut: 'À venir', color: 'var(--accent-blue-light)' },
    { title: 'Culte de Pâques', date: '06 Avril', inscrits: 310, statut: 'À venir', color: 'var(--accent-pray-light)' },
    { title: 'Groupe de jeunes — Bible study', date: '10 Avril', inscrits: 45, statut: 'À venir', color: 'var(--accent-gold-light)' }
  ];

  return (
    <div className="church-page-container">
      
      <div className="church-page-header">
        <button onClick={() => navigate('/church')} className="church-back-btn">
          <Icons.ArrowLeft size={20} />
        </button>
        <div className="church-page-title-group">
          <h1 className="church-page-title">Événements</h1>
          <p className="church-page-subtitle">Gérez le calendrier de l'église</p>
        </div>
      </div>

      <button className="church-create-btn">
        <Icons.Plus size={18} />
        Créer un événement
      </button>

      <div className="church-list">
        {events.map((e, i) => (
          <div key={i} className="church-item-card" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div className="church-icon-wrapper" style={{ backgroundColor: e.color }}>
                <Icons.Calendar stroke={e.color.replace('-light', '')} />
              </div>
              <div className="church-item-content">
                <div className="church-item-title">{e.title}</div>
                <div className="church-item-info">
                  <Icons.Calendar size={14} />
                  {e.date} • {e.statut}
                </div>
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '12px', 
              backgroundColor: 'var(--bg-primary)', 
              borderRadius: '12px',
              marginTop: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                 <Icons.Users size={18} stroke="var(--text-secondary)" />
                 <span style={{ fontWeight: '700', fontSize: '13px' }}>{e.inscrits} participants</span>
              </div>
              <button className="church-action-btn church-action-btn-primary">Contacter</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
