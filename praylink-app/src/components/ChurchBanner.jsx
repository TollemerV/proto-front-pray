import { useNavigate } from 'react-router-dom';
import churchPhoto from '../assets/church-photo.png';

// ── Mock — mettre null pour simuler "sans église" ────────────────
const MY_CHURCH = {
  id: 'bethel',
  name: 'Église Béthel Paris',
  location: 'Paris 8e',
  newPosts: 3,
  nextEvent: { label: 'Culte', date: 'Dim. 10h30' },
  lastPost: {
    author: 'Pasteur Samuel',
    time: 'Il y a 2h',
    content: '« Car je connais les projets que j\'ai formés sur vous, dit l\'Éternel, projets de paix et non de malheur. » — Jérémie 29:11',
    type: 'verse',
  },
};

export default function ChurchBanner() {
  const navigate = useNavigate();

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

  // ── Avec église ─────────────────────────────────────────────────
  return (
    <div className="cb-card-wrap">
      <p className="cb-card-label">⛪ Ma communauté</p>
      <div className="cb-card" onClick={() => navigate(`/community/${MY_CHURCH.id}`)}>

        {/* Header : photo + nom + badges */}
        <div className="cb-header">
          <img src={churchPhoto} alt={MY_CHURCH.name} className="cb-photo" />
          <div className="cb-header-info">
            <span className="cb-name">{MY_CHURCH.name}</span>
            <span className="cb-loc">📍 {MY_CHURCH.location}</span>
          </div>
          <div className="cb-badges">
            {MY_CHURCH.newPosts > 0 && (
              <span className="cb-badge cb-badge-new">
                🔔 {MY_CHURCH.newPosts} posts non lus
              </span>
            )}
            {MY_CHURCH.nextEvent && (
              <span className="cb-badge cb-badge-event">
                📅 {MY_CHURCH.nextEvent.date}
              </span>
            )}
          </div>
        </div>

        {/* Séparateur */}
        <div className="cb-sep" />

        {/* Dernier post / verset */}
        <div className="cb-last-post">
          <div className="cb-lp-meta">
            {MY_CHURCH.lastPost.type === 'verse' && (
              <span className="cb-lp-tag cb-lp-tag-verse">✨ Verset du jour</span>
            )}
            {MY_CHURCH.lastPost.type === 'post' && (
              <span className="cb-lp-tag cb-lp-tag-post">📝 Dernier post</span>
            )}
            {MY_CHURCH.lastPost.type === 'event' && (
              <span className="cb-lp-tag cb-lp-tag-event">📅 Événement</span>
            )}
            <span className="cb-lp-time">{MY_CHURCH.lastPost.time}</span>
          </div>
          <p className="cb-lp-content">{MY_CHURCH.lastPost.content}</p>
          <span className="cb-lp-author">— {MY_CHURCH.lastPost.author}</span>
        </div>

        {/* Voir → */}
        <div className="cb-see-more">
          <span>Voir l'église</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
          </svg>
        </div>

      </div>
    </div>
  );
}
