import AppHeader from '../components/AppHeader';
import PostCard from '../components/PostCard';
import '../styles/Profile.css';

export default function Profile() {
  return (
    <>
      <AppHeader title="Profil" showActions={false}>
        <div className="header-actions">
          <button className="header-action-btn" title="Paramètres">⚙️</button>
        </div>
      </AppHeader>

      <div className="profile-header">
        <div className="profile-avatar-large">👤</div>
        <div className="profile-name">Victor T.</div>
        <div className="profile-bio">🙏 Enfant de Dieu • Membre de l'Église Béthel</div>
        <div className="profile-stats-row">
          <div className="profile-stat">
            <div className="profile-stat-value">156</div>
            <div className="profile-stat-label">Prières</div>
          </div>
          <div className="profile-stat">
            <div className="profile-stat-value">3</div>
            <div className="profile-stat-label">Églises</div>
          </div>
          <div className="profile-stat">
            <div className="profile-stat-value">42</div>
            <div className="profile-stat-label">Amis</div>
          </div>
        </div>
        <button className="profile-edit-btn">Modifier le profil</button>
      </div>

      <div style={{ padding: 16 }}>
        <div className="section-title">Mes posts récents</div>
        <PostCard
          avatar="👤"
          avatarColor="blue"
          username="Victor T."
          badge="🌍 Public"
          badgeType="public"
          time="Il y a 1 jour"
          content="Merci Seigneur pour ta grâce infinie 🙏 Chaque jour est une bénédiction."
          comments={12}
          likes={67}
        />
      </div>
    </>
  );
}
