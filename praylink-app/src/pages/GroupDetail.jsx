import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';
import ShareSheet from '../components/ShareSheet';
import '../styles/Church.css';

/* ── Mock Group Data ───────────────────────────────────────────── */
const GROUPS_DB = {
  'priere-soir': {
    name: 'Groupe prière du soir',
    emoji: '🙏',
    description: '"Chaque soir, prions ensemble pour nos familles et notre communauté."',
    gradient: ['#7B68EE', '#5B4FCF', '#9B8DFC'],
    stats: { members: 34, prayers: 156, posts: 48 },
    admins: ['Marie Dupont', 'Pasteur Emmanuel'],
    members: [
      { emoji: '👩🏽', name: 'Marie D.', role: 'Admin', active: true, slug: 'marie-dupont' },
      { emoji: '👨🏿', name: 'Pasteur Emmanuel', role: 'Admin', active: true, slug: 'pasteur-emmanuel' },
      { emoji: '👩🏾', name: 'Esther M.', role: 'Membre', active: true, slug: 'esther-mbeki' },
      { emoji: '👨🏻', name: 'Thomas B.', role: 'Membre', active: false, slug: 'thomas-bernard' },
      { emoji: '👩🏻', name: 'Sarah M.', role: 'Membre', active: true, slug: 'sarah-martin' },
    ],
    posts: [
      { avatar: '👩🏽', avatarColor: 'blue', username: 'Marie Dupont', time: 'Il y a 30 min', content: 'Ce soir, prions pour la guérison de mon père. Merci pour vos prières qui me portent chaque jour 🙏💕', comments: 12, likes: 45 },
      { avatar: '👨🏿', avatarColor: 'gold', username: 'Pasteur Emmanuel', badge: '👑 Admin', badgeType: 'church', time: 'Il y a 2h', content: 'Rappel : notre chaîne de prière continue ce soir à 21h. Connectons nos cœurs dans la prière. « Là où deux ou trois sont assemblés en mon nom, je suis au milieu d\'eux. » — Matthieu 18:20', comments: 8, likes: 67 },
    ],
    prayers: [
      { avatar: '👩🏽', avatarBg: 'var(--accent-blue-light)', name: 'Marie Dupont', time: 'Il y a 30 min', text: 'Priez pour la guérison de mon père qui est hospitalisé. Merci pour votre soutien 🙏', count: 45, status: 'en_cours' },
      { avatar: '👨🏻', avatarBg: 'var(--accent-gold-light)', name: 'Thomas Bernard', time: 'Il y a 2h', text: 'Prions pour la paix dans nos familles. Que l\'amour de Dieu règne dans chaque foyer 🏠', count: 23, status: 'en_cours' },
      { avatar: '👩🏾', avatarBg: 'var(--accent-pray-light)', name: 'Esther Mbeki', time: 'Hier', text: 'Mon examen s\'est très bien passé ! Gloire à Dieu, merci pour toutes vos prières 🙌', count: 67, status: 'exaucee' },
    ],
  },
  'entrepreneurs': {
    name: 'Entrepreneurs chrétiens',
    emoji: '💼',
    description: '"S\'encourager et prier ensemble dans nos parcours professionnels."',
    gradient: ['#6B9FD4', '#4A8BC2', '#5B8DD4'],
    stats: { members: 89, prayers: 234, posts: 112 },
    admins: ['David Okafor'],
    members: [
      { emoji: '👨🏿', name: 'David O.', role: 'Admin', active: true, slug: 'david-okafor' },
      { emoji: '👩🏽', name: 'Marie D.', role: 'Membre', active: true, slug: 'marie-dupont' },
      { emoji: '👨🏽', name: 'Jean-Pierre L.', role: 'Membre', active: false, slug: 'jean-pierre' },
      { emoji: '👩🏻', name: 'Sarah M.', role: 'Membre', active: true, slug: 'sarah-martin' },
    ],
    posts: [
      { avatar: '👨🏿', avatarColor: 'gold', username: 'David Okafor', badge: '👑 Admin', badgeType: 'church', time: 'Il y a 1h', content: '🎉 Témoignage business : Après 6 mois de prière et de travail, mon entreprise vient de décrocher son premier gros contrat ! Dieu est fidèle dans nos projets professionnels.', comments: 34, likes: 178 },
      { avatar: '👩🏻', avatarColor: 'purple', username: 'Sarah Martin', time: 'Il y a 5h', content: 'Sœurs et frères entrepreneurs, prions pour nos projets cette semaine. Que Dieu guide nos décisions et bénisse le travail de nos mains 🙌', comments: 15, likes: 56 },
    ],
    prayers: [
      { avatar: '👨🏿', avatarBg: 'var(--accent-blue-light)', name: 'David Okafor', time: 'Il y a 1h', text: 'Prions pour tous les entrepreneurs chrétiens qui lancent leur activité. Que Dieu leur donne sagesse et persévérance 💼', count: 89, status: 'en_cours' },
      { avatar: '👩🏻', avatarBg: 'var(--accent-gold-light)', name: 'Sarah Martin', time: 'Il y a 3h', text: 'Mon entretien d\'embauche s\'est très bien passé 🎉 Merci pour vos prières !', count: 34, status: 'exaucee' },
    ],
  },
};

