import { useState } from 'react';
import '../styles/ShareSheet.css';

/* ── Mock contacts ── */
const CONTACTS = [
  { id: 1, avatar: '👩🏽', name: 'Marie Dupont',    sub: 'Amie · En ligne' },
  { id: 2, avatar: '👨🏿', name: 'David Okafor',    sub: 'Frère en Christ' },
  { id: 3, avatar: '👩🏾', name: 'Esther Mbeki',    sub: 'Sœur de prière' },
  { id: 4, avatar: '👨🏻', name: 'Thomas Bernard',  sub: 'Groupe de jeunes' },
  { id: 5, avatar: '👩🏻', name: 'Sarah Martin',    sub: 'Amie · 3 amis communs' },
];

const SHARE_OPTIONS = [
  { id: 'story',     icon: '📖', label: 'Story',       color: '#7B68EE' },
  { id: 'copy',      icon: '🔗', label: 'Copier',       color: '#6366f1' },
  { id: 'whatsapp',  icon: '💬', label: 'WhatsApp',     color: '#25D366' },
  { id: 'instagram', icon: '📸', label: 'Instagram',    color: '#E1306C' },
  { id: 'telegram',  icon: '✈️',  label: 'Telegram',     color: '#229ED9' },
  { id: 'email',     icon: '📧', label: 'Email',        color: '#EA4335' },
];

export default function ShareSheet({ post, onClose }) {
  const [sent,   setSent]   = useState(null);
  const [copied, setCopied] = useState(false);

  const handleSendTo = (contact) => {
    setSent(contact.id);
    setTimeout(() => setSent(null), 1500);
  };

  const handleOption = (opt) => {
    if (opt.id === 'copy') {
      setCopied(true);
      setTimeout(() => { setCopied(false); onClose(); }, 1500);
    } else {
      onClose();
    }
  };

  return (
    <div className="share-overlay" onClick={onClose}>
      <div className="share-sheet" onClick={e => e.stopPropagation()}>
        <div className="share-handle" />

        {/* Header */}
        <div className="share-header">
          <span className="share-title">Partager</span>
          <button className="share-close" onClick={onClose}>✕</button>
        </div>

        {/* Post preview */}
        <div className="share-preview">
          <span className="share-preview-avatar">{post.avatar}</span>
          <div className="share-preview-text">
            <span className="share-preview-user">{post.username}</span>
            <p className="share-preview-content">
              {post.content.length > 80 ? post.content.slice(0, 80) + '…' : post.content}
            </p>
          </div>
        </div>

        {/* Send to contacts */}
        <p className="share-section-label">Envoyer à</p>
        <div className="share-contacts-row">
          {CONTACTS.map(c => (
            <button
              key={c.id}
              className={`share-contact ${sent === c.id ? 'sent' : ''}`}
              onClick={() => handleSendTo(c)}
            >
              <span className="share-contact-avatar">
                {sent === c.id ? '✓' : c.avatar}
              </span>
              <span className="share-contact-name">{c.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Apps grid */}
        <p className="share-section-label">Partager via</p>
        <div className="share-options-grid">
          {SHARE_OPTIONS.map(opt => (
            <button
              key={opt.id}
              className="share-option-btn"
              onClick={() => handleOption(opt)}
            >
              <span
                className="share-option-icon"
                style={{ background: opt.color + '18', border: `1.5px solid ${opt.color}33` }}
              >
                {opt.icon}
              </span>
              <span className="share-option-label">
                {opt.id === 'copy' && copied ? '✓ Copié !' : opt.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
