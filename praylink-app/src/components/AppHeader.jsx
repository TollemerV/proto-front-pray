import '../styles/Feed.css';

export default function AppHeader({ title, showActions = true }) {
  return (
    <div className="app-header">
      <div className="app-logo">
        {title ? (
          <span className="app-name" style={{ fontSize: 20, background: 'none', WebkitTextFillColor: 'var(--text-primary)' }}>
            {title}
          </span>
        ) : (
          <>
            <div className="logo-icon">✝</div>
            <span className="app-name">PrayLink</span>
          </>
        )}
      </div>
      {showActions && (
        <div className="header-actions">
          <button className="header-action-btn" title="Rechercher">🔍</button>
          <button className="header-action-btn" title="Messages">✉️</button>
        </div>
      )}
    </div>
  );
}
