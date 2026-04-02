import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons } from '../../components/church/ChurchIcons';

export default function ChurchDashboard() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setMessageSent(true);
    setMessage('');
    setTimeout(() => setMessageSent(false), 3000);
  };

  const recentPrayers = [
    { author: 'Marie D.', time: 'Il y a 10 min', text: 'Priez pour la guérison de mon père hospitalisé.', count: 127, unanswered: true },
    { author: 'Thomas B.', time: 'Il y a 2h', text: 'Je cherche un logement à Paris depuis 3 mois 🏠', count: 23, unanswered: true },
    { author: 'Esther M.', time: 'Il y a 4h', text: 'Merci pour vos prières, ma maman va mieux ! 🙌', count: 89, unanswered: false },
  ];

  const recentActivity = [
    { icon: <Icons.Prayer size={20} stroke="var(--accent-pray)" />, bg: 'var(--accent-pray-light)', label: 'Nouveau témoignage ajouté', sub: 'Il y a 10 min par Marie D.' },
    { icon: <Icons.Plus size={20} stroke="var(--accent-green)" />, bg: 'var(--accent-green-light)', label: 'Nouvelle inscription', sub: 'Il y a 1h par Thomas B.' },
    { icon: <Icons.Calendar size={20} stroke="var(--accent-blue)" />, bg: 'var(--accent-blue-light)', label: 'Événement confirmé', sub: 'Il y a 3h — Culte de Pâques' },
    { icon: <Icons.Wallet size={20} stroke="var(--accent-gold)" />, bg: 'var(--accent-gold-light)', label: 'Don reçu', sub: 'Il y a 5h — 120 € anonyme' },
  ];

  return (
    <div className="church-dashboard-page">

      {/* ── HEADER ── */}
      <div className="cdb-header">
        <div>
          <h1 className="cdb-title">Espace Église</h1>
          <p className="cdb-subtitle">Vue d'ensemble · Aujourd'hui</p>
        </div>
        <button onClick={() => navigate('/')} className="cdb-quit-btn">
          <Icons.Logout size={18} />
          <span>Quitter</span>
        </button>
      </div>

      {/* ── ACTIONS RAPIDES ── */}
      <section className="cdb-section">
        <h2 className="cdb-section-title">
          <Icons.Activity size={16} stroke="var(--accent-gold)" style={{marginRight: 8}} />
          Actions rapides
        </h2>
        <div className="cdb-quick-actions">
          <button className="cdb-qa-btn qa-announce" onClick={() => navigate('/church/announcements')}>
            <span className="cdb-qa-icon"><Icons.Announce /></span>
            <span className="cdb-qa-label">Annonce</span>
          </button>
          <button className="cdb-qa-btn qa-event" onClick={() => navigate('/church/events')}>
            <span className="cdb-qa-icon"><Icons.Calendar /></span>
            <span className="cdb-qa-label">Événement</span>
          </button>
          <button className="cdb-qa-btn qa-prayer" onClick={() => navigate('/church/prayers')}>
            <span className="cdb-qa-icon"><Icons.Prayer /></span>
            <span className="cdb-qa-label">Prière</span>
          </button>
          <button className="cdb-qa-btn qa-message" onClick={() => {
            document.getElementById('cdb-message-block')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            <span className="cdb-qa-icon"><Icons.Message /></span>
            <span className="cdb-qa-label">Message</span>
          </button>
        </div>
      </section>

      {/* ── À SUIVRE (ALERTES) ── */}
      <section className="cdb-section">
        <div className="cdb-alert-block">
          <div className="cdb-alert-header">
            <span className="cdb-alert-badge">
              <Icons.Alert size={14} style={{marginRight: 6}} />
              À suivre
            </span>
            <span className="cdb-alert-count">3 actions</span>
          </div>
          <div className="cdb-alert-items">
            <div className="cdb-alert-item" onClick={() => navigate('/church/members')}>
              <span className="cdb-alert-dot dot-red" />
              <span className="cdb-alert-text">3 membres inactifs depuis plus d'1 mois</span>
              <span className="cdb-alert-arrow"><Icons.ChevronRight size={18} /></span>
            </div>
            <div className="cdb-alert-item" onClick={() => navigate('/church/prayers')}>
              <span className="cdb-alert-dot dot-amber" />
              <span className="cdb-alert-text">5 prières sans réponse de l'église</span>
              <span className="cdb-alert-arrow"><Icons.ChevronRight size={18} /></span>
            </div>
            <div className="cdb-alert-item">
              <span className="cdb-alert-dot dot-blue" />
              <span className="cdb-alert-text">Soirée de louange demain à 19h30</span>
              <span className="cdb-alert-arrow"><Icons.ChevronRight size={18} /></span>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS GRID ── */}
      <section className="cdb-section">
        <h2 className="cdb-section-title">
          <Icons.Stats size={16} stroke="var(--accent-blue)" style={{marginRight: 8}} />
          Statistiques
        </h2>
        <div className="cdb-stats-grid">
          <div className="cdb-stat-card clickable" onClick={() => navigate('/church/members')}>
            <span className="cdb-stat-icon"><Icons.Users stroke="var(--accent-blue)" /></span>
            <div className="cdb-stat-value">248</div>
            <div className="cdb-stat-label">Membres</div>
            <div className="cdb-stat-sub cdb-sub-green">+12 cette semaine</div>
          </div>
          <div className="cdb-stat-card clickable" onClick={() => navigate('/church/prayers')}>
            <span className="cdb-stat-icon"><Icons.Prayer stroke="var(--accent-pray)" /></span>
            <div className="cdb-stat-value cdb-val-pray">14</div>
            <div className="cdb-stat-label">Prières actives</div>
            <div className="cdb-stat-sub cdb-sub-amber">5 sans réponse</div>
          </div>
          <div className="cdb-stat-card clickable" onClick={() => navigate('/church/events')}>
            <span className="cdb-stat-icon"><Icons.Calendar stroke="var(--accent-blue)" /></span>
            <div className="cdb-stat-value">4</div>
            <div className="cdb-stat-label">Événements</div>
            <div className="cdb-stat-sub cdb-sub-blue">Prochain : demain</div>
          </div>
          <div className="cdb-stat-card clickable" onClick={() => navigate('/church/donations')}>
            <span className="cdb-stat-icon"><Icons.Wallet stroke="var(--accent-gold)" /></span>
            <div className="cdb-stat-value cdb-val-gold">+12%</div>
            <div className="cdb-stat-label">Croissance dons</div>
            <div className="cdb-stat-sub cdb-sub-green">85% objectif atteint</div>
          </div>
        </div>
      </section>

      {/* ── PRIÈRES RÉCENTES ── */}
      <section className="cdb-section">
        <div className="cdb-section-header">
          <h2 className="cdb-section-title">
            <Icons.Prayer size={16} stroke="var(--accent-pray)" style={{marginRight: 8}} />
            Prières récentes
          </h2>
          <button className="cdb-see-all" onClick={() => navigate('/church/prayers')}>Tout voir</button>
        </div>
        <div className="cdb-prayer-list">
          {recentPrayers.map((p, i) => (
            <div key={i} className={`cdb-prayer-card ${p.unanswered ? 'prayer-pending' : 'prayer-done'}`}>
              <div className="cdb-prayer-top">
                <div className="cdb-prayer-author-row">
                  <span className="cdb-prayer-dot" />
                  <span className="cdb-prayer-author">{p.author}</span>
                  <span className="cdb-prayer-time">{p.time}</span>
                </div>
                {p.unanswered
                  ? <span className="cdb-prayer-badge badge-pending">Sans réponse</span>
                  : <span className="cdb-prayer-badge badge-done">Exaucée ✨</span>
                }
              </div>
              <p className="cdb-prayer-text">{p.text}</p>
              <div className="cdb-prayer-footer">
                <span className="cdb-prayer-count">
                  <Icons.Prayer size={14} style={{marginRight: 4, verticalAlign: 'middle'}} />
                  {p.count} prient
                </span>
                {p.unanswered && (
                  <div className="cdb-prayer-btns">
                    <button className="cdb-prayer-btn btn-reply" onClick={() => navigate('/church/prayers')}>Répondre</button>
                    <button className="cdb-prayer-btn btn-view" onClick={() => navigate('/church/prayers')}>Voir</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCHAIN ÉVÉNEMENT ── */}
      <section className="cdb-section">
        <div className="cdb-section-header">
          <h2 className="cdb-section-title">
            <Icons.Calendar size={16} stroke="var(--accent-blue)" style={{marginRight: 8}} />
            Prochain événement
          </h2>
          <button className="cdb-see-all" onClick={() => navigate('/church/events')}>Tous les événements</button>
        </div>
        <div className="cdb-event-featured" onClick={() => navigate('/church/events')}>
          <div className="cdb-event-feat-left">
            <div className="cdb-event-date-box">
              <span className="cdb-event-month">AVR</span>
              <span className="cdb-event-day">02</span>
            </div>
            <div className="cdb-event-feat-info">
              <div className="cdb-event-feat-title">Soirée de louange & adoration</div>
              <div className="cdb-event-feat-time">
                <Icons.Activity size={12} style={{marginRight: 4}} />
                19h30 · Salle principale
              </div>
              <div className="cdb-event-feat-countdown">
                <Icons.Activity size={12} style={{marginRight: 4}} />
                Demain soir
              </div>
            </div>
          </div>
          <div className="cdb-event-feat-right">
            <div className="cdb-event-feat-inscrits">
              <span className="cdb-event-feat-num">142</span>
              <span className="cdb-event-feat-sub">inscrits</span>
            </div>
            <button className="cdb-event-feat-btn" onClick={(e) => { e.stopPropagation(); navigate('/church/events'); }}>
              Voir participants
            </button>
          </div>
        </div>
      </section>

      {/* ── MEMBRES ── */}
      <section className="cdb-section">
        <div className="cdb-section-header">
          <h2 className="cdb-section-title">
            <Icons.Users size={16} stroke="var(--accent-green)" style={{marginRight: 8}} />
            Membres
          </h2>
          <button className="cdb-see-all" onClick={() => navigate('/church/members')}>Voir tous</button>
        </div>
        <div className="cdb-members-summary">
          <div className="cdb-members-stat ms-new">
            <span className="cdb-ms-icon"><Icons.Plus size={20} stroke="var(--accent-green)" /></span>
            <div>
              <div className="cdb-ms-num">+12</div>
              <div className="cdb-ms-label">Nouveaux cette semaine</div>
            </div>
          </div>
          <div className="cdb-members-divider" />
          <div className="cdb-members-stat ms-inactive">
            <span className="cdb-ms-icon"><Icons.Activity size={20} stroke="var(--accent-red)" /></span>
            <div>
              <div className="cdb-ms-num cdb-ms-red">3</div>
              <div className="cdb-ms-label">Membres inactifs</div>
            </div>
          </div>
        </div>
        <button className="cdb-members-cta" onClick={() => navigate('/church/members')}>
          Voir / Contacter les membres
          <Icons.ChevronRight size={18} style={{marginLeft: 8}} />
        </button>
      </section>

      {/* ── DONS ── */}
      <section className="cdb-section">
        <div className="cdb-section-header">
          <h2 className="cdb-section-title">
            <Icons.Wallet size={16} stroke="var(--accent-gold)" style={{marginRight: 8}} />
            Dons
          </h2>
          <button className="cdb-see-all" onClick={() => navigate('/church/donations')}>Détails</button>
        </div>
        <div className="cdb-donations-card" onClick={() => navigate('/church/donations')}>
          <div className="cdb-don-top">
            <div>
              <div className="cdb-don-label">Total avril</div>
              <div className="cdb-don-amount">3 450 €</div>
            </div>
            <div className="cdb-don-badge">
              +12%
              <Icons.Activity size={14} style={{marginLeft: 4}} />
            </div>
          </div>
          <div className="cdb-don-bar-wrap">
            <div className="cdb-don-bar-bg">
              <div className="cdb-don-bar-fill" style={{ width: '85%' }} />
            </div>
            <span className="cdb-don-bar-label">85% de l'objectif mensuel</span>
          </div>
          <button className="cdb-don-btn" onClick={(e) => { e.stopPropagation(); navigate('/church/donations'); }}>
            Voir le détail des dons
          </button>
        </div>
      </section>

      {/* ── MESSAGE À L'ÉGLISE ── */}
      <section className="cdb-section" id="cdb-message-block">
        <h2 className="cdb-section-title">
          <Icons.Message size={16} stroke="var(--accent-blue)" style={{marginRight: 8}} />
          Message à l'église
        </h2>
        <div className="cdb-message-block">
          {messageSent ? (
            <div className="cdb-message-sent">
              <span className="cdb-sent-icon"><Icons.Check stroke="white" fill="var(--accent-green)" /></span>
              <span>Message envoyé à tous les membres !</span>
            </div>
          ) : (
            <>
              <div className="cdb-msg-audience-pills">
                <span className="cdb-msg-pill pill-active">
                  <Icons.Home size={14} style={{marginRight: 6}} />
                  Toute l'église
                </span>
                <span className="cdb-msg-pill">
                  <Icons.Globe size={14} style={{marginRight: 6}} />
                  Public
                </span>
              </div>
              <textarea
                className="cdb-msg-textarea"
                placeholder="Rédigez votre message pour l'église..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
              />
              <button
                className={`cdb-msg-send-btn ${message.trim() ? 'active' : ''}`}
                onClick={handleSendMessage}
                disabled={!message.trim()}
              >
                Envoyer à l'église
                <Icons.Announce size={18} style={{marginLeft: 8}} />
              </button>
            </>
          )}
        </div>
      </section>

      {/* ── ACTIVITÉ RÉCENTE ── */}
      <section className="cdb-section" style={{ paddingBottom: '120px' }}>
        <h2 className="cdb-section-title">
          <Icons.Activity size={16} stroke="var(--accent-red)" style={{marginRight: 8}} />
          Activité récente
        </h2>
        <div className="cdb-activity-list">
          {recentActivity.map((a, i) => (
            <div key={i} className="cdb-activity-item">
              <div className="cdb-activity-icon" style={{ background: a.bg }}>{a.icon}</div>
              <div className="cdb-activity-info">
                <div className="cdb-activity-label">{a.label}</div>
                <div className="cdb-activity-sub">{a.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
