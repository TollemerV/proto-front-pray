import AppHeader from '../components/AppHeader';

export default function Notifications() {
  return (
    <>
      <AppHeader title="Activité" showActions={false} />
      <div className="placeholder-screen">
        <div className="placeholder-icon">🔔</div>
        <div className="placeholder-title">Notifications</div>
        <div className="placeholder-text">
          Retrouvez ici toutes vos interactions, demandes de prière et messages de la communauté.
        </div>
      </div>
    </>
  );
}
