import { useState } from 'react';
import { Icons } from '../../components/church/ChurchIcons';

export default function ChurchHome({ onNavigate }) {
  const [activePanel, setActivePanel] = useState(null);
  const [message, setMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setMessageSent(true);
    setMessage('');
    setTimeout(() => setMessageSent(false), 3000);
  };

  const togglePanel = (id) => setActivePanel(activePanel === id ? null : id);

  const members = [
    { name: 'Marie Dupont', status: 'Actif', avatar: '👩🏽', lastSeen: 'Hier', color: 'var(--accent-blue-light)' },
    { name: 'Thomas Bernard', status: 'Inactif', avatar: '👨🏻', lastSeen: 'Il y a 3 mois', color: 'var(--accent-gold-light)' },
    { name: 'Esther Mbeki', status: 'Actif', avatar: '👩🏾', lastSeen: "Aujourd'hui", color: 'var(--accent-pray-light)' },
    { name: 'Jean-Christophe L.', status: 'Actif', avatar: '👨🏼', lastSeen: 'Il y a 2h', color: 'var(--accent-green-light)' },
  ];

  const recentActivity = [
    { icon: <Icons.Prayer size={18} stroke="var(--accent-pray)" />, bg: 'var(--accent-pray-light)', label: 'Nouveau témoignage ajouté', sub: 'Il y a 10 min par Marie D.' },
    { icon: <Icons.Plus size={18} stroke="var(--accent-green)" />, bg: 'var(--accent-green-light)', label: 'Nouvelle inscription', sub: 'Il y a 1h par Thomas B.' },
    { icon: <Icons.Calendar size={18} stroke="var(--accent-blue)" />, bg: 'var(--accent-blue-light)', label: 'Événement confirmé', sub: 'Il y a 3h — Culte de Pâques' },
    { icon: <Icons.Wallet size={18} stroke="var(--accent-gold)" />, bg: 'var(--accent-gold-light)', label: 'Don reçu', sub: 'Il y a 5h — 120 € anonyme' },
  ];

  // Actions: tab-based navigate OR panel toggle
  const quickActions = [
    { icon: <Icons.Calendar size={22} />, label: 'Événement',  color: '#6B9FD4', bg: 'rgba(107,159,212,0.12)', tab: 'events' },
    { icon: <Icons.Prayer size={22} />,  label: 'Prières',    color: '#7B68EE', bg: 'rgba(123,104,238,0.12)', tab: 'prayers' },
    { icon: <Icons.Wallet size={22} />,  label: 'Dons',       color: '#D4A94B', bg: 'rgba(212,169,75,0.12)',  tab: 'donations' },
    { icon: <Icons.Bell size={22} />,    label: 'Notif Push', color: '#7B68EE', bg: 'rgba(123,104,238,0.12)', panel: 'notifications' },
    { icon: <Icons.Users size={22} />,   label: 'Membres',    color: '#4ECDC4', bg: 'rgba(78,205,196,0.12)',  tab: 'members' },
    { icon: <Icons.Globe size={22} />,   label: 'Notre page', color: '#6B7280', bg: 'rgba(107,114,128,0.12)', tab: 'profile' },
  ];

  const handleAction = (a) => {
    if (a.tab) { onNavigate(a.tab); }
    else { togglePanel(a.panel); }
  };

  return (
    <div className="ch-home">

      {/* ── HERO HEADER ── */}
      <div className="ch-hero">
        <div className="ch-hero-bg" />
        <div className="ch-hero-content">
          <div className="ch-hero-top">
            <div>
              <p className="ch-hero-greeting">Bienvenue 👋</p>
              <h1 className="ch-hero-church-name">Église Vivante Paris</h1>
            </div>
            <div className="ch-hero-avatar">⛪</div>
          </div>
          <div className="ch-hero-stats-row">
            <div className="ch-hero-stat">
              <span className="ch-hero-stat-value">248</span>
              <span className="ch-hero-stat-label">Membres</span>
            </div>
            <div className="ch-hero-stat-divider" />
            <div className="ch-hero-stat">
              <span className="ch-hero-stat-value">14</span>
              <span className="ch-hero-stat-label">Prières</span>
            </div>
            <div className="ch-hero-stat-divider" />
            <div className="ch-hero-stat">
              <span className="ch-hero-stat-value">4</span>
              <span className="ch-hero-stat-label">Événements</span>
            </div>
            <div className="ch-hero-stat-divider" />
            <div className="ch-hero-stat">
              <span className="ch-hero-stat-value">3 450€</span>
              <span className="ch-hero-stat-label">Dons</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── QUICK ACTIONS GRID ── */}
      <section className="ch-section">
        <h2 className="ch-section-title">Actions rapides</h2>
        <div className="ch-quick-grid">
          {quickActions.map((a, i) => (
            <button
              key={i}
              className={`ch-quick-item${(a.panel && activePanel === a.panel) ? ' ch-quick-item-active' : ''}`}
              onClick={() => handleAction(a)}
            >
              <div className="ch-quick-icon" style={{ backgroundColor: a.bg, color: a.color }}>
                {a.icon}
              </div>
              <span className="ch-quick-label">{a.label}</span>
            </button>
          ))}
        </div>

        {/* ── INLINE PANELS ── */}

        {/* Membres */}
        {activePanel === 'members' && (
          <div className="ch-inline-panel">
            <div className="ch-inline-panel-header">
              <span className="ch-inline-panel-title">Membres</span>
              <span className="ch-manage-section-count">248 enregistrés</span>
            </div>
            <div className="ch-manage-stats-row">
              <div className="ch-manage-stat">
                <Icons.Plus size={18} stroke="var(--accent-green)" />
                <span className="ch-manage-stat-num" style={{color: 'var(--accent-green)'}}>+12</span>
                <span className="ch-manage-stat-label">Cette semaine</span>
              </div>
              <div className="ch-manage-stat">
                <Icons.Activity size={18} stroke="var(--accent-red)" />
                <span className="ch-manage-stat-num" style={{color: 'var(--accent-red)'}}>3</span>
                <span className="ch-manage-stat-label">Inactifs</span>
              </div>
            </div>
            <div className="ch-member-list">
              {members.map((m, i) => (
                <div key={i} className="ch-member-item">
                  <div className="ch-member-avatar" style={{ backgroundColor: m.color }}>{m.avatar}</div>
                  <div className="ch-member-info">
                    <div className="ch-member-name">{m.name}</div>
                    <div className="ch-member-meta">
                      <span className="ch-member-status-dot" style={{
                        background: m.status === 'Actif' ? 'var(--accent-green)' : 'var(--text-tertiary)'
                      }} />
                      {m.status} · {m.lastSeen}
                    </div>
                  </div>
                  <button className="ch-member-action">Contacter</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Annonces */}
        {activePanel === 'announcements' && (
          <div className="ch-inline-panel">
            <div className="ch-inline-panel-header">
              <span className="ch-inline-panel-title">Nouvelle annonce</span>
            </div>
            <div className="ch-announce-audience">
              <button className="ch-audience-pill ch-audience-active">
                <Icons.Home size={14} />
                Église
              </button>
              <button className="ch-audience-pill">
                <Icons.Globe size={14} />
                Public
              </button>
            </div>
            <textarea className="ch-textarea" placeholder="Rédigez votre annonce ici..." rows={4} />
            <button className="ch-primary-btn">
              <Icons.Announce size={18} />
              Publier l'annonce
            </button>
            <div className="ch-history-item">
              <div className="ch-history-badge">Audience : Toute l'église</div>
              <p className="ch-history-text">"N'oubliez pas notre soirée de prière exceptionnelle demain à 19h30..."</p>
              <span className="ch-history-time">Hier</span>
            </div>
          </div>
        )}

        {/* Notifications Push */}
        {activePanel === 'notifications' && (
          <div className="ch-inline-panel">
            <div className="ch-inline-panel-header">
              <span className="ch-inline-panel-title">Notification Push</span>
            </div>
            <label className="ch-form-label">Audience</label>
            <select className="ch-select">
              <option>Toute l'église (248)</option>
              <option>Groupe : Prière du soir</option>
              <option>Groupe : Jeunes</option>
              <option>Membres inactifs</option>
            </select>
            <label className="ch-form-label">Message</label>
            <textarea className="ch-textarea" placeholder="Rédigez le texte de la notification..." rows={3} />
            <button className="ch-primary-btn" style={{background: 'var(--accent-pray)'}}>
              <Icons.Bell size={18} />
              Envoyer la notification
            </button>
          </div>
        )}

        {/* Message à l'église */}
        {activePanel === 'message' && (
          <div className="ch-inline-panel">
            <div className="ch-inline-panel-header">
              <span className="ch-inline-panel-title">Message à l'église</span>
            </div>
            {messageSent ? (
              <div className="ch-success-msg">
                <Icons.Check stroke="white" fill="var(--accent-green)" size={22} />
                <span>Message envoyé à tous les membres !</span>
              </div>
            ) : (
              <>
                <div className="ch-announce-audience">
                  <button className="ch-audience-pill ch-audience-active">
                    <Icons.Home size={14} />
                    Toute l'église
                  </button>
                  <button className="ch-audience-pill">
                    <Icons.Globe size={14} />
                    Public
                  </button>
                </div>
                <textarea
                  className="ch-textarea"
                  placeholder="Rédigez votre message pour l'église..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                />
                <button
                  className={`ch-primary-btn ${!message.trim() ? 'ch-btn-disabled' : ''}`}
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                >
                  Envoyer à l'église
                  <Icons.Send size={16} />
                </button>
              </>
            )}
          </div>
        )}
      </section>

      {/* ── ALERTES ── */}
      <section className="ch-section">
        <div className="ch-alert-block">
          <div className="ch-alert-header">
            <span className="ch-alert-badge">
              <Icons.Alert size={14} style={{marginRight: 6}} />
              À suivre
            </span>
            <span className="ch-alert-count">3 actions</span>
          </div>
          <div className="ch-alert-items">
            <div className="ch-alert-item" onClick={() => togglePanel('members')}>
              <span className="ch-alert-dot dot-red" />
              <span className="ch-alert-text">3 membres inactifs depuis +1 mois</span>
              <Icons.ChevronRight size={16} stroke="var(--text-tertiary)" />
            </div>
            <div className="ch-alert-item" onClick={() => onNavigate('prayers')}>
              <span className="ch-alert-dot dot-amber" />
              <span className="ch-alert-text">5 prières sans réponse de l'église</span>
              <Icons.ChevronRight size={16} stroke="var(--text-tertiary)" />
            </div>
            <div className="ch-alert-item" onClick={() => onNavigate('events')}>
              <span className="ch-alert-dot dot-blue" />
              <span className="ch-alert-text">Soirée de louange demain à 19h30</span>
              <Icons.ChevronRight size={16} stroke="var(--text-tertiary)" />
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCHAIN ÉVÉNEMENT ── */}
      <section className="ch-section">
        <div className="ch-section-header">
          <h2 className="ch-section-title" style={{marginBottom: 0}}>Prochain événement</h2>
          <button className="ch-see-all" onClick={() => onNavigate('events')}>Voir tous</button>
        </div>
        <div className="ch-event-card" onClick={() => onNavigate('events')}>
          <div className="ch-event-date-box">
            <span className="ch-event-month">AVR</span>
            <span className="ch-event-day">02</span>
          </div>
          <div className="ch-event-info">
            <div className="ch-event-title">Soirée de louange & adoration</div>
            <div className="ch-event-meta">19h30 · Salle principale</div>
            <div className="ch-event-badge">
              <Icons.Users size={12} style={{marginRight: 4}} />
              142 inscrits · Demain soir
            </div>
          </div>
        </div>
      </section>

      {/* ── ACTIVITÉ RÉCENTE ── */}
      <section className="ch-section" style={{ paddingBottom: 20 }}>
        <h2 className="ch-section-title">Activité récente</h2>
        <div className="ch-activity-list">
          {recentActivity.map((a, i) => (
            <div key={i} className="ch-activity-item">
              <div className="ch-activity-icon" style={{ background: a.bg }}>{a.icon}</div>
              <div className="ch-activity-info">
                <div className="ch-activity-label">{a.label}</div>
                <div className="ch-activity-sub">{a.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
