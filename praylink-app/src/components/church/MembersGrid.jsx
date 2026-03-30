const members = [
  { emoji: '👨🏿', name: 'Pasteur Emmanuel', bg: 'var(--accent-blue-light)' },
  { emoji: '👩🏽', name: 'Marie D.', bg: 'var(--accent-gold-light)' },
  { emoji: '👨🏻', name: 'Thomas B.', bg: 'var(--accent-pray-light)' },
  { emoji: '👩🏾', name: 'Esther M.', bg: 'var(--accent-green-light)' },
  { emoji: '👨🏽', name: 'Jean-Pierre L.', bg: 'var(--accent-red-light)' },
  { emoji: '👩🏻', name: 'Sarah M.', bg: 'var(--accent-blue-light)' },
  { emoji: '👨🏿', name: 'David O.', bg: 'var(--accent-gold-light)' },
  { emoji: '👩🏽', name: 'Ruth K.', bg: 'var(--accent-pray-light)' },
  { emoji: '👨🏻', name: 'Paul D.', bg: 'var(--accent-green-light)' },
  { emoji: '👩🏾', name: 'Grâce N.', bg: 'var(--accent-red-light)' },
  { emoji: '👨🏽', name: 'Luc P.', bg: 'var(--accent-blue-light)' },
  { emoji: '👩🏻', name: 'Anna T.', bg: 'var(--accent-gold-light)' },
];

export default function MembersGrid() {
  return (
    <div className="members-grid">
      {members.map((member, i) => (
        <div className="member-item" key={i}>
          <div className="member-avatar" style={{ background: member.bg }}>{member.emoji}</div>
          <span className="member-name">{member.name}</span>
        </div>
      ))}
    </div>
  );
}
