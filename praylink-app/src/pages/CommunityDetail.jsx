import { useState } from 'react';
import ChurchCover from '../components/church/ChurchCover';
import ChurchInfo from '../components/church/ChurchInfo';
import ChurchTabs from '../components/church/ChurchTabs';
import ShareSheet from '../components/ShareSheet';
import { useNavigate } from 'react-router-dom';

export default function CommunityDetail() {
  const navigate = useNavigate();
  const [sharingPost, setSharingPost] = useState(null);

  return (
    <div className="feed-frame">
      <div className="feed-scroll-area" style={{ position: 'relative' }}>
        <button 
          onClick={() => navigate('/communities')}
          style={{ 
            position: 'absolute', 
            top: '20px', 
            left: '20px', 
            zIndex: 100, 
            width: '36px', 
            height: '36px', 
            borderRadius: '50%', 
            backgroundColor: 'rgba(0, 0, 0, 0.4)', 
            backdropFilter: 'blur(10px)',
            border: 'none',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <ChurchCover />
        <ChurchInfo />
        <ChurchTabs onSharePost={(post) => setSharingPost(post)} />
        <div style={{ height: 20 }}></div>
      </div>

      {/* Share sheet — positioned absolute to feed-frame = stays in phone */}
      {sharingPost && (
        <ShareSheet
          post={sharingPost}
          onClose={() => setSharingPost(null)}
        />
      )}
    </div>
  );
}
