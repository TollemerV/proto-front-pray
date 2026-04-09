import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import churchPhoto from '../assets/church-photo.png';

// ── Mock — mettre null pour simuler "sans église" ────────────────
const MY_CHURCH = {
  id: 'bethel',
  name: 'Église Béthel Paris',
  location: 'Paris 8e',
  newPosts: 3,
  nextEvent: { label: 'Culte', date: 'Dim. 10h30' },
  verse: {
    text: '« Car je connais les projets que j\'ai formés sur vous, dit l\'Éternel, projets de paix et non de malheur. »',
    ref: 'Jérémie 29:11',
  },
};

export default function ChurchBanner() {
  const navigate = useNavigate();
  const [verseExpanded, setVerseExpanded] = useState(false);

  // ── Sans église ─────────────────────────────────────────────────
  if (!MY_CHURCH) {
    return (
      <div className="church-banner-empty">
        <div className="cbe-icon">⛪</div>
        <div className="cbe-text">
          <span className="cbe-title">Pas encore dans une église ?</span>
          <span className="cbe-sub">Rejoignez votre communauté de foi</span>
        </div>
        <button className="cbe-btn" onClick={() => navigate('/communities')}>
          Explorer →
        </button>
      </div>
    );
  }

  // ── Avec église — Story-style Hub ─────────────────────────────
  return (
    <div className="cb-hub">
      {/* Top row: church identity */}
      <div
        className="cb-hub-header"
        onClick={() => navigate(`/community/${MY_CHURCH.id}`)}
      >
        <div className="cb-hub-avatar-ring">
          <img src={churchPhoto} alt={MY_CHURCH.name} className="cb-hub-avatar" />
        </div>
        <div className="cb-hub-info">
          <span className="cb-hub-name">{MY_CHURCH.name}</span>
          <span className="cb-hub-loc">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            {MY_CHURCH.location}
          </span>
        </div>
        <div className="cb-hub-arrow">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </div>
      </div>

      {/* Scrollable mini-cards */}
      <div className="cb-hub-cards">
        {/* Next event */}
        {MY_CHURCH.nextEvent && (
          <div
            className="cb-mini-card cb-mini-event"
            onClick={() => navigate(`/community/${MY_CHURCH.id}`)}
          >
            <div className="cb-mini-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
              </svg>
            </div>
            <div className="cb-mini-text">
              <span className="cb-mini-label">{MY_CHURCH.nextEvent.label}</span>
              <span className="cb-mini-value">{MY_CHURCH.nextEvent.date}</span>
            </div>
          </div>
        )}

        {/* Unread posts */}
        {MY_CHURCH.newPosts > 0 && (
          <div
            className="cb-mini-card cb-mini-notif"
            onClick={() => navigate(`/community/${MY_CHURCH.id}`)}
          >
            <div className="cb-mini-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
              </svg>
              <span className="cb-mini-dot" />
            </div>
            <div className="cb-mini-text">
              <span className="cb-mini-label">{MY_CHURCH.newPosts} non lus</span>
              <span className="cb-mini-value">Nouveautés</span>
            </div>
          </div>
        )}

        {/* Verse of the day */}
        {MY_CHURCH.verse && (
          <div
            className="cb-mini-card cb-mini-verse"
            onClick={() => setVerseExpanded(!verseExpanded)}
          >
            <div className="cb-mini-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
              </svg>
            </div>
            <div className="cb-mini-text">
              <span className="cb-mini-label">Verset du jour</span>
              <span className="cb-mini-value">{MY_CHURCH.verse.ref}</span>
            </div>
          </div>
        )}
      </div>

      {/* Verse expanded panel */}
      {verseExpanded && MY_CHURCH.verse && (
        <div className="cb-verse-expand" onClick={() => setVerseExpanded(false)}>
          <p className="cb-verse-text">{MY_CHURCH.verse.text}</p>
          <span className="cb-verse-ref">— {MY_CHURCH.verse.ref}</span>
        </div>
      )}
    </div>
  );
}
