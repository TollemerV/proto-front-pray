import { useState } from 'react';
import { AppIcons } from './Icons';

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
}) {
  const [prayed, setPrayed]       = useState(false);
  const [reposted, setReposted]   = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [prayAnimate, setPrayAnimate] = useState(false);

  const handlePray = () => {
    if (!prayed) {
      setPrayAnimate(true);
      setTimeout(() => setPrayAnimate(false), 400);
    }
    setPrayed(v => !v);
  };

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

        {/* LEFT — Pray, Comment, Repost, Share */}
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

          {/* Commenter */}
          <button className="pav2-btn" title="Commenter">
            <AppIcons.Comment size={22} stroke="var(--text-primary)" />
            <span className="pav2-count">{comments}</span>
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
          <button className="pav2-btn" title="Partager">
            <AppIcons.Share size={22} stroke="var(--text-primary)" />
          </button>

        </div>

        {/* RIGHT — Enregistrer */}
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
    </div>
  );
}
