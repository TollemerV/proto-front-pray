import { useState } from 'react';
import { Icons } from './ChurchIcons';

const POST_TYPES = [
  { id: 'annonce',     emoji: '📣', label: 'Annonce',          desc: 'Partager une info à la communauté',   color: '#7B68EE', bg: 'rgba(123,104,238,0.1)' },
  { id: 'priere',      emoji: '🙏', label: 'Demande de prière', desc: 'Partager une intention de prière',    color: '#10B981', bg: 'rgba(16,185,129,0.1)'  },
  { id: 'message',     emoji: '💬', label: 'Message pastoral',  desc: 'Un message de la part du pasteur',    color: '#6B9FD4', bg: 'rgba(107,159,212,0.1)' },
  { id: 'evenement',   emoji: '📅', label: 'Événement',         desc: 'Mettre en avant un événement',        color: '#F59E0B', bg: 'rgba(245,158,11,0.1)'  },
  { id: 'temoignage',  emoji: '✨', label: 'Témoignage',        desc: 'Partager ce que Dieu a fait',         color: '#EC4899', bg: 'rgba(236,72,153,0.1)'  },
];

/* ── Step 1: type choice ── */
function StepType({ onSelect }) {
  return (
    <div className="cpw-step">
      <h2 className="cpw-step-title">Que souhaitez-vous publier ?</h2>
      <div className="cpw-type-list">
        {POST_TYPES.map(t => (
          <button
            key={t.id}
            className="cpw-type-card"
            onClick={() => onSelect(t)}
          >
            <span className="cpw-type-emoji" style={{ background: t.bg }}>{t.emoji}</span>
            <div className="cpw-type-info">
              <span className="cpw-type-label">{t.label}</span>
              <span className="cpw-type-desc">{t.desc}</span>
            </div>
            <span className="cpw-type-arrow">›</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Step 2: compose ── */
function StepCompose({ type, content, setContent, audience, setAudience }) {
  return (
    <div className="cpw-step">
      <div className="cpw-compose-header">
        <span className="cpw-compose-emoji" style={{ background: type.bg }}>{type.emoji}</span>
        <div>
          <div className="cpw-compose-type">{type.label}</div>
          <div className="cpw-compose-sub">{type.desc}</div>
        </div>
      </div>

      <label className="cpw-label">Message</label>
      <textarea
        className="cpw-textarea"
        placeholder={`Écrivez votre ${type.label.toLowerCase()}…`}
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={5}
        autoFocus
      />

      <label className="cpw-label" style={{ marginTop: 14 }}>Audience</label>
      <div className="cpw-audience-row">
        {['Tous les membres', 'Membres actifs', 'Responsables'].map(a => (
          <button
            key={a}
            className={`cpw-audience-pill ${audience === a ? 'active' : ''}`}
            onClick={() => setAudience(a)}
          >
            {a}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Step 3: confirm ── */
function StepConfirm({ type, content, audience }) {
  return (
    <div className="cpw-step cpw-step-confirm">
      <div className="cpw-confirm-icon">{type.emoji}</div>
      <h2 className="cpw-confirm-title">Tout est prêt !</h2>
      <p className="cpw-confirm-sub">Votre {type.label.toLowerCase()} sera visible par : <strong>{audience}</strong></p>
      <div className="cpw-confirm-preview">
        <p className="cpw-confirm-text">"{content}"</p>
      </div>
    </div>
  );
}

/* ── Main Wizard ── */
export default function CreatePostWizard({ onClose }) {
  const [step, setStep] = useState(1);   // 1=type, 2=compose, 3=confirm
  const [type, setType] = useState(null);
  const [content, setContent] = useState('');
  const [audience, setAudience] = useState('Tous les membres');
  const [published, setPublished] = useState(false);

  const handleSelectType = (t) => { setType(t); setStep(2); };

  const handlePublish = () => {
    setPublished(true);
    setTimeout(onClose, 1400);
  };

  if (published) {
    return (
      <div className="cpw-overlay">
        <div className="cpw-sheet">
          <div className="cpw-success">
            <span className="cpw-success-icon">✅</span>
            <span className="cpw-success-text">Publié avec succès !</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cpw-overlay" onClick={onClose}>
      <div className="cpw-sheet" onClick={e => e.stopPropagation()}>

        {/* ── Handle bar ── */}
        <div className="cpw-handle" />

        {/* ── Top bar ── */}
        <div className="cpw-topbar">
          {step > 1 ? (
            <button className="cpw-back-btn" onClick={() => setStep(s => s - 1)}>
              ‹ Retour
            </button>
          ) : <span />}
          <span className="cpw-step-counter">{step} / 3</span>
          <button className="cpw-close-btn" onClick={onClose}>✕</button>
        </div>

        {/* ── Step indicator ── */}
        <div className="cpw-progress">
          {[1, 2, 3].map(s => (
            <div
              key={s}
              className={`cpw-progress-dot ${step >= s ? 'active' : ''}`}
              style={step >= s ? { background: type?.color || '#7B68EE' } : {}}
            />
          ))}
        </div>

        {/* ── Steps ── */}
        {step === 1 && <StepType onSelect={handleSelectType} />}
        {step === 2 && (
          <StepCompose
            type={type}
            content={content}
            setContent={setContent}
            audience={audience}
            setAudience={setAudience}
          />
        )}
        {step === 3 && <StepConfirm type={type} content={content} audience={audience} />}

        {/* ── Footer ── */}
        {step === 2 && (
          <button
            className="cpw-next-btn"
            style={{ background: type?.color }}
            disabled={!content.trim()}
            onClick={() => setStep(3)}
          >
            Prévisualiser →
          </button>
        )}
        {step === 3 && (
          <button
            className="cpw-publish-btn"
            style={{ background: type?.color }}
            onClick={handlePublish}
          >
            🚀 Publier maintenant
          </button>
        )}
      </div>
    </div>
  );
}
