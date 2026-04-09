import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Search.css';

/* ── Mock search data ──────────────────────────────────────────── */
const SEARCH_DATA = {
  people: [
    { id: 'marie-dupont',       emoji: '👩🏽', name: 'Marie Dupont',       sub: 'Membre · Église Béthel', mutual: 3 },
    { id: 'david-okafor',       emoji: '👨🏿', name: 'David Okafor',       sub: 'Membre · Église Béthel', mutual: 5 },
    { id: 'sarah-martin',       emoji: '👩🏻', name: 'Sarah Martin',       sub: 'Responsable Femmes', mutual: 2 },
    { id: 'jean-pierre',        emoji: '👨🏽', name: 'Jean-Pierre L.',     sub: 'Membre · Église Lumière', mutual: 0 },
    { id: 'pasteur-emmanuel',    emoji: '👨🏿', name: 'Pasteur Emmanuel',   sub: 'Pasteur · Église Béthel', mutual: 8 },
    { id: 'esther-mbeki',       emoji: '👩🏾', name: 'Esther Mbeki',       sub: 'Choriste · Église Béthel', mutual: 4 },
    { id: 'thomas-bernard',     emoji: '👨🏻', name: 'Thomas Bernard',     sub: 'Membre · Église Béthel', mutual: 1 },
  ],
  groups: [
    { id: 'priere-soir',    emoji: '🙏', name: 'Groupe prière du soir',   members: 34,  type: 'group' },
    { id: 'entrepreneurs',  emoji: '💼', name: 'Entrepreneurs chrétiens',  members: 89,  type: 'group' },
    { id: 'louange',        emoji: '🎵', name: 'Équipe de louange',        members: 18,  type: 'group' },
    { id: 'jeunes',         emoji: '🔥', name: 'Groupe de jeunes 15-25',   members: 42,  type: 'group' },
    { id: 'mamans',         emoji: '👶', name: 'Mamans en prière',         members: 27,  type: 'group' },
  ],
  churches: [
    { id: 'bethel',    emoji: '⛪', name: 'Église Béthel Paris',      location: 'Paris 11e',    members: 1247 },
    { id: 'lumiere',   emoji: '🕊️', name: 'Église Lumière',           location: 'Paris 15e',    members: 834 },
    { id: 'grace',     emoji: '✝️', name: 'Église de la Grâce',       location: 'Lyon 3e',      members: 567 },
    { id: 'esperance', emoji: '🌟', name: 'Communauté Espérance',     location: 'Marseille 6e', members: 412 },
  ],
  posts: [
    { id: 1, author: 'Marie Dupont',      emoji: '👩🏽', content: 'Merci de prier pour moi, j\'ai un examen très important demain matin 🙏',           hashtags: ['priere', 'examen'], likes: 89 },
    { id: 2, author: 'David Okafor',      emoji: '👨🏿', content: '🎉 Témoignage : Après 3 ans de prière, j\'ai enfin trouvé un emploi !',             hashtags: ['témoignage', 'emploi'], likes: 342 },
    { id: 3, author: 'Sarah Martin',      emoji: '👩🏻', content: 'Sœurs en Christ, prions ensemble pour la guérison de ma mère 💕',                   hashtags: ['guérison', 'priere'], likes: 156 },
    { id: 4, author: 'Pasteur Emmanuel',  emoji: '👨🏿', content: '« Car je connais les projets que j\'ai formés sur vous... » — Jérémie 29:11',       hashtags: ['versetdujour'], likes: 412 },
    { id: 5, author: 'Église Béthel',     emoji: '⛪',  content: 'Culte spécial dimanche prochain — tous sont invités 🎉',                             hashtags: ['culte', 'eglise'], likes: 210 },
    { id: 6, author: 'Jean-Pierre L.',    emoji: '👨🏽', content: '« L\'Éternel est mon berger, je ne manquerai de rien. » — Psaume 23:1 ✨',           hashtags: ['versetdujour', 'psaume23'], likes: 210 },
  ],
};

const CATEGORIES = [
  { id: 'all',      label: 'Tout',     icon: '🔍' },
  { id: 'people',   label: 'Personnes', icon: '👤' },
  { id: 'groups',   label: 'Groupes',  icon: '👥' },
  { id: 'churches', label: 'Églises',  icon: '⛪' },
  { id: 'posts',    label: 'Posts',    icon: '📝' },
];

const TRENDING = ['priere', 'témoignage', 'versetdujour', 'louange', 'communaute'];

