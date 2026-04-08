import { useState } from 'react';
import { Icons } from '../../components/church/ChurchIcons';

const MEMBERS = [
  { id: 1,  name: 'Marie Dupont',        initials: 'MD', role: 'Membres',      status: 'online',   lastSeen: 'En ligne',        joined: 'Jan 2023', prayers: 34,  color: '#7B68EE' },
  { id: 2,  name: 'Esther Mbeki',        initials: 'EM', role: 'Responsable',  status: 'online',   lastSeen: 'Il y a 2h',       joined: 'Mars 2022',prayers: 89,  color: '#10B981' },
  { id: 3,  name: 'Jean-Christophe L.',  initials: 'JC', role: 'Membres',      status: 'recent',   lastSeen: 'Hier',            joined: 'Juin 2023', prayers: 12,  color: '#6B9FD4' },
  { id: 4,  name: 'Pasteur Emmanuel',    initials: 'PE', role: 'Pasteur',      status: 'online',   lastSeen: 'En ligne',        joined: 'Jan 2021', prayers: 210, color: '#F59E0B' },
  { id: 5,  name: 'Thomas Bernard',      initials: 'TB', role: 'Membres',      status: 'inactive', lastSeen: 'Il y a 3 mois',   joined: 'Sept 2023',prayers: 5,   color: '#9CA3AF' },
  { id: 6,  name: 'Sophie Martin',       initials: 'SM', role: 'Membres',      status: 'recent',   lastSeen: 'Il y a 3j',       joined: 'Fév 2024', prayers: 21,  color: '#EC4899' },
  { id: 7,  name: 'Lucas Okafor',        initials: 'LO', role: 'Diacre',       status: 'online',   lastSeen: 'Il y a 1h',       joined: 'Août 2022',prayers: 67,  color: '#8B5CF6' },
  { id: 8,  name: 'Chloé Petit',         initials: 'CP', role: 'Membres',      status: 'inactive', lastSeen: 'Il y a 2 semaines',joined:'Nov 2023',  prayers: 8,   color: '#D4A94B' },
  { id: 9,  name: 'André Kouamé',        initials: 'AK', role: 'Responsable',  status: 'recent',   lastSeen: 'Hier',            joined: 'Oct 2022', prayers: 55,  color: '#06B6D4' },
  { id: 10, name: 'Isabelle Tremblay',   initials: 'IT', role: 'Membres',      status: 'inactive', lastSeen: 'Il y a 1 mois',   joined: 'Déc 2023', prayers: 3,   color: '#F87171' },
];

const STATUS_COLOR = {
  online:   '#10B981',
  recent:   '#F59E0B',
  inactive: '#9CA3AF',
};
const STATUS_LABEL = {
  online:   'En ligne',
  recent:   'Récent',
  inactive: 'Inactif',
};

