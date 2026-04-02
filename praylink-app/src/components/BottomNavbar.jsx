import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Icons = {
  HomeOutline: () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3L4 9v12h5v-6h6v6h5V9z"/></svg>,
  HomeSolid: () => <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L4 9v12h5v-6h6v6h5V9z"/></svg>,
  BellOutline: () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>,
  BellSolid: () => <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C9.24 2 7 4.24 7 7c0 4.33-2.58 6.45-3 6.78V16h16v-2.22c-.42-.33-3-2.45-3-6.78 0-2.76-2.24-5-5-5zm-2 16a2 2 0 0 0 4 0h-4z"/></svg>,
  ChurchOutline: () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v6"></path><path d="M10 5h4"></path><path d="M12 8l-8 6h3v8h4v-5h2v5h4v-8h3l-8-6z"></path></svg>,
  ChurchSolid: () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M12 2v6 M10 5h4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><path d="M12 8l-8 6h3v8h10v-8h3l-8-6z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>,
  ProfileOutline: () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
  ProfileSolid: () => <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2z"></path><circle cx="12" cy="7" r="4"></circle></svg>,
  GroupOutline: () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  GroupSolid: () => <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2z"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
};

const navItems = [
  { path: '/', iconOutline: Icons.HomeOutline, iconSolid: Icons.HomeSolid, label: 'Accueil' },
  { path: '/notifications', iconOutline: Icons.BellOutline, iconSolid: Icons.BellSolid, label: 'Activité', hasNotif: true },
  { path: null, label: 'Créer', isCreate: true },
  { path: '/communities', iconOutline: Icons.GroupOutline, iconSolid: Icons.GroupSolid, label: 'Groupes' },
  { path: '/profile', iconOutline: Icons.ProfileOutline, iconSolid: Icons.ProfileSolid, label: 'Profil' },
];

export default function BottomNavbar({ onOpenCreate }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="bottom-navbar">
      {navItems.map((item, i) => {
        if (item.isCreate) {
          return (
            <button className="nav-item create-btn" key={i} onClick={onOpenCreate}>
              <span className="nav-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </span>
              <span className="nav-label">{item.label}</span>
            </button>
          );
        }

        const isActive = location.pathname === item.path || (item.path === '/communities' && location.pathname.startsWith('/community/'));

        return (
          <button
            className={`nav-item${isActive ? ' active' : ''}`}
            key={i}
            onClick={() => navigate(item.path)}
          >
            <span className="nav-icon">
              {isActive ? <item.iconSolid /> : <item.iconOutline />}
            </span>
            <span className="nav-label">{item.label}</span>
            {item.hasNotif && <span className="notification-dot"></span>}
          </button>
        );
      })}
    </nav>
  );
}