/* ── Search Overlay ──────────────────────────────────────────── */
export default function SearchOverlay({ onClose }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [following, setFollowing] = useState({});
  const [joined, setJoined] = useState({});
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const q = query.toLowerCase().trim();

  /* ── Filtering ── */
  const filteredPeople = SEARCH_DATA.people.filter(p =>
    p.name.toLowerCase().includes(q) || p.sub.toLowerCase().includes(q)
  );
  const filteredGroups = SEARCH_DATA.groups.filter(g =>
    g.name.toLowerCase().includes(q)
  );
  const filteredChurches = SEARCH_DATA.churches.filter(c =>
    c.name.toLowerCase().includes(q) || c.location.toLowerCase().includes(q)
  );
  const filteredPosts = SEARCH_DATA.posts.filter(p =>
    p.content.toLowerCase().includes(q) ||
    p.author.toLowerCase().includes(q) ||
    p.hashtags.some(h => h.toLowerCase().includes(q))
  );

  const hasResults = filteredPeople.length + filteredGroups.length + filteredChurches.length + filteredPosts.length > 0;

  const showPeople   = (category === 'all' || category === 'people')   && filteredPeople.length > 0;
  const showGroups   = (category === 'all' || category === 'groups')   && filteredGroups.length > 0;
  const showChurches = (category === 'all' || category === 'churches') && filteredChurches.length > 0;
  const showPosts    = (category === 'all' || category === 'posts')    && filteredPosts.length > 0;

  const handleNavigate = (path) => {
    onClose();
    navigate(path);
  };

  const toggleFollow = (id) => setFollowing(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleJoin = (id) => setJoined(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="search-overlay">
      {/* ── Search bar ── */}
      <div className="search-bar">
        <button className="search-back" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>
        <div className="search-input-wrap">
          <svg className="search-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            ref={inputRef}
            className="search-input"
            placeholder="Rechercher…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <button className="search-clear" onClick={() => setQuery('')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* ── Category pills ── */}
      <div className="search-categories">
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            className={`search-cat-pill${category === c.id ? ' active' : ''}`}
            onClick={() => setCategory(c.id)}
          >
            <span>{c.icon}</span>
            <span>{c.label}</span>
          </button>
        ))}
      </div>

      {/* ── Content ── */}
      <div className="search-results">

        {/* Empty state / trending when no query */}
        {!q && (
          <div className="search-trending">
            <h3 className="search-section-title">🔥 Tendances</h3>
            <div className="search-trending-tags">
              {TRENDING.map(tag => (
                <button key={tag} className="search-trending-tag" onClick={() => setQuery(tag)}>
                  #{tag}
                </button>
              ))}
            </div>

            <h3 className="search-section-title" style={{ marginTop: 20 }}>💡 Suggestions</h3>
            {SEARCH_DATA.people.slice(0, 3).map(p => (
              <div key={p.id} className="search-person-row" onClick={() => handleNavigate(`/user/${p.id}`)}>
                <div className="search-person-avatar">{p.emoji}</div>
                <div className="search-person-info">
                  <span className="search-person-name">{p.name}</span>
                  <span className="search-person-sub">{p.sub}</span>
                </div>
                <button
                  className={`search-follow-btn${following[p.id] ? ' active' : ''}`}
                  onClick={e => { e.stopPropagation(); toggleFollow(p.id); }}
                >
                  {following[p.id] ? '✓' : '+'}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* No results */}
        {q && !hasResults && (
          <div className="search-empty">
            <span>🔍</span>
            <p>Aucun résultat pour « {query} »</p>
          </div>
        )}

        {/* ── People ── */}
        {q && showPeople && (
          <div className="search-section">
            <h3 className="search-section-title">👤 Personnes</h3>
            {filteredPeople.slice(0, category === 'people' ? 20 : 3).map(p => (
              <div key={p.id} className="search-person-row" onClick={() => handleNavigate(`/user/${p.id}`)}>
                <div className="search-person-avatar">{p.emoji}</div>
                <div className="search-person-info">
                  <span className="search-person-name">{p.name}</span>
                  <span className="search-person-sub">{p.sub}</span>
                  {p.mutual > 0 && <span className="search-person-mutual">{p.mutual} amis en commun</span>}
                </div>
                <button
                  className={`search-follow-btn${following[p.id] ? ' active' : ''}`}
                  onClick={e => { e.stopPropagation(); toggleFollow(p.id); }}
                >
                  {following[p.id] ? '✓' : '+'}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ── Groups ── */}
        {q && showGroups && (
          <div className="search-section">
            <h3 className="search-section-title">👥 Groupes</h3>
            {filteredGroups.slice(0, category === 'groups' ? 20 : 3).map(g => (
              <div key={g.id} className="search-group-row" onClick={() => handleNavigate(`/group/${g.id}`)}>
                <div className="search-group-emoji">{g.emoji}</div>
                <div className="search-group-info">
                  <span className="search-group-name">{g.name}</span>
                  <span className="search-group-meta">{g.members} membres</span>
                </div>
                <button
                  className={`search-join-btn${joined[g.id] ? ' active' : ''}`}
                  onClick={e => { e.stopPropagation(); toggleJoin(g.id); }}
                >
                  {joined[g.id] ? '✓ Membre' : 'Rejoindre'}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ── Churches ── */}
        {q && showChurches && (
          <div className="search-section">
            <h3 className="search-section-title">⛪ Églises</h3>
            {filteredChurches.slice(0, category === 'churches' ? 20 : 3).map(c => (
              <div key={c.id} className="search-church-row" onClick={() => handleNavigate(`/community/${c.id}`)}>
                <div className="search-church-emoji">{c.emoji}</div>
                <div className="search-church-info">
                  <span className="search-church-name">{c.name}</span>
                  <span className="search-church-meta">📍 {c.location} · {c.members.toLocaleString()} membres</span>
                </div>
                <button
                  className={`search-join-btn${joined[c.id] ? ' active' : ''}`}
                  onClick={e => { e.stopPropagation(); toggleJoin(c.id); }}
                >
                  {joined[c.id] ? '✓ Rejoint' : 'Rejoindre'}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ── Posts ── */}
        {q && showPosts && (
          <div className="search-section">
            <h3 className="search-section-title">📝 Publications</h3>
            {filteredPosts.slice(0, category === 'posts' ? 20 : 3).map(p => (
              <div key={p.id} className="search-post-row" onClick={() => handleNavigate('/feed')}>
                <div className="search-post-avatar">{p.emoji}</div>
                <div className="search-post-info">
                  <span className="search-post-author">{p.author}</span>
                  <p className="search-post-content">{p.content}</p>
                  <div className="search-post-footer">
                    {p.hashtags.map(h => <span key={h} className="search-post-tag">#{h}</span>)}
                    <span className="search-post-likes">🙏 {p.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
