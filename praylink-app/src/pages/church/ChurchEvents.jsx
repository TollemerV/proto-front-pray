import { useState } from 'react';
import { Icons } from '../../components/church/ChurchIcons';

// ── Step indicators ──────────────────────────────────────────
const STEPS = [
  { id: 1, label: 'Infos' },
  { id: 2, label: 'Détails' },
  { id: 3, label: 'Confirmer' },
];

// ── Creation tunnel ──────────────────────────────────────────
function CreateEventWizard({ onClose, onCreated }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    maxParticipants: '',
    category: 'culte',
    audience: 'membres',
    notifyMembers: true,
  });

  const set = (field, value) => setForm(f => ({ ...f, [field]: value }));
  const canNext1 = form.title.trim() && form.date && form.time;
  const canNext2 = form.location.trim();

  const categories = [
    { id: 'culte', label: '🙌 Culte', color: 'var(--accent-pray)' },
    { id: 'priere', label: '🙏 Prière', color: 'var(--accent-blue)' },
    { id: 'jeunesse', label: '✨ Jeunesse', color: '#F59E0B' },
    { id: 'formation', label: '📖 Formation', color: '#10B981' },
    { id: 'social', label: '🤝 Action sociale', color: '#EC4899' },
    { id: 'autre', label: '🎉 Autre', color: '#6B7280' },
  ];

  const handleCreate = () => {
    onCreated({
      title: form.title,
      date: new Date(form.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long' }),
      inscrits: 0,
      statut: 'À venir',
      color: categories.find(c => c.id === form.category)?.color || 'var(--accent-pray)',
    });
  };

  return (
    <div className="ce-wizard">
      {/* Header */}
      <div className="ce-wizard-header">
        <button className="ce-wizard-close" onClick={onClose}>
          <Icons.ArrowLeft size={18} />
        </button>
        <span className="ce-wizard-title">Créer un événement</span>
        <span className="ce-wizard-step">{step}/3</span>
      </div>

      {/* Step progress */}
      <div className="ce-steps">
        {STEPS.map((s, i) => (
          <div key={s.id} className="ce-step-item">
            <div className={`ce-step-dot ${step >= s.id ? 'done' : ''}`}>
              {step > s.id ? <Icons.Check size={12} stroke="white" /> : s.id}
            </div>
            <span className={`ce-step-label ${step >= s.id ? 'active' : ''}`}>{s.label}</span>
            {i < STEPS.length - 1 && <div className={`ce-step-line ${step > s.id ? 'done' : ''}`} />}
          </div>
        ))}
      </div>

      <div className="ce-wizard-body">

        {/* ── ÉTAPE 1 : Informations de base ── */}
        {step === 1 && (
          <div className="ce-form-step">
            <div className="ce-field">
              <label className="ce-label">Titre de l'événement *</label>
              <input
                className="ce-input"
                placeholder="Ex : Culte de Pâques"
                value={form.title}
                onChange={e => set('title', e.target.value)}
                autoFocus
              />
            </div>

            <div className="ce-field-row">
              <div className="ce-field">
                <label className="ce-label">Date *</label>
                <input
                  className="ce-input"
                  type="date"
                  value={form.date}
                  onChange={e => set('date', e.target.value)}
                />
              </div>
              <div className="ce-field">
                <label className="ce-label">Heure *</label>
                <input
                  className="ce-input"
                  type="time"
                  value={form.time}
                  onChange={e => set('time', e.target.value)}
                />
              </div>
            </div>

            <div className="ce-field">
              <label className="ce-label">Catégorie</label>
              <div className="ce-categories">
                {categories.map(c => (
                  <button
                    key={c.id}
                    className={`ce-category-pill ${form.category === c.id ? 'selected' : ''}`}
                    style={form.category === c.id ? { borderColor: c.color, background: `${c.color}15`, color: c.color } : {}}
                    onClick={() => set('category', c.id)}
                    type="button"
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── ÉTAPE 2 : Détails ── */}
        {step === 2 && (
          <div className="ce-form-step">
            <div className="ce-field">
              <label className="ce-label">Lieu *</label>
              <input
                className="ce-input"
                placeholder="Ex : Salle principale, Église Béthel"
                value={form.location}
                onChange={e => set('location', e.target.value)}
                autoFocus
              />
            </div>

            <div className="ce-field">
              <label className="ce-label">Description</label>
              <textarea
                className="ce-textarea"
                placeholder="Décrivez l'événement, le programme..."
                value={form.description}
                onChange={e => set('description', e.target.value)}
                rows={4}
              />
            </div>

            <div className="ce-field">
              <label className="ce-label">Participants max (optionnel)</label>
              <input
                className="ce-input"
                type="number"
                placeholder="Illimité si vide"
                value={form.maxParticipants}
                onChange={e => set('maxParticipants', e.target.value)}
                min="1"
              />
            </div>

            <div className="ce-field">
              <label className="ce-label">Audience</label>
              <div className="ce-audience-row">
                {[
                  { id: 'membres', label: '🏠 Membres seulement' },
                  { id: 'public', label: '🌍 Ouvert au public' },
                ].map(a => (
                  <button
                    key={a.id}
                    className={`ce-audience-btn ${form.audience === a.id ? 'selected' : ''}`}
                    onClick={() => set('audience', a.id)}
                    type="button"
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── ÉTAPE 3 : Confirmation ── */}
        {step === 3 && (
          <div className="ce-form-step">
            <div className="ce-confirm-card">
              <div className="ce-confirm-cover">
                <div className="ce-confirm-category-badge">
                  {categories.find(c => c.id === form.category)?.label}
                </div>
              </div>

              <div className="ce-confirm-body">
                <h2 className="ce-confirm-title">{form.title}</h2>

                <div className="ce-confirm-rows">
                  <div className="ce-confirm-row">
                    <Icons.Calendar size={16} stroke="var(--accent-pray)" />
                    <span>{form.date ? new Date(form.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '—'}</span>
                  </div>
                  <div className="ce-confirm-row">
                    <Icons.Bell size={16} stroke="var(--accent-blue)" />
                    <span>{form.time || '—'}</span>
                  </div>
                  <div className="ce-confirm-row">
                    <Icons.Home size={16} stroke="var(--accent-gold)" />
                    <span>{form.location || '—'}</span>
                  </div>
                  {form.maxParticipants && (
                    <div className="ce-confirm-row">
                      <Icons.Users size={16} stroke="var(--text-tertiary)" />
                      <span>Max {form.maxParticipants} participants</span>
                    </div>
                  )}
                  <div className="ce-confirm-row">
                    <Icons.Globe size={16} stroke="var(--text-tertiary)" />
                    <span>{form.audience === 'public' ? 'Ouvert au public' : 'Membres seulement'}</span>
                  </div>
                </div>

                {form.description && (
                  <p className="ce-confirm-desc">{form.description}</p>
                )}
              </div>
            </div>

            <div className="ce-notify-toggle">
              <div className="ce-notify-text">
                <div className="ce-notify-title">Notifier les membres</div>
                <div className="ce-notify-sub">Une notification push sera envoyée</div>
              </div>
              <button
                className={`ce-toggle ${form.notifyMembers ? 'on' : ''}`}
                onClick={() => set('notifyMembers', !form.notifyMembers)}
                type="button"
              >
                <span className="ce-toggle-thumb" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer actions */}
      <div className="ce-wizard-footer">
        {step > 1 && (
          <button className="ce-btn-secondary" onClick={() => setStep(s => s - 1)}>
            Retour
          </button>
        )}

        {step < 3 ? (
          <button
            className={`ce-btn-primary ${(!canNext1 && step === 1) || (!canNext2 && step === 2) ? 'disabled' : ''}`}
            onClick={() => setStep(s => s + 1)}
            disabled={(step === 1 && !canNext1) || (step === 2 && !canNext2)}
          >
            Continuer
            <Icons.ChevronRight size={18} stroke="white" />
          </button>
        ) : (
          <button className="ce-btn-primary ce-btn-create" onClick={handleCreate}>
            <Icons.Check size={18} stroke="white" />
            Créer l'événement
          </button>
        )}
      </div>
    </div>
  );
}

// ── Main Events page ─────────────────────────────────────────
export default function ChurchEvents() {
  const [showWizard, setShowWizard] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newEvent, setNewEvent] = useState(null);
  const [events, setEvents] = useState([
    {
      title: 'Soirée de louange & adoration',
      date: '02 Avril', time: '19h30',
      location: 'Salle principale — Église Béthel',
      description: 'Une soirée de louange et d\'adoration pour célébrer la présence de Dieu ensemble. Venez avec un cœur ouvert et prêt à être touché. Programme : louange contemporaine, temps de prière, témoignages.',
      inscrits: 142, statut: 'À venir',
      color: '#7B68EE', category: '🙌 Culte',
      audience: 'public', organizer: 'Pasteur Emmanuel',
    },
    {
      title: 'Culte de Pâques',
      date: '06 Avril', time: '10h00',
      location: 'Église Béthel — Grande salle',
      description: 'Le culte de résurrection le plus attendu de l\'année. Toute la famille est invitée pour ce moment de célébration exceptionnel. Accueil des enfants dès 9h45.',
      inscrits: 310, statut: 'À venir',
      color: '#6B9FD4', category: '✨ Culte spécial',
      audience: 'public', organizer: 'Équipe pastorale',
    },
    {
      title: 'Groupe de jeunes — Bible study',
      date: '10 Avril', time: '18h00',
      location: 'Salle annexe — 1er étage',
      description: 'Étude biblique pour les 15-25 ans. Ce mois-ci : les paraboles de Jésus. Apportez votre Bible, un carnet de notes et votre enthousiasme !',
      inscrits: 45, statut: 'À venir',
      color: '#D4A94B', category: '✨ Jeunesse',
      audience: 'membres', organizer: 'Responsable Jeunesse',
    },
  ]);

  const handleCreated = (event) => {
    setEvents(prev => [event, ...prev]);
    setNewEvent(event);
    setShowWizard(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const toggleExpand = (i) => {
    setExpandedIndex(prev => prev === i ? null : i);
  };

  if (showWizard) {
    return <CreateEventWizard onClose={() => setShowWizard(false)} onCreated={handleCreated} />;
  }

  return (
    <div className="ch-tab-page">
      <div className="ch-tab-header">
        <h1 className="ch-tab-title">Événements</h1>
        <p className="ch-tab-subtitle">Gérez le calendrier de l'église</p>
      </div>

      <button className="ch-primary-btn ch-create-event-btn" onClick={() => setShowWizard(true)}>
        <Icons.Plus size={18} />
        Créer un événement
      </button>

      {showSuccess && newEvent && (
        <div className="ce-success-toast">
          <Icons.Check size={16} stroke="white" />
          « {newEvent.title} » créé avec succès !
        </div>
      )}

      <div className="ch-events-list">
        {events.map((e, i) => {
          const isOpen = expandedIndex === i;
          return (
            <div key={i} className={`ch-event-item ${isOpen ? 'ch-event-item-expanded' : ''}`}>
              {/* ── Résumé (toujours visible) ── */}
              <div className="ch-event-item-top">
                <div className="ch-event-date-box">
                  <span className="ch-event-month">{e.date.split(' ')[1]?.substring(0, 3).toUpperCase() || 'EVT'}</span>
                  <span className="ch-event-day">{e.date.split(' ')[0]}</span>
                </div>
                <div className="ch-event-item-info">
                  <div className="ch-event-item-title">{e.title}</div>
                  <div className="ch-event-item-meta">
                    <Icons.Calendar size={13} stroke="var(--text-tertiary)" style={{marginRight: 4}} />
                    {e.date}{e.time ? ` · ${e.time}` : ''} · {e.statut}
                  </div>
                  {e.location && (
                    <div className="ch-event-item-location">
                      <Icons.Home size={12} stroke="var(--text-tertiary)" style={{marginRight: 3}} />
                      {e.location.split('—')[0].trim()}
                    </div>
                  )}
                </div>
              </div>

              <div className="ch-event-item-bottom">
                <div className="ch-event-participants">
                  <Icons.Users size={16} stroke="var(--text-secondary)" />
                  <span>{e.inscrits} participants</span>
                </div>
                <button
                  className="ch-event-contact-btn"
                  style={{ borderColor: e.color, color: isOpen ? 'white' : e.color, background: isOpen ? e.color : 'transparent' }}
                  onClick={() => toggleExpand(i)}
                >
                  {isOpen ? 'Fermer' : 'Détails'}
                </button>
              </div>

              {/* ── Détails inline (accordéon) ── */}
              {isOpen && (
                <div className="ch-event-accordion" style={{ '--event-color': e.color }}>
                  <div className="ch-event-accordion-divider" style={{ background: e.color }} />

                  <div className="ch-event-accordion-rows">
                    {e.time && (
                      <div className="ch-event-accordion-row">
                        <Icons.Bell size={14} stroke={e.color} />
                        <span className="ch-event-accordion-label">Heure</span>
                        <span className="ch-event-accordion-value">{e.time}</span>
                      </div>
                    )}
                    {e.location && (
                      <div className="ch-event-accordion-row">
                        <Icons.Home size={14} stroke={e.color} />
                        <span className="ch-event-accordion-label">Lieu</span>
                        <span className="ch-event-accordion-value">{e.location}</span>
                      </div>
                    )}
                    {e.audience && (
                      <div className="ch-event-accordion-row">
                        <Icons.Globe size={14} stroke={e.color} />
                        <span className="ch-event-accordion-label">Audience</span>
                        <span className="ch-event-accordion-value">
                          {e.audience === 'public' ? '🌍 Ouvert au public' : '🏠 Membres seulement'}
                        </span>
                      </div>
                    )}
                    {e.organizer && (
                      <div className="ch-event-accordion-row">
                        <Icons.Prayer size={14} stroke={e.color} />
                        <span className="ch-event-accordion-label">Organisateur</span>
                        <span className="ch-event-accordion-value">{e.organizer}</span>
                      </div>
                    )}
                  </div>

                  {e.description && (
                    <p className="ch-event-accordion-desc">{e.description}</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