const DEFAULT_GROUP = GROUPS_DB['priere-soir'];

/* ── Prayer Request (inline) ─────────────────────────────────── */
function GroupPrayerRequest({ avatar, avatarBg, name, time, text, count, status }) {
  const [prayed, setPrayed] = useState(false);
  return (
    <div className={`prayer-request status-${status}`}>
      <div className="prayer-request-header">
        <div className="prayer-request-avatar" style={{ background: avatarBg }}>{avatar}</div>
        <div className="prayer-request-info-wrapper">
          <div className="prayer-request-name-row">
            <span className="prayer-request-name">{name}</span>
            <span className={`prayer-status-badge ${status}`}>
              {status === 'en_cours' ? '🔵 En cours' : '✅ Exaucée'}
            </span>
          </div>
          <span className="prayer-request-time">{time}</span>
        </div>
      </div>
      <p className="prayer-request-text">{text}</p>
      <div className="prayer-request-footer">
        <div className="prayer-count-group">
          <span className="prayer-count">🙏 {count + (prayed ? 1 : 0)} prières</span>
        </div>
        <button
          className={`pray-modern-btn ${prayed ? 'active' : ''}`}
          onClick={() => setPrayed(v => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill={prayed ? 'rgba(123,104,238,0.15)' : 'none'} stroke={prayed ? 'var(--accent-pray)' : 'var(--text-tertiary)'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 11c0-1 .5-3 2.5-3s2.5 2 2.5 3m0 0c0-1 .5-3 2.5-3s2.5 2 2.5 3M12 11v5m0 0l-2 3m2-3l2 3M8 8V6m8 2V6"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ── Members inline list ────────────────────────────────────── */
function GroupMemberRow({ member, onNavigate }) {
  const [following, setFollowing] = useState(false);
  return (
    <div className="member-card">
      <div className="member-avatar-wrapper" onClick={() => onNavigate(member.slug)} style={{ cursor: 'pointer' }}>
        <div className="member-avatar" style={{ background: member.role === 'Admin' ? 'var(--accent-gold-light)' : 'var(--accent-pray-light)' }}>{member.emoji}</div>
        {member.active && <div className="member-active-badge" />}
      </div>
      <div className="member-info" onClick={() => onNavigate(member.slug)} style={{ cursor: 'pointer' }}>
        <div className="member-name">{member.name}</div>
        <div className="member-role">{member.role}</div>
      </div>
      <div className="member-actions">
        <button
          className={`member-action-btn follow ${following ? 'active' : ''}`}
          onClick={() => setFollowing(v => !v)}
        >
          {following ? '✓ Suivi' : '+ Suivre'}
        </button>
      </div>
    </div>
  );
}

/* ── Group Detail Page ─────────────────────────────────────── */
export default function GroupDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const group = GROUPS_DB[id] || DEFAULT_GROUP;
  const [activeTab, setActiveTab] = useState('wall');
  const [joined, setJoined] = useState(false);
  const [sharingPost, setSharingPost] = useState(null);

  const tabs = [
    { id: 'wall', label: 'Mur', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg> },
    { id: 'prayers', label: 'Prières', hasNotification: true, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> },
    { id: 'members', label: 'Membres', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  ];

  return (
    <div className="feed-frame">
      <div className="feed-scroll-area" style={{ position: 'relative' }}>

        {/* ── Cover ── */}
        <div className="church-cover">
          <div className="church-cover-gradient" style={{
            background: `linear-gradient(135deg, ${group.gradient[0]}, ${group.gradient[1]}, ${group.gradient[2]})`
          }} />
          <div className="church-cover-overlay" />
          <button
            onClick={() => navigate('/communities')}
            style={{
              position: 'absolute', top: '20px', left: '20px', zIndex: 100,
              width: '36px', height: '36px', borderRadius: '50%',
              backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)',
              border: 'none', color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
        </div>

        {/* ── Info ── */}
        <div className="church-info">
          <div className="church-icon-container">{group.emoji}</div>

          <h1 className="church-name">{group.name}</h1>
          <p className="church-slogan">{group.description}</p>

          <div className="church-indicators-group">
            <div className="church-live-indicator">
              <span className="live-dot" />
              <span className="live-text">{group.members.filter(m => m.active).length} membres actifs</span>
            </div>
            <div className="church-prayer-indicator">
              <span className="prayer-text">🙏 {group.stats.prayers} prières partagées</span>
            </div>
          </div>

          <div className="church-stats" style={{ marginTop: '16px' }}>
            <div className="church-stat">
              <span className="church-stat-value">{group.stats.members}</span>
              <span className="church-stat-label">Membres</span>
            </div>
            <div className="church-stat">
              <span className="church-stat-value">{group.stats.prayers}</span>
              <span className="church-stat-label">Prières</span>
            </div>
            <div className="church-stat">
              <span className="church-stat-value">{group.stats.posts}</span>
              <span className="church-stat-label">Posts</span>
            </div>
          </div>

          <div className="church-actions">
            <button
              className={`church-btn ${joined ? 'secondary' : 'primary'}`}
              onClick={() => setJoined(v => !v)}
            >
              {joined ? '✓ Membre' : '+ Rejoindre'}
            </button>
            <button className="church-btn secondary">💬 Inviter</button>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="church-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`church-tab${activeTab === tab.id ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="church-tab-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {tab.icon}
              </span>
              <span className="church-tab-label">{tab.label}</span>
              {tab.hasNotification && <span className="tab-notification-dot" />}
            </button>
          ))}
        </div>

        {/* Tab: Mur */}
        <div className={`church-tab-content${activeTab === 'wall' ? ' active' : ''}`}>
          <div className="feed-container" style={{ padding: 0 }}>
            {group.posts.map((post, i) => (
              <PostCard
                key={i}
                {...post}
                onShare={() => setSharingPost({ avatar: post.avatar, username: post.username, content: post.content })}
              />
            ))}
          </div>
        </div>

        {/* Tab: Prières */}
        <div className={`church-tab-content${activeTab === 'prayers' ? ' active' : ''}`}>
          <button className="ask-prayer-cta-btn">
            <span className="text">🙏 Demander une prière</span>
          </button>
          <div className="section-title highlight-title">⭐ Prière du moment</div>
          <GroupPrayerRequest {...group.prayers[0]} />
          <div className="section-title" style={{ marginTop: '24px' }}>Récents</div>
          {group.prayers.slice(1).map((prayer, i) => (
            <GroupPrayerRequest key={i} {...prayer} />
          ))}
        </div>

        {/* Tab: Membres */}
        <div className={`church-tab-content${activeTab === 'members' ? ' active' : ''}`}>
          <div className="members-list">
            {group.members.map((m, i) => (
              <GroupMemberRow key={i} member={m} onNavigate={(slug) => navigate(`/user/${slug}`)} />
            ))}
          </div>
        </div>

        <div style={{ height: 20 }} />
      </div>

      {/* Share sheet */}
      {sharingPost && (
        <ShareSheet
          post={sharingPost}
          onClose={() => setSharingPost(null)}
        />
      )}
    </div>
  );
}
