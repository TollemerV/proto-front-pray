import { useNavigate } from 'react-router-dom';

export default function CommunitiesList() {
  const navigate = useNavigate();

  return (
    <div className="communities-index" style={{ padding: '20px', paddingBottom: '120px', backgroundColor: 'var(--bg-primary)', minHeight: '100%', boxSizing: 'border-box' }}>
      <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '24px', color: 'var(--text-primary)' }}>Groupes</h1>
      
      <div className="communities-section" style={{ marginBottom: '32px' }}>
        <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <span style={{ fontSize: '18px' }}>⛪</span> Mes églises
        </h2>
        <div className="community-cards-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          <div className="community-card" onClick={() => navigate('/community/bethel')} style={{ backgroundColor: 'var(--bg-card)', padding: '16px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
             <div className="community-avatar" style={{ minWidth: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--accent-gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>⛪</div>
             <div className="community-info">
               <div style={{ fontWeight: '700', fontSize: '16px', color: 'var(--text-primary)', marginBottom: '4px' }}>Église Béthel Paris</div>
               <div style={{ fontSize: '14px', color: 'var(--accent-blue)', fontWeight: '600' }}>12 nouveaux posts</div>
             </div>
          </div>

        </div>
      </div>

      <div className="communities-section">
        <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <span style={{ fontSize: '18px' }}>👥</span> Mes groupes
        </h2>
        <div className="community-cards-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          <div className="community-card" onClick={() => navigate('/group/priere-soir')} style={{ backgroundColor: 'var(--bg-card)', padding: '16px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
             <div className="community-avatar" style={{ minWidth: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--accent-pray-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🙏</div>
             <div className="community-info">
               <div style={{ fontWeight: '700', fontSize: '16px', color: 'var(--text-primary)', marginBottom: '4px' }}>Groupe prière du soir</div>
               <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Dernier message il y a 2h</div>
             </div>
          </div>

          <div className="community-card" onClick={() => navigate('/group/entrepreneurs')} style={{ backgroundColor: 'var(--bg-card)', padding: '16px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
             <div className="community-avatar" style={{ minWidth: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--accent-blue-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>💼</div>
             <div className="community-info">
               <div style={{ fontWeight: '700', fontSize: '16px', color: 'var(--text-primary)', marginBottom: '4px' }}>Entrepreneurs chrétiens</div>
               <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Prochain event: demain</div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
