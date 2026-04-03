import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Onboarding.css';
import logoImg from '../assets/logo-1.png';

// ── Step IDs ────────────────────────────────────────────────────
const STEPS = [
  'splash',
  'auth-method',
  'email',
  'password',
  'name',
  'confession',
  'photo',
  'church',
  'intentions',
  'welcome',
];

// ── Confession icons as SVG components ─────────────────────────
function CrossLatin() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="5" y1="8" x2="19" y2="8" />
    </svg>
  );
}
function CrossOrthodox() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="5" y1="7" x2="19" y2="7" />
      <line x1="7" y1="14" x2="17" y2="14" />
    </svg>
  );
}
function CrossProtestant() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <line x1="12" y1="3" x2="12" y2="21" />
      <line x1="4" y1="10" x2="20" y2="10" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
function LeafIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8C8 10 5.9 16.17 3.82 19.82a1 1 0 0 0 1.35 1.35C8.72 19.08 14.5 17 17 8z" />
      <path d="M17 8C17 8 19 14 12 19" />
    </svg>
  );
}

const CONFESSIONS = [
  { id: 'catholique',  Icon: CrossLatin,     label: 'Catholique',   sub: 'Tradition romaine',                    color: '#7B68EE' },
  { id: 'protestant',  Icon: CrossProtestant, label: 'Protestant',   sub: 'Réformé, Baptiste, Évangélique…',       color: '#6B9FD4' },
  { id: 'orthodoxe',   Icon: CrossOrthodox,  label: 'Orthodoxe',    sub: 'Grec, Russe, Copte…',                   color: '#D4A94B' },
  { id: 'sais-pas',    Icon: HeartIcon,      label: 'Je ne sais pas encore', sub: 'En chemin',                   color: '#9CA3AF' },
  { id: 'peu-importe', Icon: LeafIcon,       label: 'Peu importe',  sub: 'Je cherche avant tout la communauté',   color: '#4ECDC4' },
];

const INTENTIONS = [
  { id: 'sante',    icon: '❤️‍🩹', label: 'Santé' },
  { id: 'famille',  icon: '👨‍👩‍👧', label: 'Famille' },
  { id: 'travail',  icon: '💼',  label: 'Travail' },
  { id: 'foi',      icon: '✨',  label: 'Foi' },
  { id: 'paix',     icon: '🕊️',  label: 'Paix' },
  { id: 'amour',    icon: '💝',  label: 'Amour' },
  { id: 'sagesse',  icon: '🌿',  label: 'Sagesse' },
  { id: 'autre',    icon: '🙏',  label: 'Autre' },
];

const MOCK_CHURCHES = [
  { id: 1, name: 'Église Saint-Pierre', loc: 'Paris 8e' },
  { id: 2, name: 'Communauté Évangélique du Marais', loc: 'Paris 4e' },
  { id: 3, name: 'Paroisse Notre-Dame de Grâce', loc: 'Versailles' },
  { id: 4, name: 'Église Protestante Unie', loc: 'Lyon 2e' },
];

