import { useState } from 'react';
import '../styles/Profile.css';

// ── Mock data ────────────────────────────────────────────────────
const USER = {
  name: 'Victor T.',
  handle: '@victor.t',
  emoji: '👤',
  bio: 'Enfant de Dieu 🙏\nMembre actif depuis 2023',
  church: 'Église Béthel Paris',
  stats: { prayers: 156, groups: 3, friends: 42 },
};

const MY_POSTS = [
  { id: 1, time: 'Il y a 1j',    content: 'Merci Seigneur pour ta grâce infinie 🙏 Chaque jour est une bénédiction.',         hashtags: ['grace', 'benediction'], likes: 67,  comments: 12 },
  { id: 2, time: 'Il y a 3j',    content: '« L\'Éternel est mon berger, je ne manquerai de rien. » — Psaume 23:1',              hashtags: ['versetdujour'],          likes: 134, comments: 8  },
  { id: 3, time: 'Il y a 5j',    content: 'Belle retraite spirituelle ce week-end avec l\'église. Tellement ressourcé ✨',      hashtags: ['retraite', 'foi'],       likes: 89,  comments: 21 },
  { id: 4, time: 'Il y a 1 sem', content: 'Journée de jeûne et de prière. Que ta volonté soit faite, Seigneur.',               hashtags: ['jeune', 'priere'],       likes: 45,  comments: 6  },
  { id: 5, time: 'Il y a 2 sem', content: 'Premier culte de l\'année — quel moment de grâce 🎉🙌',                              hashtags: ['culte', 'eglise'],       likes: 203, comments: 34 },
  { id: 6, time: 'Il y a 3 sem', content: 'Prions pour les uns et pour les autres 🙏',                                          hashtags: ['priere', 'communaute'], likes: 78,  comments: 15 },
];

const REPOSTS = [
  { id: 101, author: 'Marie Dupont',   time: 'Il y a 2j',   content: 'Merci de prier pour moi, j\'ai un examen très important demain matin 🙏',           hashtags: ['priere', 'confiance'], likes: 89,  comments: 24 },
  { id: 102, author: 'Pasteur Samuel', time: 'Il y a 4j',   content: '« Car je connais les projets que j\'ai formés sur vous... » — Jérémie 29:11',         hashtags: ['versetdujour'],        likes: 342, comments: 56 },
  { id: 103, author: 'Église Béthel',  time: 'Il y a 1 sem',content: 'Culte spécial dimanche prochain — tous sont invités 🎉',                              hashtags: ['eglise', 'culte'],     likes: 210, comments: 45 },
];

// Posts enregistrés (mock)
const SAVED_POSTS = [
  { id: 201, author: 'Pasteur Emmanuel', time: 'Il y a 2j',   content: '« Cherchez d\'abord le royaume de Dieu et sa justice... » — Matthieu 6:33',          hashtags: ['versetdujour'],        likes: 412 },
  { id: 202, author: 'Marie Dupont',     time: 'Il y a 5j',   content: 'Mon témoignage : après 3 mois de prière, Dieu a ouvert une porte inattendue 🙌',     hashtags: ['temoignage'],          likes: 203 },
  { id: 203, author: 'Église Béthel',   time: 'Il y a 1 sem', content: 'Notre programme complet pour le mois d\'avril — tout pour glorifier Dieu 🎉',        hashtags: ['annonce','eglise'],    likes: 156 },
];

// Historique de dons (mock)
const DON_HISTORY = [
  { id: 1, date: '06 Avr 2025', église: 'Église Béthel Paris', montant: 50,  cause: '⛪ Offrande générale', freq: 'Ponctuel',   status: 'done' },
  { id: 2, date: '01 Mar 2025', église: 'Église Béthel Paris', montant: 20,  cause: '🌍 Missions',           freq: 'Mensuel',    status: 'done' },
  { id: 3, date: '01 Fév 2025', église: 'Église Béthel Paris', montant: 20,  cause: '🌍 Missions',           freq: 'Mensuel',    status: 'done' },
  { id: 4, date: '15 Jan 2025', église: 'Église Béthel Paris', montant: 100, cause: '🤝 Aide aux démunis',   freq: 'Ponctuel',   status: 'done' },
];

