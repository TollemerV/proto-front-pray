import { useNavigate } from 'react-router-dom';

export default function Gateway() {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      backgroundColor: 'var(--bg-primary)',
      padding: '28px 24px',
      gap: '14px'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '8px' }}>
        <p style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-tertiary)', marginBottom: '8px' }}>
          Mode démo
        </p>
        <h1 style={{ fontSize: '26px', fontWeight: '800', letterSpacing: '-0.5px' }}>
          Pray <span style={{ color: 'var(--accent-pray)' }}>For</span> 🕊️
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '6px' }}>
          Choisissez une interface à explorer
        </p>
      </div>

      {/* User */}
      <div
        id="gateway-user"
        onClick={() => navigate('/feed')}
        style={{
          width: '100%',
          backgroundColor: 'var(--bg-card)',
          padding: '20px',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          border: '1.5px solid var(--border-light)',
          transition: 'var(--transition)',
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-blue)'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-light)'}
      >
        <div style={{
          width: '48px', height: '48px', borderRadius: '14px',
          background: 'var(--accent-blue-light)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '24px', flexShrink: 0
        }}>📱</div>
        <div>
          <div style={{ fontWeight: '700', fontSize: '15px', marginBottom: '3px' }}>Interface Utilisateur</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Feed, profil, prières, communauté</div>
        </div>
        <div style={{ marginLeft: 'auto', color: 'var(--text-tertiary)', fontSize: '18px' }}>›</div>
      </div>

      {/* Church */}
      <div
        id="gateway-church"
        onClick={() => navigate('/church')}
        style={{
          width: '100%',
          backgroundColor: 'var(--bg-card)',
          padding: '20px',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          border: '1.5px solid var(--border-light)',
          transition: 'var(--transition)',
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-gold)'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-light)'}
      >
        <div style={{
          width: '48px', height: '48px', borderRadius: '14px',
          background: 'var(--accent-gold-light)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '24px', flexShrink: 0
        }}>⛪</div>
        <div>
          <div style={{ fontWeight: '700', fontSize: '15px', marginBottom: '3px' }}>Interface Église</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Tableau de bord admin & gestion</div>
        </div>
        <div style={{ marginLeft: 'auto', color: 'var(--text-tertiary)', fontSize: '18px' }}>›</div>
      </div>

      {/* Onboarding */}
      <div
        id="gateway-onboarding"
        onClick={() => navigate('/onboarding')}
        style={{
          width: '100%',
          background: 'linear-gradient(135deg, var(--accent-pray) 0%, var(--accent-blue) 100%)',
          padding: '20px',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 4px 20px rgba(123,104,238,0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          transition: 'var(--transition)',
        }}
      >
        <div style={{
          width: '48px', height: '48px', borderRadius: '14px',
          background: 'rgba(255,255,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '24px', flexShrink: 0
        }}>🙏</div>
        <div>
          <div style={{ fontWeight: '700', fontSize: '15px', marginBottom: '3px', color: 'white' }}>Inscription / Connexion</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)' }}>Tunnel d'onboarding complet</div>
        </div>
        <div style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.75)', fontSize: '18px' }}>›</div>
      </div>
    </div>
  );
}
