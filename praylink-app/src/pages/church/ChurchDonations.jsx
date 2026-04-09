import { useState } from 'react';
import { Icons } from '../../components/church/ChurchIcons';

export default function ChurchDonations() {
  const [goalEditing, setGoalEditing] = useState(false);
  const [goal, setGoal] = useState(4050);
  const [goalInput, setGoalInput] = useState('4050');
  const totalCollected = 3450;
  const pct = Math.min(100, Math.round((totalCollected / goal) * 100));

  const history = [
    { name: 'Anonyme',        date: "Aujourd'hui",  amount: 50,  color: 'var(--accent-blue-light)' },
    { name: 'Thomas Bernard', date: 'Hier',          amount: 120, color: 'var(--accent-gold-light)' },
    { name: 'Famille L.',     date: 'Le 04 Avril',   amount: 500, color: 'var(--accent-pray-light)' },
    { name: 'Marie Dupont',   date: 'Le 02 Avril',   amount: 30,  color: 'var(--accent-green-light)' },
    { name: 'Anonyme',        date: 'Le 01 Avril',   amount: 200, color: 'var(--accent-blue-light)' },
  ];

  /* Weekly data for mini bar chart */
  const weeklyDons = [
    { label: 'S1', value: 820 },
    { label: 'S2', value: 540 },
    { label: 'S3', value: 1290 },
    { label: 'S4', value: 800 },
  ];
  const maxWeek = Math.max(...weeklyDons.map(w => w.value));

  /* Category breakdown */
  const categories = [
    { label: 'Dîme',          amount: 1850, pct: 54, color: '#7B68EE' },
    { label: 'Missions',      amount: 620,  pct: 18, color: '#6B9FD4' },
    { label: 'Bâtiment',      amount: 530,  pct: 15, color: '#10B981' },
    { label: 'Aide sociale',  amount: 450,  pct: 13, color: '#D4A94B' },
  ];

  /* Quick stats */
  const stats = [
    { label: 'Donateurs', value: '28', icon: <Icons.Users size={16} stroke="#7B68EE" /> },
    { label: 'Dons',      value: '47', icon: <Icons.Wallet size={16} stroke="#6B9FD4" /> },
    { label: 'Don moyen', value: '73 €', icon: <Icons.Activity size={16} stroke="#10B981" /> },
    { label: 'Récurrent', value: '12',   icon: <Icons.Heart size={16} stroke="#EF4444" /> },
  ];

  const saveGoal = () => {
    const v = parseInt(goalInput);
    if (!isNaN(v) && v > 0) setGoal(v);
    setGoalEditing(false);
  };

  return (
    <div className="ch-tab-page">
      <div className="ch-tab-header">
        <h1 className="ch-tab-title">Dons</h1>
        <p className="ch-tab-subtitle">Suivi de la générosité · Avril</p>
      </div>

      {/* ── Hero Card ── */}
      <div className="ch-donation-hero">
        <div className="ch-donation-hero-bg">
          <Icons.Wallet size={100} stroke="rgba(255,255,255,0.08)" />
        </div>
        <div className="ch-donation-hero-label">Total récolté</div>
        <div className="ch-donation-hero-amount">{totalCollected.toLocaleString('fr-FR')} €</div>
        <div className="ch-donation-hero-bar">
          <div className="ch-donation-bar-bg">
            <div className="ch-donation-bar-fill" style={{ width: `${pct}%` }} />
          </div>
          <div className="ch-donation-bar-info">
            <span>{pct}% de l'objectif</span>
            <span
              style={{ cursor: 'pointer', textDecoration: 'underline', textDecorationStyle: 'dotted' }}
              onClick={() => { setGoalInput(String(goal)); setGoalEditing(true); }}
            >
              {goal.toLocaleString('fr-FR')} €
            </span>
          </div>
        </div>
        <div className="ch-donation-hero-badges">
          <div className="ch-donation-hero-badge">
            <Icons.Activity size={14} style={{marginRight: 4}} />
            +12% vs mars
          </div>
          <div className="ch-donation-hero-badge" onClick={() => { setGoalInput(String(goal)); setGoalEditing(true); }} style={{ cursor: 'pointer' }}>
            Modifier l'objectif
          </div>
        </div>
      </div>

      {/* ── Quick Stats ── */}
      <div className="ch-don-stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="ch-don-stat-card">
            <div className="ch-don-stat-icon">{s.icon}</div>
            <div className="ch-don-stat-value">{s.value}</div>
            <div className="ch-don-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Weekly Chart ── */}
      <h2 className="ch-section-title" style={{ marginTop: 24 }}>📊 Dons par semaine</h2>
      <div className="ch-don-chart-card">
        <div className="ch-don-chart-bars">
          {weeklyDons.map((w, i) => (
            <div key={i} className="ch-don-chart-col">
              <div className="ch-don-chart-value">{w.value} €</div>
              <div className="ch-don-chart-bar-track">
                <div
                  className="ch-don-chart-bar-fill"
                  style={{ height: `${(w.value / maxWeek) * 100}%` }}
                />
              </div>
              <div className="ch-don-chart-label">{w.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Category Breakdown ── */}
      <h2 className="ch-section-title" style={{ marginTop: 24 }}>📂 Répartition par catégorie</h2>
      <div className="ch-don-categories">
        {categories.map((c, i) => (
          <div key={i} className="ch-don-cat-row">
            <div className="ch-don-cat-color" style={{ background: c.color }} />
            <div className="ch-don-cat-info">
              <span className="ch-don-cat-name">{c.label}</span>
              <div className="ch-don-cat-bar-track">
                <div className="ch-don-cat-bar-fill" style={{ width: `${c.pct}%`, background: c.color }} />
              </div>
            </div>
            <div className="ch-don-cat-values">
              <span className="ch-don-cat-amount">{c.amount.toLocaleString('fr-FR')} €</span>
              <span className="ch-don-cat-pct">{c.pct}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Recent Donations ── */}
      <h2 className="ch-section-title" style={{ marginTop: 24 }}>Derniers dons</h2>
      <div className="ch-donation-list">
        {history.map((h, i) => (
          <div key={i} className="ch-donation-item">
            <div className="ch-donation-item-icon" style={{ backgroundColor: h.color }}>
              <Icons.Wallet size={18} stroke="var(--accent-gold)" />
            </div>
            <div className="ch-donation-item-info">
              <div className="ch-donation-item-name">{h.name}</div>
              <div className="ch-donation-item-date">
                <Icons.Calendar size={12} stroke="var(--text-tertiary)" style={{marginRight: 4}} />
                {h.date}
              </div>
            </div>
            <div className="ch-donation-item-amount">+{h.amount} €</div>
          </div>
        ))}
      </div>

      {/* ── Goal Editing Bottom Sheet ── */}
      {goalEditing && (
        <div className="ch-don-goal-overlay" onClick={() => setGoalEditing(false)}>
          <div className="ch-don-goal-sheet" onClick={e => e.stopPropagation()}>
            <div className="ch-don-goal-handle" />
            <h3 className="ch-don-goal-title">🎯 Objectif de dons mensuel</h3>
            <p className="ch-don-goal-desc">Définissez un objectif pour motiver la générosité de votre communauté.</p>
            <div className="ch-don-goal-input-wrap">
              <input
                className="ch-don-goal-input"
                type="number"
                value={goalInput}
                onChange={e => setGoalInput(e.target.value)}
                autoFocus
              />
              <span className="ch-don-goal-currency">€</span>
            </div>
            <div className="ch-don-goal-presets">
              {[2000, 3000, 5000, 8000, 10000].map(v => (
                <button key={v} className={`ch-don-goal-preset${parseInt(goalInput) === v ? ' active' : ''}`} onClick={() => setGoalInput(String(v))}>
                  {v.toLocaleString('fr-FR')} €
                </button>
              ))}
            </div>
            <button className="ch-don-goal-save" onClick={saveGoal}>
              Enregistrer l'objectif
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
