import { useState } from 'react';

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
  prayLabel = 'Je prie',
  comments,
  likes,
}) {
  const [prayed, setPrayed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [prayAnimate, setPrayAnimate] = useState(false);
  const [likeAnimate, setLikeAnimate] = useState(false);

  const handlePray = () => {
    setPrayed(!prayed);
    if (!prayed) {
      setPrayAnimate(true);
      setTimeout(() => setPrayAnimate(false), 400);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    if (!liked) {
      setLikeAnimate(true);
      setTimeout(() => setLikeAnimate(false), 400);
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className={`post-avatar-placeholder ${avatarColor}`}>{avatar}</div>
        <div className="post-user-info">
          <div className="post-username">
            {username}
            {badge && <span className={`post-badge ${badgeType}`}>{badge}</span>}
          </div>
          <div className="post-time">{time}</div>
        </div>
        <button className="post-more">⋯</button>
      </div>

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

      <div className="post-actions">
        <button className={`post-action-btn pray-btn${prayed ? ' active' : ''}`} onClick={handlePray}>
          <span className={`action-icon${prayAnimate ? ' pray-animate' : ''}`}>🙏</span>
          <span>{prayLabel}</span>
        </button>
        <button className="post-action-btn comment-btn">
          <span className="action-icon">💬</span>
          <span>{comments}</span>
        </button>
        <button className={`post-action-btn like-btn${liked ? ' active' : ''}`} onClick={handleLike}>
          <span className={`action-icon${likeAnimate ? ' pray-animate' : ''}`}>❤️</span>
          <span>{likes}</span>
        </button>
        <span className="action-spacer"></span>
        <button className="post-action-btn share-btn">
          <span className="action-icon">↗</span>
        </button>
      </div>
    </div>
  );
}
