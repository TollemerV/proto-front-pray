import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Donation.css';

const AMOUNTS = [5, 10, 20, 50, 100, 200];

const CAUSES = [
  { id: 'general',    emoji: '⛪', label: 'Offrande générale',     desc: 'Soutenir les activités de l\'église' },
  { id: 'mission',    emoji: '🌍', label: 'Missions',              desc: 'Financer les missions locales & mondiales' },
  { id: 'pauvres',    emoji: '🤝', label: 'Aide aux démunis',      desc: 'Maraudes, paniers repas, hébergement' },
  { id: 'jeunesse',   emoji: '🌱', label: 'Groupe de jeunes',      desc: 'Camps, retraites, activités jeunesse' },
];

const FREQUENCIES = [
  { id: 'once',    label: 'Ponctuel',    desc: 'Un seul versement' },
  { id: 'monthly', label: 'Mensuel',     desc: 'Chaque mois' },
  { id: 'yearly',  label: 'Annuel',      desc: 'Une fois par an' },
];

/* Step indicators */
function StepBar({ step }) {
  const steps = ['Montant', 'Cause', 'Paiement', 'Confirmation'];
  return (
    <div className="don-stepbar">
      {steps.map((s, i) => (
        <div key={i} className={`don-step-item ${step > i ? 'done' : step === i ? 'active' : ''}`}>
          <div className="don-step-circle">
            {step > i ? '✓' : i + 1}
          </div>
          <span className="don-step-label">{s}</span>
        </div>
      ))}
      <div className="don-step-track">
        <div className="don-step-fill" style={{ width: `${(step / (steps.length - 1)) * 100}%` }} />
      </div>
    </div>
  );
}