// ── Icons ────────────────────────────────────────────────────────
function ArrowLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function EyeIcon({ open }) {
  return open ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ── Main Component ───────────────────────────────────────────────
export default function Onboarding() {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const [animClass, setAnimClass] = useState('enter');
  const [goingBack, setGoingBack] = useState(false);

  // form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confession, setConfession] = useState('');
  const [photo, setPhoto] = useState(null);
  const [churchQuery, setChurchQuery] = useState('');
  const [selectedChurch, setSelectedChurch] = useState(null);
  const [intentions, setIntentions] = useState([]);
  const fileInputRef = useRef(null);

  const currentStep = STEPS[stepIndex];

  // ── Navigation ─────────────────────────────────────────────────
  function goNext() {
    setGoingBack(false);
    setAnimClass('exit');
    setTimeout(() => {
      setStepIndex(i => i + 1);
      setAnimClass('enter');
    }, 300);
  }

  function goBack() {
    if (stepIndex === 0) return;
    setGoingBack(true);
    setAnimClass('exit-back');
    setTimeout(() => {
      setStepIndex(i => i - 1);
      setAnimClass('enter-back');
    }, 300);
  }

  // ── Helpers ────────────────────────────────────────────────────
  function toggleIntention(id) {
    setIntentions(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }

  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhoto(url);
    }
  }

  const filteredChurches = churchQuery.length > 1
    ? MOCK_CHURCHES.filter(c =>
        c.name.toLowerCase().includes(churchQuery.toLowerCase()) ||
        c.loc.toLowerCase().includes(churchQuery.toLowerCase())
      )
    : MOCK_CHURCHES;

  // ── Progress bar (exclude splash & welcome) ────────────────────
  const progressSteps = STEPS.filter(s => s !== 'splash' && s !== 'welcome');
  const progressIndex = progressSteps.indexOf(currentStep);

  // ── Screens ────────────────────────────────────────────────────

  // 1. SPLASH
  if (currentStep === 'splash') {
    return (
      <div className={`onboarding-screen splash-screen-v2 ${animClass}`}>
        {/* Logo area — takes up the space */}
        <div className="splash-v2-top">
          <h1 className="splash-v2-logo">
            Pray<br />For
            <span className="splash-v2-bird"><img src={logoImg} alt="logo" className="splash-v2-logo-img" /></span>
          </h1>
          <p className="splash-v2-tagline">
            Unis dans la prière,<br />
            connectés par la foi.
          </p>
        </div>

        {/* Dashes decoration */}
        <div className="splash-v2-dashes">
          <span /><span /><span />
        </div>

        {/* CTAs */}
        <div className="splash-v2-bottom">
          <button className="splash-v2-btn-main" onClick={goNext}>
            S'inscrire
          </button>
          <button className="splash-v2-btn-ghost" onClick={goNext}>
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  // 10. WELCOME
  if (currentStep === 'welcome') {
    return (
      <div className={`onboarding-screen splash-screen-v2 ${animClass}`}>
        <div className="splash-v2-top">
          <h1 className="splash-v2-logo" style={{ fontSize: '52px' }}>
            Bienvenue,<br />
            <span style={{ color: 'var(--accent-pray)' }}>{firstName || 'ami(e)'}</span>&nbsp;<img src={logoImg} alt="logo" className="splash-v2-logo-img" style={{ width: '44px', opacity: 0.6 }} />
          </h1>
          <p className="splash-v2-tagline">
            Tout commence par une prière.<br />
            Le reste appartient à Dieu.
          </p>
        </div>

        <div className="splash-v2-dashes">
          <span /><span /><span />
        </div>

        <div className="splash-v2-bottom">
          <button className="splash-v2-btn-main" onClick={() => navigate('/feed')}>
            Découvrir l'application
          </button>
          <button className="splash-v2-btn-ghost" onClick={() => navigate('/')}>
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  // ── Shared layout for form steps ──────────────────────────────
  const showBackBtn = stepIndex > 0 && currentStep !== 'welcome';

  return (
    <div className="onboarding-root">
      {/* Progress dots */}
      {progressIndex >= 0 && (
        <div className="onboarding-progress">
          {progressSteps.map((s, i) => (
            <div
              key={s}
              className={`onboarding-progress-dot ${
                i < progressIndex ? 'completed' : i === progressIndex ? 'active' : ''
              }`}
            />
          ))}
        </div>
      )}

      {/* Back button */}
      {showBackBtn && (
        <button className="onboarding-back" onClick={goBack} aria-label="Retour">
          <ArrowLeft />
        </button>
      )}

      <div className={`onboarding-screen ${animClass}`} key={currentStep}>

        {/* ── 2. AUTH METHOD ── */}
        {currentStep === 'auth-method' && (
          <>
            <div className="onboarding-header">
              <p className="onboarding-step-label">Connexion</p>
              <h1 className="onboarding-title">Comment souhaitez-vous<br />vous connecter ?</h1>
            </div>
            <div className="onboarding-scroll">
              <div className="auth-methods">
                <button className="auth-method-btn primary" onClick={goNext}>
                  <div className="auth-method-icon email-icon" style={{ background: 'rgba(255,255,255,0.15)' }}>✉️</div>
                  Continuer avec un email
                </button>
                <div className="auth-divider">ou</div>
                <button className="auth-method-btn" onClick={goNext}>
                  <div className="auth-method-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  </div>
                  Continuer avec Google
                </button>
                <button className="auth-method-btn" onClick={goNext}>
                  <div className="auth-method-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  </div>
                  Continuer avec Apple
                </button>
              </div>
              <p className="auth-login-link">
                Déjà un compte ?{' '}
                <a onClick={goNext}>Se connecter</a>
              </p>
            </div>
          </>
        )}

        {/* ── 3. EMAIL ── */}
        {currentStep === 'email' && (
          <>
            <div className="onboarding-header">
              <p className="onboarding-step-label">Inscription</p>
              <h1 className="onboarding-title">Votre adresse e-mail ?</h1>
              <p className="onboarding-subtitle">Vous la retrouverez pour vous connecter.</p>
            </div>
            <div className="onboarding-scroll">
              <div className="onboarding-input-group">
                <input
                  id="ob-email"
                  className="onboarding-input"
                  type="email"
                  placeholder="prenom@exemple.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>
            <div className="onboarding-cta">
              <button className="btn-primary-pill" onClick={goNext} disabled={!email.includes('@')}>
                Continuer →
              </button>
            </div>
          </>
        )}

        {/* ── 4. PASSWORD ── */}
        {currentStep === 'password' && (
          <>
            <div className="onboarding-header">
              <p className="onboarding-step-label">Sécurité</p>
              <h1 className="onboarding-title">Choisissez un mot de passe</h1>
              <p className="onboarding-subtitle">Minimum 8 caractères.</p>
            </div>
            <div className="onboarding-scroll">
              <div className="onboarding-input-group">
                <div className="onboarding-input-wrap">
                  <input
                    id="ob-password"
                    className="onboarding-input"
                    type={showPw ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="new-password"
                    style={{ paddingRight: '52px' }}
                  />
                  <button className="input-toggle-pw" onClick={() => setShowPw(v => !v)} type="button">
                    <EyeIcon open={showPw} />
                  </button>
                </div>
                {/* strength bar */}
                {password.length > 0 && (
                  <div style={{ display: 'flex', gap: 4, marginTop: 2 }}>
                    {[...Array(4)].map((_, i) => (
                      <div key={i} style={{
                        flex: 1, height: 3, borderRadius: 2,
                        background: password.length >= (i + 1) * 2
                          ? (password.length >= 8 ? 'var(--accent-green)' : 'var(--accent-gold)')
                          : 'var(--border-light)',
                        transition: 'background 0.3s'
                      }} />
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="onboarding-cta">
              <button className="btn-primary-pill" onClick={goNext} disabled={password.length < 8}>
                Continuer →
              </button>
            </div>
          </>
        )}

        {/* ── 5. NAME ── */}
        {currentStep === 'name' && (
          <>
            <div className="onboarding-header">
              <p className="onboarding-step-label">Identité</p>
              <h1 className="onboarding-title">Comment vous<br />appelez-vous ?</h1>
            </div>
            <div className="onboarding-scroll">
              <div className="onboarding-input-group">
                <div className="onboarding-input-row">
                  <input
                    id="ob-firstname"
                    className="onboarding-input"
                    type="text"
                    placeholder="Prénom"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    autoComplete="given-name"
                  />
                  <input
                    id="ob-lastname"
                    className="onboarding-input"
                    type="text"
                    placeholder="Nom"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    autoComplete="family-name"
                  />
                </div>
              </div>
            </div>
            <div className="onboarding-cta">
              <button className="btn-primary-pill" onClick={goNext} disabled={!firstName.trim()}>
                Continuer →
              </button>
            </div>
          </>
        )}

        {/* ── 6. CONFESSION ── */}
        {currentStep === 'confession' && (
          <>
            <div className="onboarding-header">
              <p className="onboarding-step-label">Foi</p>
              <h1 className="onboarding-title">Quelle est votre<br />confession ?</h1>
              <p className="onboarding-subtitle">Pour vous connecter aux bonnes communautés.</p>
            </div>
            <div className="onboarding-scroll">
              <div className="pill-grid">
                {CONFESSIONS.map(c => (
                  <button
                    key={c.id}
                    className={`pill-option ${confession === c.id ? 'selected' : ''}`}
                    onClick={() => setConfession(c.id)}
                    id={`confession-${c.id}`}
                  >
                    <span className="pill-option-icon" style={{ color: confession === c.id ? c.color : c.color, opacity: confession === c.id ? 1 : 0.65 }}>
                      <c.Icon />
                    </span>
                    <span className="pill-option-text">
                      <span className="pill-option-label">{c.label}</span>
                      <span className="pill-option-sub">{c.sub}</span>
                    </span>
                    <span className="pill-check">
                      {confession === c.id && <CheckIcon />}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div className="onboarding-cta">
              <button className="btn-primary-pill" onClick={goNext} disabled={!confession}>
                Continuer →
              </button>
            </div>
          </>
        )}

        {/* ── 7. PHOTO ── */}
        {currentStep === 'photo' && (
          <>
            <div className="onboarding-header">
              <p className="onboarding-step-label">Profil</p>
              <h1 className="onboarding-title">Votre photo<br />de profil</h1>
              <p className="onboarding-subtitle">Mettez un visage sur la foi. C'est facultatif.</p>
            </div>
            <div className="onboarding-scroll">
              <div className="photo-upload-area">
                <div className="photo-circle" onClick={() => fileInputRef.current?.click()}>
                  {photo
                    ? <img src={photo} alt="Profil" />
                    : <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: 'var(--accent-blue)' }}>
                        <CameraIcon />
                        <span style={{ fontSize: 12, fontWeight: 600 }}>Ajouter</span>
                      </div>
                  }
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} />
                <p className="photo-upload-hint">
                  Appuyez sur le cercle pour choisir<br />une photo depuis votre galerie.
                </p>
              </div>
            </div>
            <div className="onboarding-cta">
              <button className="btn-primary-pill" onClick={goNext}>
                {photo ? 'Continuer →' : 'Continuer sans photo →'}
              </button>
            </div>
          </>
        )}

        {/* ── 8. CHURCH ── */}
        {currentStep === 'church' && (
          <>
            <div className="onboarding-header">
              <p className="onboarding-step-label">Communauté</p>
              <h1 className="onboarding-title">Votre église</h1>
              <p className="onboarding-subtitle">Rejoignez votre communauté de foi.</p>
            </div>
            <div className="onboarding-scroll">
              <div className="church-search-wrap">
                <span className="church-search-icon"><SearchIcon /></span>
                <input
                  id="ob-church-search"
                  className="church-search-input"
                  type="text"
                  placeholder="Rechercher par nom ou ville…"
                  value={churchQuery}
                  onChange={e => setChurchQuery(e.target.value)}
                />
              </div>
              <div className="church-results">
                {filteredChurches.map(church => (
                  <div
                    key={church.id}
                    className={`church-result-item ${selectedChurch?.id === church.id ? 'selected' : ''}`}
                    onClick={() => setSelectedChurch(church)}
                  >
                    <div className="church-result-icon">⛪</div>
                    <div>
                      <div className="church-result-name">{church.name}</div>
                      <div className="church-result-loc">📍 {church.loc}</div>
                    </div>
                    {selectedChurch?.id === church.id && (
                      <div style={{ marginLeft: 'auto', color: 'var(--accent-pray)' }}>
                        <CheckIcon />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <p className="church-skip">
                Pas encore dans une église ?{' '}
                <a onClick={goNext}>Passer cette étape</a>
              </p>
            </div>
            <div className="onboarding-cta">
              <button className="btn-primary-pill" onClick={goNext}>
                {selectedChurch ? `Rejoindre — ${selectedChurch.name}` : 'Continuer →'}
              </button>
            </div>
          </>
        )}

        {/* ── 9. INTENTIONS ── */}
        {currentStep === 'intentions' && (
          <>
            <div className="onboarding-header">
              <p className="onboarding-step-label">Prière</p>
              <h1 className="onboarding-title">Pour quoi souhaitez-<br />vous prier ?</h1>
              <p className="onboarding-subtitle">Sélectionnez plusieurs thèmes. Cela personnalise votre fil.</p>
            </div>
            <div className="onboarding-scroll">
              <div className="intentions-grid">
                {INTENTIONS.map(intent => (
                  <button
                    key={intent.id}
                    className={`intention-pill ${intentions.includes(intent.id) ? 'selected' : ''}`}
                    onClick={() => toggleIntention(intent.id)}
                    id={`intention-${intent.id}`}
                  >
                    <span className="intention-pill-icon">{intent.icon}</span>
                    <span className="intention-pill-label">{intent.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="onboarding-cta">
              <button className="btn-primary-pill" onClick={goNext}>
                {intentions.length > 0 ? `Enregistrer (${intentions.length}) →` : 'Passer →'}
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
