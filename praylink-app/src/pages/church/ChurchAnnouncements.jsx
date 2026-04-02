import { useNavigate } from 'react-router-dom';
import { Icons } from '../../components/church/ChurchIcons';

export default function ChurchAnnouncements() {
  const navigate = useNavigate();

  return (
    <div className="church-page-container">
      
      <div className="church-page-header">
        <button onClick={() => navigate('/church')} className="church-back-btn">
          <Icons.ArrowLeft size={20} />
        </button>
        <div className="church-page-title-group">
          <h1 className="church-page-title">Annonces</h1>
          <p className="church-page-subtitle">Communiquez avec votre communauté</p>
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--bg-card)', padding: '24px', borderRadius: '24px', boxShadow: 'var(--shadow-md)', marginBottom: '32px' }}>
        <label style={{ display: 'block', fontWeight: '800', marginBottom: '12px', fontSize: '14px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Audience</label>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <button style={{ flex: 1, padding: '14px', backgroundColor: 'var(--accent-gold-light)', color: 'var(--accent-gold)', border: '2px solid var(--accent-gold)', borderRadius: '14px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '14px' }}>
            <Icons.Home size={18} />
            Eglise
          </button>
          <button style={{ flex: 1, padding: '14px', backgroundColor: 'var(--bg-primary)', color: 'var(--text-secondary)', border: '2px solid transparent', borderRadius: '14px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '14px' }}>
            <Icons.Globe size={18} />
            Public
          </button>
        </div>

        <label style={{ display: 'block', fontWeight: '800', marginBottom: '12px', fontSize: '14px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Message officiel</label>
        <textarea 
          placeholder="Rédigez votre annonce ici..." 
          style={{ width: '100%', minHeight: '140px', padding: '18px', borderRadius: '16px', border: '1px solid var(--border-medium)', fontFamily: 'inherit', fontSize: '16px', marginBottom: '24px', resize: 'vertical', backgroundColor: 'var(--bg-primary)' }}
        />

        <button className="church-create-btn" style={{ marginBottom: 0 }}>
          <Icons.Announce size={20} />
          Publier l'annonce
        </button>
      </div>

      <h2 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', color: 'var(--text-primary)' }}>Historique</h2>
      
      <div className="church-list">
         <div className="church-item-card" style={{ borderLeft: '4px solid var(--accent-gold)', flexDirection: 'column', alignItems: 'stretch' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
             <span style={{ fontWeight: '800', fontSize: '13px', color: 'var(--accent-gold)' }}>Audience : Toute l'église</span>
             <span style={{ color: 'var(--text-tertiary)', fontSize: '12px', fontWeight: '500' }}>Hier</span>
           </div>
           <p style={{ fontSize: '15px', color: 'var(--text-primary)', lineHeight: '1.5' }}>"N'oubliez pas notre soirée de prière exceptionnelle demain à 19h30..."</p>
         </div>
      </div>
      
    </div>
  );
}
