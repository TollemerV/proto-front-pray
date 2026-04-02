import { useNavigate } from 'react-router-dom';

export default function Gateway() {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: 'var(--bg-primary)',
      padding: '24px',
      gap: '24px'
    }}>
      <h1 style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', marginBottom: '24px' }}>
        Bienvenue sur <span style={{ color: 'var(--accent-pray)' }}>PrayLink</span>
      </h1>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '32px' }}>
        Choisissez votre interface de démonstration :
      </p>

      <div 
        onClick={() => navigate('/feed')}
        style={{
          width: '100%',
          backgroundColor: 'var(--bg-card)',
          padding: '24px',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <span style={{ fontSize: '40px' }}>📱</span>
        <h2 style={{ fontSize: '20px', fontWeight: '700' }}>Interface Utilisateur</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '14px' }}>L'application classique avec fil d'actualité, profil, église, etc.</p>
      </div>

      <div 
        onClick={() => navigate('/church')}
        style={{
          width: '100%',
          backgroundColor: 'var(--bg-card)',
          padding: '24px',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          border: '2px solid var(--accent-pray-light)'
        }}
      >
        <span style={{ fontSize: '40px' }}>⛪</span>
        <h2 style={{ fontSize: '20px', fontWeight: '700' }}>Interface Église (Gestion)</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '14px' }}>Le tableau de bord pour administrer les prières, événements, membres et annonces.</p>
      </div>
    </div>
  );
}