function ContactModal({ member, onClose }) {
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!msg.trim()) return;
    setSent(true);
    setTimeout(onClose, 1500);
  };

  return (
    <div className="cm-overlay" onClick={onClose}>
      <div className="cm-modal" onClick={e => e.stopPropagation()}>
        <div className="cm-modal-header">
          <div className="cm-modal-avatar" style={{ background: member.color }}>
            {member.initials}
          </div>
          <div>
            <div className="cm-modal-name">{member.name}</div>
            <div className="cm-modal-role">{member.role}</div>
          </div>
          <button className="cm-modal-close" onClick={onClose}>
            <Icons.Plus size={18} style={{ transform: 'rotate(45deg)' }} />
          </button>
        </div>

        {sent ? (
          <div className="cm-modal-sent">
            <Icons.Check size={28} stroke="#10B981" />
            <span>Message envoyé !</span>
          </div>
        ) : (
          <>
            <div className="cm-modal-field">
              <label className="cm-modal-label">Message pastoral</label>
              <textarea
                className="cm-modal-textarea"
                placeholder={`Écrire un message à ${member.name.split(' ')[0]}…`}
                value={msg}
                onChange={e => setMsg(e.target.value)}
                rows={4}
                autoFocus
              />
            </div>
            <div className="cm-modal-footer">
              <button className="cm-modal-cancel" onClick={onClose}>Annuler</button>
              <button
                className="cm-modal-send"
                onClick={handleSend}
                disabled={!msg.trim()}
              >
                <Icons.Message size={15} stroke="white" />
                Envoyer
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function ChurchMembers() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [contact, setContact] = useState(null);

  const filtered = MEMBERS.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase())
      || m.role.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === 'all'      ? true :
      filter === 'online'   ? m.status === 'online' :
      filter === 'inactive' ? m.status === 'inactive' :
      filter === 'role'     ? ['Pasteur','Responsable','Diacre'].includes(m.role) : true;
    return matchSearch && matchFilter;
  });

  const filters = [
    { id: 'all',      label: 'Tous' },
    { id: 'online',   label: '🟢 En ligne' },
    { id: 'inactive', label: '⚫ Inactifs' },
    { id: 'role',     label: '⭐ Responsables' },
  ];

  return (
    <div className="ch-tab-page">

      {/* ── Header ── */}
      <div className="ch-tab-header">
        <h1 className="ch-tab-title">Membres</h1>
        <p className="ch-tab-subtitle">{MEMBERS.length} membres enregistrés</p>
      </div>

      {/* ── Stats ── */}
      <div className="ch-stats-row">
        <div className="ch-stat-pill">
          <div className="ch-stat-pill-icon" style={{ background: 'rgba(16,185,129,0.12)' }}>
            <Icons.Plus size={18} stroke="#10B981" />
          </div>
          <div>
            <div className="ch-stat-pill-value">+12</div>
            <div className="ch-stat-pill-label">Cette semaine</div>
          </div>
        </div>
        <div className="ch-stat-pill">
          <div className="ch-stat-pill-icon" style={{ background: 'rgba(156,163,175,0.15)' }}>
            <Icons.Activity size={18} stroke="#6B7280" />
          </div>
          <div>
            <div className="ch-stat-pill-value">3</div>
            <div className="ch-stat-pill-label">Inactifs</div>
          </div>
        </div>
      </div>

      {/* ── Search ── */}
      <div className="cm-search-wrap">
        <Icons.Bell size={15} stroke="var(--text-tertiary)" />
        <input
          className="cm-search-input"
          placeholder="Rechercher un membre…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button className="cm-search-clear" onClick={() => setSearch('')}>
            <Icons.Plus size={14} style={{ transform: 'rotate(45deg)' }} stroke="var(--text-tertiary)" />
          </button>
        )}
      </div>

      {/* ── Filters ── */}
      <div className="cm-filters">
        {filters.map(f => (
          <button
            key={f.id}
            className={`cm-filter-pill ${filter === f.id ? 'active' : ''}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* ── List ── */}
      <div className="cm-member-list">
        {filtered.length === 0 && (
          <div className="cm-empty">Aucun membre trouvé</div>
        )}
        {filtered.map(m => (
          <div key={m.id} className="cm-member-card">
            {/* Avatar */}
            <div className="cm-avatar-wrap">
              <div className="cm-avatar" style={{ background: m.color }}>
                {m.initials}
              </div>
              <span
                className="cm-status-dot"
                style={{ background: STATUS_COLOR[m.status] }}
                title={STATUS_LABEL[m.status]}
              />
            </div>

            {/* Info */}
            <div className="cm-member-info">
              <div className="cm-member-name">{m.name}</div>
              <div className="cm-member-role-row">
                <span className="cm-member-role">{m.role}</span>
                <span className="cm-member-sep">·</span>
                <span className="cm-member-seen" style={{ color: STATUS_COLOR[m.status] }}>
                  {m.lastSeen}
                </span>
              </div>
              <div className="cm-member-stats">
                🙏 {m.prayers} prières · Depuis {m.joined}
              </div>
            </div>

            {/* Action */}
            <button
              className="cm-contact-btn"
              onClick={() => setContact(m)}
              title="Contacter"
            >
              <Icons.Message size={15} stroke="var(--accent-pray)" />
            </button>
          </div>
        ))}
      </div>

      {/* ── Contact modal ── */}
      {contact && <ContactModal member={contact} onClose={() => setContact(null)} />}
    </div>
  );
}
