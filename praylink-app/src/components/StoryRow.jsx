import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

// Stories avec contenu (on exclut "Ma story" de la liste des viewables)
const ALL_STORIES = [
  { id: 0, name: 'Ma story', emoji: '＋', isAdd: true },
  {
    id: 1, name: 'Marie', emoji: '👩🏽',
    time: 'Il y a 15 min',
    badge: '🌍 Public',
    text: 'Merci de prier pour moi, j\'ai un examen très important demain matin 🙏 Je ressens beaucoup de stress mais je sais que Dieu est avec moi.',
    hashtags: ['priere', 'examen', 'confiance'],
    proof: '127 personnes prient pour toi',
  },
  {
    id: 2, name: 'David', emoji: '👨🏿',
    time: 'Il y a 1h',
    badge: '⛪ Église Béthel',
    text: '🎉 Après 3 ans de prière, j\'ai enfin trouvé un emploi ! Dieu est fidèle. Ne perdez jamais espoir, mes frères et sœurs.',
    hashtags: ['témoignage', 'fidélité'],
    proof: '342 personnes prient pour toi',
  },
  {
    id: 3, name: 'Sarah', emoji: '👩🏻',
    time: 'Il y a 3h',
    badge: '👥 Groupe Femmes',
    text: 'Sœurs en Christ, prions ensemble pour la guérison de ma mère. Elle traverse un moment difficile 💕',
    hashtags: ['guérison', 'prieredefamille'],
    proof: '89 personnes prient pour toi',
  },
  {
    id: 4, name: 'Jean', emoji: '👨🏽',
    time: 'Il y a 5h',
    badge: '⛪ Église Lumière',
    text: '« L\'Éternel est mon berger, je ne manquerai de rien. » — Psaume 23:1 ✨ Ce verset m\'accompagne chaque jour.',
    hashtags: ['versetdujour', 'psaume23'],
    proof: '210 personnes prient pour toi',
  },
  {
    id: 5, name: 'Esther', emoji: '👩🏾',
    time: 'Il y a 7h',
    badge: '🌍 Public',
    text: 'Que la paix de Dieu qui surpasse toute intelligence garde vos cœurs et vos pensées 🙏',
    hashtags: ['paix', 'foi'],
    proof: '54 personnes prient pour toi',
  },
];

// Stories viewables uniquement (sans "Ma story")
const VIEWABLE = ALL_STORIES.filter(s => !s.isAdd);
const DURATION = 6000; // ms par story

// ── Story Viewer ─────────────────────────────────────────────────
function StoryViewer({ startIndex, onClose }) {
  const [index, setIndex]   = useState(startIndex);
  const [prayed, setPrayed] = useState({});
  const [tick, setTick]     = useState(0); // force re-key pour réinitialiser la barre

  const story = VIEWABLE[index];
  const isLast = index === VIEWABLE.length - 1;

  // Avancer à la story suivante, ou quitter si c'est la dernière
  const goNext = useCallback(() => {
    if (index < VIEWABLE.length - 1) {
      setIndex(i => i + 1);
      setTick(t => t + 1);
    } else {
      onClose();
    }
  }, [index, onClose]);

  const goPrev = useCallback(() => {
    if (index > 0) {
      setIndex(i => i - 1);
      setTick(t => t + 1);
    }
  }, [index]);

  // Auto-avance après DURATION
  useEffect(() => {
    const t = setTimeout(goNext, DURATION);
    return () => clearTimeout(t);
  }, [goNext, tick]);

  // Fermer avec Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const container = document.querySelector('.mobile-frame') || document.body;

  return createPortal(
    <div className="story-overlay">

      {/* Barres de progression */}
      <div className="story-progress-bars">
        {VIEWABLE.map((s, i) => (
          <div key={s.id} className="story-progress-bar-bg">
            <div
              className="story-progress-bar-fill"
              style={{
                animationDuration: `${DURATION}ms`,
                animationPlayState: i === index ? 'running' : 'paused',
                width: i < index ? '100%' : '0%',
                ...(i === index ? { animation: `storyProgress ${DURATION}ms linear forwards` } : {}),
              }}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="story-header">
        <div className="story-header-avatar">{story.emoji}</div>
        <div className="story-header-info">
          <span className="story-header-name">{story.name}</span>
          <span className="story-header-time">{story.time}</span>
        </div>
        <button className="story-close-btn" onClick={onClose}>✕</button>
      </div>

      {/* Zones de tap gauche/droite pour navigation */}
      <div className="story-tap-zones">
        <div className="story-tap-left"  onClick={goPrev} />
        <div className="story-tap-right" onClick={goNext} />
      </div>

      {/* Contenu */}
      <div className="story-content">
        <div className="story-badge">{story.badge}</div>
        <p className="story-text">{story.text}</p>

        {story.hashtags?.length > 0 && (
          <div className="story-hashtags-row">
            {story.hashtags.map(tag => (
              <span key={tag} className="story-hashtag">#{tag}</span>
            ))}
          </div>
        )}

        {story.proof && (
          <div className="story-proof">
            🙏 <span>{story.proof}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="story-actions">
        <button
          className={`story-pray-btn${prayed[story.id] ? ' story-pray-btn--active' : ''}`}
          onClick={() => setPrayed(p => ({ ...p, [story.id]: !p[story.id] }))}
        >
          🙏 {prayed[story.id] ? 'Vous priez ✓' : 'Prier'}
        </button>
        <button className="story-share-btn" title="Partager">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>

    </div>,
    container
  );
}

// ── Story Row ────────────────────────────────────────────────────
export default function StoryRow() {
  const [viewerIndex, setViewerIndex] = useState(null); // null = fermé

  const handleClick = (story) => {
    if (story.isAdd) return;
    // Trouver l'index dans VIEWABLE
    const idx = VIEWABLE.findIndex(s => s.id === story.id);
    if (idx >= 0) setViewerIndex(idx);
  };

  return (
    <>
      <div className="stories-row">
        {ALL_STORIES.map((story) => (
          <div
            className="story-item"
            key={story.id}
            onClick={() => handleClick(story)}
          >
            <div className={`story-avatar${story.isAdd ? ' story-add' : ''}`}>
              <div className="avatar-placeholder">{story.emoji}</div>
            </div>
            <span className="story-name">{story.name}</span>
          </div>
        ))}
      </div>

      {viewerIndex !== null && (
        <StoryViewer
          startIndex={viewerIndex}
          onClose={() => setViewerIndex(null)}
        />
      )}
    </>
  );
}
