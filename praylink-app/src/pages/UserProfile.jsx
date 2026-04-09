import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

// ── Mock users database ─────────────────────────────────────────
const USERS_DB = {
  'marie-dupont': {
    name: 'Marie Dupont',
    handle: '@marie.d',
    emoji: '👩🏽',
    bio: 'Sœur en Christ 💕\nToujours là pour prier ensemble',
    church: 'Église Béthel Paris',
    stats: { prayers: 89, groups: 2, friends: 67 },
    posts: [
      { id: 1, time: 'Il y a 15 min', content: 'Merci de prier pour moi, j\'ai un examen très important demain matin 🙏 Je ressens beaucoup de stress mais je sais que Dieu est avec moi.', hashtags: ['priere', 'examen'], likes: 89, comments: 24 },
      { id: 2, time: 'Il y a 3j',     content: 'Tellement reconnaissante pour ma communauté de foi. Vous êtes ma famille 💕', hashtags: ['communaute', 'grace'], likes: 134, comments: 12 },
      { id: 3, time: 'Il y a 1 sem',  content: '« Ne vous inquiétez de rien; mais en toute chose faites connaître vos besoins à Dieu » — Philippiens 4:6', hashtags: ['versetdujour'], likes: 210, comments: 8 },
    ],
    reposts: [
      { id: 101, author: 'Pasteur Emmanuel', time: 'Il y a 2j', content: '« Car je connais les projets que j\'ai formés sur vous... » — Jérémie 29:11', hashtags: ['versetdujour'], likes: 412, comments: 67 },
      { id: 102, author: 'Sarah Martin', time: 'Il y a 5j', content: 'Belle réunion du groupe femmes ce matin. Merci à toutes 🌸', hashtags: ['groupefemmes'], likes: 98, comments: 18 },
    ],
  },
  'david-okafor': {
    name: 'David Okafor',
    handle: '@david.o',
    emoji: '👨🏿',
    bio: 'Serviteur de Dieu 🙌\nTémoigner de Sa fidélité',
    church: 'Église Béthel Paris',
    stats: { prayers: 342, groups: 4, friends: 128 },
    posts: [
      { id: 1, time: 'Il y a 1h',  content: '🎉 Témoignage : Après 3 ans de prière, j\'ai enfin trouvé un emploi ! Dieu est fidèle.', hashtags: ['témoignage', 'fidélité'], likes: 342, comments: 56 },
      { id: 2, time: 'Il y a 4j',  content: 'Groupe de louange ce soir — venez nombreux ! 🎶', hashtags: ['louange', 'eglise'], likes: 78, comments: 15 },
    ],
    reposts: [
      { id: 103, author: 'Marie Dupont', time: 'Il y a 2j', content: 'Merci de prier pour moi, j\'ai un examen très important demain matin 🙏', hashtags: ['priere'], likes: 89, comments: 24 },
    ],
  },
  'sarah-martin': {
    name: 'Sarah Martin',
    handle: '@sarah.m',
    emoji: '👩🏻',
    bio: 'Maman de 2 enfants 👦👧\nResponsable du groupe femmes',
    church: 'Église Béthel Paris',
    stats: { prayers: 156, groups: 3, friends: 89 },
    posts: [
      { id: 1, time: 'Il y a 3h',  content: 'Sœurs en Christ, prions ensemble pour la guérison de ma mère. Elle traverse un moment difficile. 💕', hashtags: ['guérison', 'prieredefamille'], likes: 156, comments: 31 },
      { id: 2, time: 'Il y a 5j',  content: 'Belle réunion du groupe femmes ce matin. Merci à toutes 🌸', hashtags: ['groupefemmes'], likes: 98, comments: 18 },
    ],
    reposts: [
      { id: 104, author: 'Église Béthel', time: 'Il y a 1 sem', content: 'Culte spécial dimanche prochain — tous sont invités 🎉', hashtags: ['culte', 'eglise'], likes: 210, comments: 45 },
    ],
  },
  'jean-pierre': {
    name: 'Jean-Pierre L.',
    handle: '@jeanpierre.l',
    emoji: '👨🏽',
    bio: 'Disciple du Christ ✝️\nPsaume 23 est mon bouclier',
    church: 'Église Lumière',
    stats: { prayers: 210, groups: 2, friends: 55 },
    posts: [
      { id: 1, time: 'Il y a 5h',  content: '« L\'Éternel est mon berger, je ne manquerai de rien. » — Psaume 23:1 ✨', hashtags: ['versetdujour', 'psaume23'], likes: 210, comments: 45 },
    ],
    reposts: [],
  },
  'pasteur-emmanuel': {
    name: 'Pasteur Emmanuel',
    handle: '@pasteur.e',
    emoji: '👨🏿',
    bio: 'Pasteur à l\'Église Béthel Paris\nServir et aimer comme Christ',
    church: 'Église Béthel Paris',
    stats: { prayers: 567, groups: 5, friends: 312 },
    posts: [
      { id: 1, time: 'Il y a 2h', content: '« Car je connais les projets que j\'ai formés sur vous, dit l\'Éternel, projets de paix et non de malheur. » — Jérémie 29:11', hashtags: ['versetdujour'], likes: 412, comments: 67 },
      { id: 2, time: 'Il y a 1j', content: 'Rappel : culte de Pâques ce dimanche. Amenez vos proches ! 🎉', hashtags: ['culte', 'paques'], likes: 234, comments: 45 },
    ],
    reposts: [
      { id: 105, author: 'David Okafor', time: 'Il y a 3j', content: '🎉 Témoignage : Après 3 ans de prière, j\'ai enfin trouvé un emploi ! Dieu est fidèle.', hashtags: ['témoignage'], likes: 342, comments: 56 },
      { id: 106, author: 'Marie Dupont', time: 'Il y a 1 sem', content: 'Tellement reconnaissante pour ma communauté de foi. Vous êtes ma famille 💕', hashtags: ['communaute'], likes: 134, comments: 12 },
    ],
  },
};