/* Step 1 — Montant */
function StepAmount({ amount, setAmount, custom, setCustom, frequency, setFrequency }) {
  return (
    <div className="don-step-body">
      <h2 className="don-step-title">Choisissez votre don</h2>
      <p className="don-step-sub">Chaque euro compte pour la mission de l'église.</p>

      {/* Frequency */}
      <div className="don-freq-row">
        {FREQUENCIES.map(f => (
          <button
            key={f.id}
            className={`don-freq-pill ${frequency === f.id ? 'active' : ''}`}
            onClick={() => setFrequency(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Preset amounts */}
      <div className="don-amounts-grid">
        {AMOUNTS.map(a => (
          <button
            key={a}
            className={`don-amount-btn ${amount === a && !custom ? 'active' : ''}`}
            onClick={() => { setAmount(a); setCustom(''); }}
          >
            {a} €
          </button>
        ))}
      </div>

      {/* Custom input */}
      <div className="don-custom-wrap">
        <span className="don-custom-prefix">€</span>
        <input
          className="don-custom-input"
          type="number"
          min="1"
          placeholder="Autre montant"
          value={custom}
          onChange={e => { setCustom(e.target.value); setAmount(null); }}
        />
      </div>

      <div className="don-amount-summary">
        {frequency !== 'once' && (
          <span className="don-freq-info">
            💡 Soit <strong>{(amount || Number(custom) || 0) * (frequency === 'monthly' ? 12 : 1)} €/an</strong> en {FREQUENCIES.find(f => f.id === frequency)?.label.toLowerCase()}
          </span>
        )}
      </div>
    </div>
  );
}

/* Step 2 — Cause */
function StepCause({ cause, setCause }) {
  return (
    <div className="don-step-body">
      <h2 className="don-step-title">Où souhaitez-vous donner ?</h2>
      <p className="don-step-sub">Dirigez votre don vers la cause qui vous tient à cœur.</p>
      <div className="don-causes-list">
        {CAUSES.map(c => (
          <button
            key={c.id}
            className={`don-cause-card ${cause === c.id ? 'active' : ''}`}
            onClick={() => setCause(c.id)}
          >
            <span className="don-cause-emoji">{c.emoji}</span>
            <div className="don-cause-info">
              <span className="don-cause-label">{c.label}</span>
              <span className="don-cause-desc">{c.desc}</span>
            </div>
            <div className={`don-cause-check ${cause === c.id ? 'active' : ''}`}>✓</div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* Step 3 — Paiement */
function StepPayment({ method, setMethod, name, setName, anonymous, setAnonymous }) {
  return (
    <div className="don-step-body">
      <h2 className="don-step-title">Mode de paiement</h2>
      <p className="don-step-sub">Sélectionnez votre méthode préférée.</p>

      <div className="don-method-grid">
        {[
          { id: 'card',   icon: '💳', label: 'Carte bancaire' },
          { id: 'paypal', icon: '🅿️', label: 'PayPal' },
          { id: 'apple',  icon: '🍎', label: 'Apple Pay' },
          { id: 'virement', icon: '🏦', label: 'Virement' },
        ].map(m => (
          <button
            key={m.id}
            className={`don-method-card ${method === m.id ? 'active' : ''}`}
            onClick={() => setMethod(m.id)}
          >
            <span className="don-method-icon">{m.icon}</span>
            <span className="don-method-label">{m.label}</span>
          </button>
        ))}
      </div>

      {/* Nom */}
      <label className="don-field-label">Votre nom (pour le reçu fiscal)</label>
      <input
        className="don-field-input"
        type="text"
        placeholder="Prénom Nom"
        value={name}
        onChange={e => setName(e.target.value)}
        disabled={anonymous}
      />

      {/* Anonyme */}
      <button
        className={`don-anon-toggle ${anonymous ? 'active' : ''}`}
        onClick={() => setAnonymous(a => !a)}
      >
        <span className="don-anon-box">{anonymous ? '✓' : ''}</span>
        Faire un don anonyme
      </button>

      <div className="don-secure-note">
        🔒 Paiement 100% sécurisé · Reçu fiscal envoyé par email
      </div>
    </div>
  );
}

/* Step 4 — Confirmation */
function StepConfirm({ amount, custom, cause, frequency, method, name, anonymous }) {
  const finalAmount = amount || Number(custom);
  const causeObj = CAUSES.find(c => c.id === cause);
  const freqObj = FREQUENCIES.find(f => f.id === frequency);

  return (
    <div className="don-step-body don-confirm-body">
      <div className="don-confirm-icon">🙏</div>
      <h2 className="don-confirm-title">Récapitulatif</h2>
      <p className="don-confirm-sub">Vérifiez votre don avant de confirmer</p>

      <div className="don-recap-card">
        <div className="don-recap-row">
          <span className="don-recap-label">Montant</span>
          <span className="don-recap-value don-recap-highlight">{finalAmount} €</span>
        </div>
        <div className="don-recap-row">
          <span className="don-recap-label">Fréquence</span>
          <span className="don-recap-value">{freqObj?.label}</span>
        </div>
        <div className="don-recap-row">
          <span className="don-recap-label">Cause</span>
          <span className="don-recap-value">{causeObj?.emoji} {causeObj?.label}</span>
        </div>
        <div className="don-recap-row">
          <span className="don-recap-label">Paiement</span>
          <span className="don-recap-value">{method === 'card' ? '💳 Carte' : method === 'paypal' ? '🅿️ PayPal' : method === 'apple' ? '🍎 Apple Pay' : '🏦 Virement'}</span>
        </div>
        <div className="don-recap-row">
          <span className="don-recap-label">Donateur</span>
          <span className="don-recap-value">{anonymous ? '🎭 Anonyme' : name || '—'}</span>
        </div>
      </div>

      <div className="don-tax-info">
        💡 Votre don est déductible à <strong>66%</strong> de vos impôts
      </div>
    </div>
  );
}

/* Step 5 — Succès */
function StepSuccess({ amount, custom, navigate }) {
  const finalAmount = amount || Number(custom);
  return (
    <div className="don-step-body don-success-body">
      <div className="don-success-anim">🎉</div>
      <h2 className="don-success-title">Merci pour votre don !</h2>
      <p className="don-success-sub">
        Votre don de <strong>{finalAmount} €</strong> a bien été enregistré.<br />
        Que Dieu bénisse votre générosité 🙏
      </p>
      <div className="don-success-verse">
        <p>"Que chacun donne comme il l'a résolu en son cœur, sans tristesse ni contrainte ; car Dieu aime celui qui donne avec joie."</p>
        <span>— 2 Corinthiens 9:7</span>
      </div>
      <button className="don-back-btn" onClick={() => navigate(-1)}>
        ← Retour à l'église
      </button>
    </div>
  );
}

/* ─── Main Page ─── */
export default function DonationPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  // State
  const [amount, setAmount] = useState(20);
  const [custom, setCustom] = useState('');
  const [frequency, setFrequency] = useState('once');
  const [cause, setCause] = useState('general');
  const [method, setMethod] = useState('card');
  const [name, setName] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [done, setDone] = useState(false);

  const finalAmount = amount || Number(custom);
  const canNext = [
    finalAmount > 0,
    !!cause,
    !!method,
    true,
  ][step];

  const handleNext = () => {
    if (step === 3) { setDone(true); return; }
    setStep(s => s + 1);
  };

  if (done) {
    return (
      <div className="don-page">
        <StepSuccess amount={amount} custom={custom} navigate={navigate} />
      </div>
    );
  }

  return (
    <div className="don-page">
      {/* Header */}
      <div className="don-header">
        <button className="don-back" onClick={() => step === 0 ? navigate(-1) : setStep(s => s - 1)}>
          ‹
        </button>
        <div className="don-header-info">
          <span className="don-header-emoji">⛪</span>
          <div>
            <div className="don-header-title">Église Béthel Paris</div>
            <div className="don-header-sub">Faire un don</div>
          </div>
        </div>
      </div>

      {/* Step bar */}
      <StepBar step={step} />

      {/* Content */}
      <div className="don-content">
        {step === 0 && (
          <StepAmount
            amount={amount} setAmount={setAmount}
            custom={custom} setCustom={setCustom}
            frequency={frequency} setFrequency={setFrequency}
          />
        )}
        {step === 1 && <StepCause cause={cause} setCause={setCause} />}
        {step === 2 && (
          <StepPayment
            method={method} setMethod={setMethod}
            name={name} setName={setName}
            anonymous={anonymous} setAnonymous={setAnonymous}
          />
        )}
        {step === 3 && (
          <StepConfirm
            amount={amount} custom={custom} cause={cause}
            frequency={frequency} method={method}
            name={name} anonymous={anonymous}
          />
        )}
      </div>

      {/* CTA */}
      <div className="don-footer">
        <button
          className="don-cta-btn"
          onClick={handleNext}
          disabled={!canNext}
        >
          {step === 3 ? `🙏 Confirmer mon don · ${finalAmount} €` : 'Continuer →'}
        </button>
      </div>
    </div>
  );
}
