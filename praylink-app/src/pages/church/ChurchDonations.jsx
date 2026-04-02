import { useNavigate } from 'react-router-dom';
import { Icons } from '../../components/church/ChurchIcons';

export default function ChurchDonations() {
  const navigate = useNavigate();

  const history = [
    { name: 'Anonyme', date: 'Aujourd\'hui', amount: '50 €', color: 'var(--accent-blue-light)' },
    { name: 'Thomas Bernard', date: 'Hier', amount: '120 €', color: 'var(--accent-gold-light)' },
    { name: 'Famille L.', date: 'Le 04 Avril', amount: '500 €', color: 'var(--accent-pray-light)' }
  ];

  return (
    <div className="church-page-container">
      
      <div className="church-page-header">
        <button onClick={() => navigate('/church')} className="church-back-btn">
          <Icons.ArrowLeft size={20} />
        </button>
        <div className="church-page-title-group">
          <h1 className="church-page-title">Dons (Avril)</h1>
          <p className="church-page-subtitle">Suivi de la générosité</p>
        </div>
      </div>

      <div style={{ background: 'linear-gradient(135deg, var(--accent-gold), #B8860B)', color: 'white', padding: '32px 24px', borderRadius: '24px', boxShadow: 'var(--shadow-lg)', marginBottom: '32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.1 }}>
          <Icons.Wallet size={120} />
        </div>
        <div style={{ fontSize: '14px', marginBottom: '8px', opacity: 0.9, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Total récolté</div>
        <div style={{ fontSize: '48px', fontWeight: '800', letterSpacing: '-1px' }}>3 450 €</div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 16px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '20px', marginTop: '16px', fontSize: '13px', fontWeight: '800' }}>
           <Icons.Check size={14} />
           85% de l'objectif
        </div>
      </div>

      <h2 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', color: 'var(--text-primary)' }}>Derniers dons</h2>
      
      <div className="church-list">
        {history.map((h, i) => (
          <div key={i} className="church-item-card" style={{ justifyContent: 'space-between' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
               <div className="church-icon-wrapper" style={{ backgroundColor: h.color }}>
                 <Icons.Wallet stroke={h.color.replace('-light', '')} />
               </div>
               <div>
                 <div className="church-item-title" style={{ marginBottom: '2px' }}>{h.name}</div>
                 <div className="church-item-info">
                   <Icons.Calendar size={12} />
                   {h.date}
                 </div>
               </div>
             </div>
             <div style={{ fontWeight: '800', fontSize: '17px', color: 'var(--accent-green)' }}>+{h.amount}</div>
          </div>
        ))}
      </div>
      
    </div>
  );
}
