import { useState } from 'react';

const members = [
  { emoji: '👨🏿', name: 'Pasteur Emmanuel', role: 'Pasteur', bg: 'var(--accent-blue-light)', active: true },
  { emoji: '👩🏽', name: 'Marie D.', role: 'Membre', bg: 'var(--accent-gold-light)', active: true },
  { emoji: '👨🏻', name: 'Thomas B.', role: 'Membre', bg: 'var(--accent-pray-light)', active: false },
  { emoji: '👩🏾', name: 'Esther M.', role: 'Chorale', bg: 'var(--accent-green-light)', active: true },
  { emoji: '👨🏽', name: 'Jean-Pierre L.', role: 'Membre', bg: 'var(--accent-red-light)', active: false },
  { emoji: '👩🏻', name: 'Sarah M.', role: 'Jeunesse', bg: 'var(--accent-blue-light)', active: true },
];

export default function MembersGrid() {
  const [prayedFor, setPrayedFor] = useState({});

  const handlePray = (index) => {
    setPrayedFor({ ...prayedFor, [index]: true });
  };

  return (
    <div className="members-list">
      {members.map((member, i) => (
        <div className="member-card" key={i}>
          <div className="member-avatar-wrapper">
            <div className="member-avatar" style={{ background: member.bg }}>{member.emoji}</div>
            {member.active && <div className="member-active-badge"></div>}
          </div>
          <div className="member-info">
            <div className="member-name">{member.name}</div>
            <div className="member-role">{member.role}</div>
          </div>
          <div className="member-actions">
            <button 
              className={`member-action-btn pray ${prayedFor[i] ? 'active' : ''}`}
              onClick={() => handlePray(i)}
            >
              {prayedFor[i] ? '✓ Soutenu' : '🙏 Prier'}
            </button>
            <button className="member-action-btn message">💬</button>
          </div>
        </div>
      ))}
    </div>
  );
}
