import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const navItems = [
  { path: '/', icon: '🏠', label: 'Accueil' },
  { path: '/notifications', icon: '🔔', label: 'Activité', hasNotif: true },
  { path: null, icon: '✚', label: 'Créer', isCreate: true },
  { path: '/communities', icon: '⛪', label: 'Église' },
  { path: '/profile', icon: '👤', label: 'Profil' },
];

export default function BottomNavbar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="bottom-navbar">
      {navItems.map((item, i) => {
        if (item.isCreate) {
          return (
            <button className="nav-item create-btn" key={i}>
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          );
        }

        const isActive = location.pathname === item.path;

        return (
          <button
            className={`nav-item${isActive ? ' active' : ''}`}
            key={i}
            onClick={() => navigate(item.path)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {item.hasNotif && <span className="notification-dot"></span>}
          </button>
        );
      })}
    </nav>
  );
}
