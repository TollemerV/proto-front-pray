import { useState } from 'react';
import ChurchBottomNav from '../../components/church/ChurchBottomNav';
import ChurchHome from './ChurchHome';
import ChurchPrayers from './ChurchPrayers';
import ChurchEvents from './ChurchEvents';
import ChurchDonations from './ChurchDonations';
import ChurchProfile from './ChurchProfile';
import ChurchMembers from './ChurchMembers';
import CreatePostWizard from '../../components/church/CreatePostWizard';

export default function ChurchDashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [showPostWizard, setShowPostWizard] = useState(false);

  return (
    <div className="church-shell">
      {/* Tab content */}
      <div className="church-shell-content">
        {activeTab === 'home'      && <ChurchHome onNavigate={setActiveTab} />}
        {activeTab === 'prayers'   && <ChurchPrayers />}
        {activeTab === 'events'    && <ChurchEvents />}
        {activeTab === 'donations' && <ChurchDonations />}
        {activeTab === 'profile'   && <ChurchProfile />}
        {activeTab === 'members'   && <ChurchMembers />}
      </div>

      {/* ── FAB ── */}
      <button
        className="ch-fab"
        onClick={() => setShowPostWizard(true)}
        aria-label="Créer un post"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.8" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      {/* Bottom navigation */}
      <ChurchBottomNav active={activeTab} onChange={setActiveTab} />

      {/* Post creation wizard */}
      {showPostWizard && (
        <CreatePostWizard onClose={() => setShowPostWizard(false)} />
      )}
    </div>
  );
}