// Fallback for unknown users
const DEFAULT_USER = {
  name: 'Utilisateur',
  handle: '@user',
  emoji: '👤',
  bio: 'Membre de la communauté',
  church: 'Église Béthel Paris',
  stats: { prayers: 0, groups: 0, friends: 0 },
  posts: [],
  reposts: [],
};

// ── Mini PostCard ────────────────────────────────────────────────
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

// ── User Profile Page ────────────────────────────────────────────
export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = USERS_DB[id] || DEFAULT_USER;
  const [following, setFollowing] = useState(false);
  const [tab, setTab] = useState('posts');

  return (
    <div className="prof-frame">
      <div className="prof-scroll-area">

      {/* ── Header with back button ── */}
      <div className="prof-topbar">
        <button className="prof-topbar-back" onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>
        <span className="prof-topbar-handle">{user.handle}</span>
        <span style={{ width: 20 }} />
      </div>

      {/* ── Identity block ── */}
      <div className="prof-identity">
        <div className="prof-avatar">{user.emoji}</div>
        <div className="prof-id-right">
          <div className="prof-stats">
            <div className="prof-stat">
              <span className="prof-stat-val">{user.stats.prayers}</span>
              <span className="prof-stat-lbl">Prières</span>
            </div>
            <div className="prof-stat">
              <span className="prof-stat-val">{user.stats.groups}</span>
              <span className="prof-stat-lbl">Groupes</span>
            </div>
            <div className="prof-stat">
              <span className="prof-stat-val">{user.stats.friends}</span>
              <span className="prof-stat-lbl">Amis</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bio block ── */}
      <div className="prof-bio-block">
        <span className="prof-name">{user.name}</span>
        <p className="prof-bio">{user.bio}</p>
        <div className="prof-church-row">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m18 7 4 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9l4-2"/><path d="M14 22v-4a2 2 0 0 0-4 0v4"/><path d="M18 22V5l-6-3-6 3v17"/><path d="M12 7v5"/><path d="M10 9h4"/>
          </svg>
          <span>{user.church}</span>
        </div>
      </div>

      {/* ── Action buttons ── */}
      <div className="prof-user-actions">
        <button
          className={`prof-follow-btn-large${following ? ' following' : ''}`}
          onClick={() => setFollowing(v => !v)}
        >
          {following ? '✓ Abonné(e)' : '+ Suivre'}
        </button>
        <button className="prof-message-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          Message
        </button>
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
        {tab === 'posts' && user.posts.length === 0 && (
          <div className="prof-empty-state">
            <span>📝</span>
            <p>Aucune publication pour le moment</p>
          </div>
        )}
        {tab === 'posts' && user.posts.map(p => <MiniCard key={p.id} {...p} />)}
        {tab === 'reposts' && (user.reposts || []).length === 0 && (
          <div className="prof-empty-state">
            <span>↺</span>
            <p>Aucune republication</p>
          </div>
        )}
        {tab === 'reposts' && (user.reposts || []).map(p => <MiniCard key={p.id} {...p} repost />)}
      </div>

      <div style={{ height: 24 }} />
      </div>{/* end prof-scroll-area */}
    </div>
  );
}