// ── Mini PostCard for grid ───────────────────────────────────────
function MiniCard({ content, likes, comments, hashtags, author, repost }) {
  return (
    <div className="prof-mini-card">
      {repost && <div className="prof-mini-repost-badge">↺ {author}</div>}
      <p className="prof-mini-content">{content}</p>
      {hashtags?.length > 0 && (
        <div className="prof-mini-tags">
          {hashtags.map(t => <span key={t} className="prof-mini-tag">#{t}</span>)}
        </div>
      )}
      <div className="prof-mini-meta">
        <span>🙏 {likes}</span>
        {comments !== undefined && <span>💬 {comments}</span>}
      </div>
    </div>
  );
}

// ── Settings panel ───────────────────────────────────────────────
function SettingsPanel({ onClose }) {
  const [view, setView] = useState('menu');
  const [reportSent, setReportSent] = useState(false);
  const [reportText, setReportText] = useState('');
  const [selectedType, setSelectedType] = useState(null);

  const handleReport = () => {
    if (!reportText.trim()) return;
    setReportSent(true);
    setTimeout(() => { setReportSent(false); setReportText(''); setView('menu'); }, 2000);
  };

  return (
    <div className="prof-settings-overlay" onClick={onClose}>
      <div className="prof-settings-sheet" onClick={e => e.stopPropagation()}>
        <div className="prof-settings-handle" />

        {/* ── Menu principal ── */}
        {view === 'menu' && (<>
          <div className="prof-settings-topbar">
            <span className="prof-settings-title">Paramètres</span>
            <button className="prof-settings-close" onClick={onClose}>✕</button>
          </div>

          <div className="prof-settings-list">
            <button className="prof-settings-item" onClick={() => setView('saved')}>
              <span className="prof-settings-item-icon">🔖</span>
              <div className="prof-settings-item-text">
                <span className="prof-settings-item-label">Posts enregistrés</span>
                <span className="prof-settings-item-sub">Retrouvez vos publications sauvegardées</span>
              </div>
              <span className="prof-settings-item-arrow">›</span>
            </button>

            <button className="prof-settings-item" onClick={() => setView('history')}>
              <span className="prof-settings-item-icon">💛</span>
              <div className="prof-settings-item-text">
                <span className="prof-settings-item-label">Historique de dons</span>
                <span className="prof-settings-item-sub">Tous vos dons et reçus fiscaux</span>
              </div>
              <span className="prof-settings-item-arrow">›</span>
            </button>

            <div className="prof-settings-divider" />

            <button className="prof-settings-item danger" onClick={() => setView('report')}>
              <span className="prof-settings-item-icon">🚨</span>
              <div className="prof-settings-item-text">
                <span className="prof-settings-item-label">Signaler un problème</span>
                <span className="prof-settings-item-sub">Bug, contenu inapproprié, aide…</span>
              </div>
              <span className="prof-settings-item-arrow">›</span>
            </button>
          </div>
        </>)}

        {/* ── Posts enregistrés ── */}
        {view === 'saved' && (<>
          <div className="prof-settings-topbar">
            <button className="prof-settings-back" onClick={() => setView('menu')}>‹ Retour</button>
            <span className="prof-settings-title">Posts enregistrés</span>
            <span />
          </div>

          <div className="prof-settings-scroll">
            {SAVED_POSTS.map(p => (
              <div key={p.id} className="prof-saved-card">
                <div className="prof-saved-author-row">
                  <span className="prof-saved-author">{p.author}</span>
                  <span className="prof-saved-time">{p.time}</span>
                </div>
                <p className="prof-saved-content">{p.content}</p>
                <div className="prof-saved-footer">
                  {p.hashtags.map(t => <span key={t} className="prof-mini-tag">#{t}</span>)}
                  <span className="prof-saved-likes">🙏 {p.likes}</span>
                </div>
              </div>
            ))}
          </div>
        </>)}

        {/* ── Historique de dons ── */}
        {view === 'history' && (<>
          <div className="prof-settings-topbar">
            <button className="prof-settings-back" onClick={() => setView('menu')}>‹ Retour</button>
            <span className="prof-settings-title">Historique de dons</span>
            <span />
          </div>

          <div className="prof-don-summary">
            <div className="prof-don-total">
              <span className="prof-don-total-label">Total donné</span>
              <span className="prof-don-total-value">190 €</span>
            </div>
            <div className="prof-don-fiscal">
              💡 Économie fiscale estimée : <strong>~125 €</strong>
            </div>
          </div>

          <div className="prof-settings-scroll">
            {DON_HISTORY.map(d => (
              <div key={d.id} className="prof-don-item">
                <div className="prof-don-item-left">
                  <span className="prof-don-cause">{d.cause}</span>
                  <span className="prof-don-church">{d.église}</span>
                  <span className="prof-don-date">{d.date} · {d.freq}</span>
                </div>
                <div className="prof-don-item-right">
                  <span className="prof-don-amount">+{d.montant} €</span>
                  <span className="prof-don-receipt">Reçu ✓</span>
                </div>
              </div>
            ))}
          </div>
        </>)}

        {/* ── Signaler un problème ── */}
        {view === 'report' && (<>
          <div className="prof-settings-topbar">
            <button className="prof-settings-back" onClick={() => setView('menu')}>‹ Retour</button>
            <span className="prof-settings-title">Signaler un problème</span>
            <span />
          </div>

          {reportSent ? (
            <div className="prof-report-sent">
              <span className="prof-report-sent-icon">✅</span>
              <p>Merci ! Votre signalement a été envoyé.</p>
            </div>
          ) : (
            <div className="prof-report-form">
              <label className="prof-report-label">Type de problème</label>
              <div className="prof-report-types">
                {['Bug technique', 'Contenu inapproprié', 'Problème de compte', 'Autre'].map(t => (
                  <button
                    key={t}
                    className={`prof-report-type-btn ${selectedType === t ? 'active' : ''}`}
                    onClick={() => setSelectedType(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <label className="prof-report-label">Description</label>
              <textarea
                className="prof-report-textarea"
                placeholder="Décrivez le problème rencontré…"
                rows={4}
                value={reportText}
                onChange={e => setReportText(e.target.value)}
              />

              <button
                className="prof-report-send-btn"
                onClick={handleReport}
                disabled={!reportText.trim()}
              >
                🚨 Envoyer le signalement
              </button>
            </div>
          )}
        </>)}
      </div>
    </div>
  );
}

// ── Profile Page ─────────────────────────────────────────────────
export default function Profile() {
  const [tab, setTab] = useState('posts');
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="prof-frame">
      <div className="prof-scroll-area">

      {/* ── Header ── */}
      <div className="prof-topbar">
        <span className="prof-topbar-handle">{USER.handle}</span>
        <button
          className="prof-topbar-settings"
          title="Paramètres"
          onClick={() => setSettingsOpen(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </button>
      </div>

      {/* ── Identity block ── */}
      <div className="prof-identity">
        <div className="prof-avatar">{USER.emoji}</div>
        <div className="prof-id-right">
          <div className="prof-stats">
            <div className="prof-stat">
              <span className="prof-stat-val">{USER.stats.prayers}</span>
              <span className="prof-stat-lbl">Prières</span>
            </div>
            <div className="prof-stat">
              <span className="prof-stat-val">{USER.stats.groups}</span>
              <span className="prof-stat-lbl">Groupes</span>
            </div>
            <div className="prof-stat">
              <span className="prof-stat-val">{USER.stats.friends}</span>
              <span className="prof-stat-lbl">Amis</span>
            </div>
          </div>
          <button className="prof-edit-btn">Modifier le profil</button>
        </div>
      </div>

      {/* ── Bio block ── */}
      <div className="prof-bio-block">
        <span className="prof-name">{USER.name}</span>
        <p className="prof-bio">{USER.bio}</p>
        <div className="prof-church-row">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m18 7 4 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9l4-2"/><path d="M14 22v-4a2 2 0 0 0-4 0v4"/><path d="M18 22V5l-6-3-6 3v17"/><path d="M12 7v5"/><path d="M10 9h4"/>
          </svg>
          <span>{USER.church}</span>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="prof-tabs">
        <button className={`prof-tab${tab === 'posts' ? ' active' : ''}`} onClick={() => setTab('posts')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill={tab==='posts'?'currentColor':'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
          </svg>
        </button>
        <button className={`prof-tab${tab === 'reposts' ? ' active' : ''}`} onClick={() => setTab('reposts')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
          </svg>
        </button>
      </div>

      {/* ── Grid ── */}
      <div className="prof-grid">
        {tab === 'posts'   && MY_POSTS.map(p => <MiniCard key={p.id} {...p} />)}
        {tab === 'reposts' && REPOSTS.map(p  => <MiniCard key={p.id} {...p} repost />)}
      </div>

      <div style={{ height: 24 }} />
      </div>{/* end prof-scroll-area */}

      {/* ── Settings panel — at frame level so it covers full phone ── */}
      {settingsOpen && <SettingsPanel onClose={() => setSettingsOpen(false)} />}
    </div>
  );
}
