import '../styles/Feed.css';
import logoWhite from '../assets/logo-2.png';

export default function AppHeader({ title, showActions = true, onSearch }) {
  return (
    <div className="app-header">
      <div className="app-logo">
        {title ? (
          <span className="app-name" style={{ fontSize: 20, background: 'none', WebkitTextFillColor: 'var(--text-primary)' }}>
            {title}
          </span>
        ) : (
          <>
            <div className="logo-icon">
              <img src={logoWhite} alt="Logo" style={{ height: '22px', width: '22px', objectFit: 'contain' }} />
            </div>
            <span className="app-name">PrayLink</span>
          </>
        )}
      </div>
      {showActions && (
        <div className="header-actions">
          <button className="header-action-btn" title="Rechercher" onClick={onSearch}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
