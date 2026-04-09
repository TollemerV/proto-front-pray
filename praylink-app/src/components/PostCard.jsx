import { useState } from 'react';
import { AppIcons } from './Icons';

/* ── Mock commentaires de base ── */
const SEED_COMMENTS = [
  { id: 1, avatar: '👩🏽', name: 'Marie Dupont',    time: 'Il y a 10 min', text: 'Amen ! Que Dieu vous bénisse 🙏' },
  { id: 2, avatar: '👨🏿', name: 'Pasteur Samuel',  time: 'Il y a 25 min', text: 'Merci pour ce partage, cela touche mon cœur ❤️' },
];

export default function PostCard({
  avatar,
  avatarColor = 'blue',
  username,
  badge,
  badgeType = 'public',
  time,
  content,
  hashtags = [],
  socialProof,
  comments = 0,
  likes = 0,
  prayLabel,
  onShare,
}) {
  const [prayed,      setPrayed]      = useState(false);
  const [reposted,    setReposted]    = useState(false);
  const [bookmarked,  setBookmarked]  = useState(false);
  const [prayAnimate, setPrayAnimate] = useState(false);

  // Comments state
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [commentList,  setCommentList]  = useState(SEED_COMMENTS.slice(0, Math.min(2, comments)));
  const [inputText,    setInputText]    = useState('');

  const handlePray = () => {
    if (!prayed) {
      setPrayAnimate(true);
      setTimeout(() => setPrayAnimate(false), 400);
    }
    setPrayed(v => !v);
  };

  const handleSendComment = () => {
    if (!inputText.trim()) return;
    setCommentList(prev => [
      ...prev,
      { id: Date.now(), avatar: '👤', name: 'Moi', time: 'À l\'instant', text: inputText.trim() },
    ]);
    setInputText('');
  };

  const totalComments = commentList.length;

  return (
    <div className="post-card">
      {/* Header */}
      <div className="post-header">
        <div className={`post-avatar-placeholder ${avatarColor}`}>{avatar}</div>
        <div className="post-user-info">
          <div className="post-username">
            {username}
            {badge && <span className={`post-badge ${badgeType}`}>{badge}</span>}
          </div>
          <div className="post-time">{time}</div>
        </div>
        <button className="post-more">
          <AppIcons.More size={20} stroke="var(--text-tertiary)" />
        </button>
      </div>

      {/* Content */}
      <div className="post-content">{content}</div>

      {hashtags.length > 0 && (
        <div className="post-hashtags">
          {hashtags.map((tag, i) => (
            <span className="hashtag" key={i}>#{tag}</span>
          ))}
        </div>
      )}

      {socialProof && (
        <div className="post-social-proof">
          <span className="social-proof-icon">{socialProof.icon}</span>
          <span className="social-proof-text">{socialProof.text}</span>
        </div>
      )}

      {/* ── Action Bar ── */}
      <div className="post-actions-v2">
        <div className="post-actions-v2-left">

          {/* Prier */}
          <button
            className={`pav2-btn${prayed ? ' pav2-pray-active' : ''}`}
            onClick={handlePray}
            title="Prier"
          >
            <AppIcons.Prayer
              size={22}
              className={prayAnimate ? 'pray-animate' : ''}
              stroke={prayed ? 'var(--accent-pray)' : 'var(--text-primary)'}
              fill={prayed ? 'rgba(123,104,238,0.12)' : 'none'}
            />
            <span className={`pav2-count${prayed ? ' pav2-count-active' : ''}`}>
              {likes + (prayed ? 1 : 0)}
            </span>
          </button>

          {/* Commenter — toggle */}
          <button
            className={`pav2-btn${commentsOpen ? ' pav2-comment-active' : ''}`}
            title="Commenter"
            onClick={() => setCommentsOpen(o => !o)}
          >
            <AppIcons.Comment
              size={22}
              stroke={commentsOpen ? 'var(--accent-blue)' : 'var(--text-primary)'}
            />
            <span className={`pav2-count${commentsOpen ? ' pav2-count-blue' : ''}`}>
              {totalComments}
            </span>
          </button>

          {/* Republier */}
          <button
            className={`pav2-btn${reposted ? ' pav2-repost-active' : ''}`}
            onClick={() => setReposted(v => !v)}
            title="Republier"
          >
            <AppIcons.Repost
              size={22}
              stroke={reposted ? 'var(--accent-green)' : 'var(--text-primary)'}
            />
          </button>

          {/* Partager */}
          <button className="pav2-btn" title="Partager" onClick={onShare}>
            <AppIcons.Share size={22} stroke="var(--text-primary)" />
          </button>
        </div>

        {/* Enregistrer */}
        <button
          className={`pav2-btn${bookmarked ? ' pav2-bookmark-active' : ''}`}
          onClick={() => setBookmarked(v => !v)}
          title="Enregistrer"
        >
          <AppIcons.Bookmark
            size={22}
            stroke={bookmarked ? 'var(--accent-blue)' : 'var(--text-primary)'}
            fill={bookmarked ? 'var(--accent-blue)' : 'none'}
          />
        </button>
      </div>

      {/* ── Comments section ── */}
      {commentsOpen && (
        <div className="post-comments-section">

          {/* Liste */}
          {commentList.length > 0 ? (
            <div className="post-comments-list">
              {commentList.map(c => (
                <div key={c.id} className="post-comment-row">
                  <span className="post-comment-avatar">{c.avatar}</span>
                  <div className="post-comment-body">
                    <div className="post-comment-meta">
                      <span className="post-comment-name">{c.name}</span>
                      <span className="post-comment-time">{c.time}</span>
                    </div>
                    <p className="post-comment-text">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="post-comments-empty">Soyez le premier à commenter 🙏</p>
          )}

          {/* Input */}
          <div className="post-comment-input-row">
            <span className="post-comment-input-avatar">👤</span>
            <div className="post-comment-input-wrap">
              <input
                className="post-comment-input"
                type="text"
                placeholder="Ajouter un commentaire…"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendComment()}
              />
              <button
                className="post-comment-send"
                onClick={handleSendComment}
                disabled={!inputText.trim()}
              >
                <AppIcons.Share size={16} stroke="white" />
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
