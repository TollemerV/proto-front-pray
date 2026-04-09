import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const members = [
  { emoji: '👨🏿', name: 'Pasteur Emmanuel', role: 'Pasteur', bg: 'var(--accent-blue-light)', active: true, slug: 'pasteur-emmanuel' },
  { emoji: '👩🏽', name: 'Marie D.', role: 'Membre', bg: 'var(--accent-gold-light)', active: true, slug: 'marie-dupont' },
  { emoji: '👨🏻', name: 'Thomas B.', role: 'Membre', bg: 'var(--accent-pray-light)', active: false, slug: 'thomas-bernard' },
  { emoji: '👩🏾', name: 'Esther M.', role: 'Chorale', bg: 'var(--accent-green-light)', active: true, slug: 'esther-mbeki' },
  { emoji: '👨🏽', name: 'Jean-Pierre L.', role: 'Membre', bg: 'var(--accent-red-light)', active: false, slug: 'jean-pierre' },
  { emoji: '👩🏻', name: 'Sarah M.', role: 'Jeunesse', bg: 'var(--accent-blue-light)', active: true, slug: 'sarah-martin' },
];

export default function MembersGrid() {
  const navigate = useNavigate();
  const [following, setFollowing] = useState({});

  const handleFollow = (index) => {
    setFollowing(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="members-list">
      {members.map((member, i) => (
        <div className="member-card" key={i}>
          <div
            className="member-avatar-wrapper"
            onClick={() => navigate(`/user/${member.slug}`)}
            style={{ cursor: 'pointer' }}
          >
            <div className="member-avatar" style={{ background: member.bg }}>{member.emoji}</div>
            {member.active && <div className="member-active-badge"></div>}
          </div>
          <div
            className="member-info"
            onClick={() => navigate(`/user/${member.slug}`)}
            style={{ cursor: 'pointer' }}
          >
            <div className="member-name">{member.name}</div>
            <div className="member-role">{member.role}</div>
          </div>
          <div className="member-actions">
            <button
              className={`member-action-btn follow ${following[i] ? 'active' : ''}`}
              onClick={() => handleFollow(i)}
            >
              {following[i] ? '✓ Suivi' : '+ Suivre'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
