import { useState } from 'react';
import { Icons } from '../../components/church/ChurchIcons';

export default function ChurchManage() {
  const [message, setMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setMessageSent(true);
    setMessage('');
    setTimeout(() => setMessageSent(false), 3000);
  };

  const members = [
    { name: 'Marie Dupont', status: 'Actif', avatar: '👩🏽', lastSeen: 'Hier', color: 'var(--accent-blue-light)' },
    { name: 'Thomas Bernard', status: 'Inactif', avatar: '👨🏻', lastSeen: 'Il y a 3 mois', color: 'var(--accent-gold-light)' },
    { name: 'Esther Mbeki', status: 'Actif', avatar: '👩🏾', lastSeen: "Aujourd'hui", color: 'var(--accent-pray-light)' },
    { name: 'Jean-Christophe L.', status: 'Actif', avatar: '👨🏼', lastSeen: 'Il y a 2h', color: 'var(--accent-green-light)' },
  ];

  const sections = [
    { id: 'members', icon: <Icons.Users size={20} />, label: 'Membres', sub: '248 membres enregistrés', color: 'var(--accent-blue)' },
    { id: 'announcements', icon: <Icons.Announce size={20} />, label: 'Annonces', sub: 'Communiquer avec la communauté', color: 'var(--accent-pray)' },
    { id: 'notifications', icon: <Icons.Bell size={20} />, label: 'Notifications Push', sub: 'Alerter instantanément', color: 'var(--accent-gold)' },
    { id: 'message', icon: <Icons.Send size={20} />, label: 'Message à l\'église', sub: 'Envoyer à tous les membres', color: 'var(--accent-blue)' },
  ];

  return (
    <div className="ch-manage">
      <div className="ch-manage-header">
        <h1 className="ch-manage-title">Gestion</h1>
        <p className="ch-manage-sub">Administration de votre église</p>
      </div>

      {/* Section Cards */}
      <div className="ch-manage-grid">
        {sections.map((s) => (
          <button
            key={s.id}
            className={`ch-manage-card${activeSection === s.id ? ' ch-manage-card-active' : ''}`}
            onClick={() => setActiveSection(activeSection === s.id ? null : s.id)}
          >
            <div className="ch-manage-card-icon" style={{ background: `${s.color}15`, color: s.color }}>
              {s.icon}
            </div>
            <div className="ch-manage-card-text">
              <div className="ch-manage-card-label">{s.label}</div>
              <div className="ch-manage-card-sub">{s.sub}</div>
            </div>
            <Icons.ChevronRight
              size={18}
              stroke="var(--text-tertiary)"
              style={{ transition: 'transform 0.3s', transform: activeSection === s.id ? 'rotate(90deg)' : 'none' }}
            />
          </button>
        ))}
      </div>

      {/* ── MEMBRES ── */}
      {activeSection === 'members' && (
        <section className="ch-manage-section ch-manage-section-enter">
          <div className="ch-manage-section-header">
            <h2 className="ch-section-title" style={{marginBottom: 0}}>Membres</h2>
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
        </section>
      )}

      {/* ── ANNONCES ── */}
      {activeSection === 'announcements' && (
        <section className="ch-manage-section ch-manage-section-enter">
          <div className="ch-manage-section-header">
            <h2 className="ch-section-title" style={{marginBottom: 0}}>Nouvelle annonce</h2>
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

          <textarea
            className="ch-textarea"
            placeholder="Rédigez votre annonce ici..."
            rows={4}
          />

          <button className="ch-primary-btn">
            <Icons.Announce size={18} />
            Publier l'annonce
          </button>

          <div className="ch-history-item">
            <div className="ch-history-badge">Audience : Toute l'église</div>
            <p className="ch-history-text">"N'oubliez pas notre soirée de prière exceptionnelle demain à 19h30..."</p>
            <span className="ch-history-time">Hier</span>
          </div>
        </section>
      )}

      {/* ── NOTIFICATIONS PUSH ── */}
      {activeSection === 'notifications' && (
        <section className="ch-manage-section ch-manage-section-enter">
          <div className="ch-manage-section-header">
            <h2 className="ch-section-title" style={{marginBottom: 0}}>Notification Push</h2>
          </div>

          <label className="ch-form-label">Audience</label>
          <select className="ch-select">
            <option>Toute l'église (248)</option>
            <option>Groupe : Prière du soir</option>
            <option>Groupe : Jeunes</option>
            <option>Membres inactifs</option>
          </select>

          <label className="ch-form-label">Message</label>
          <textarea
            className="ch-textarea"
            placeholder="Rédigez le texte de la notification..."
            rows={3}
          />

          <button className="ch-primary-btn" style={{background: 'var(--accent-pray)'}}>
            <Icons.Bell size={18} />
            Envoyer la notification
          </button>
        </section>
      )}

      {/* ── MESSAGE À L'ÉGLISE ── */}
      {activeSection === 'message' && (
        <section className="ch-manage-section ch-manage-section-enter">
          <div className="ch-manage-section-header">
            <h2 className="ch-section-title" style={{marginBottom: 0}}>Message à l'église</h2>
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
        </section>
      )}
    </div>
  );
}
