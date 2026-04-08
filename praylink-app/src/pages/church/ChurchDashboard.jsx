import { useState } from 'react';
import ChurchBottomNav from '../../components/church/ChurchBottomNav';
import ChurchHome from './ChurchHome';
import ChurchPrayers from './ChurchPrayers';
import ChurchEvents from './ChurchEvents';
import ChurchDonations from './ChurchDonations';
import ChurchProfile from './ChurchProfile';

export default function ChurchDashboard() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="church-shell">
      {/* Tab content */}
      <div className="church-shell-content">
        {activeTab === 'home'      && <ChurchHome onNavigate={setActiveTab} />}
        {activeTab === 'prayers'   && <ChurchPrayers />}
        {activeTab === 'events'    && <ChurchEvents />}
        {activeTab === 'donations' && <ChurchDonations />}
        {activeTab === 'profile'   && <ChurchProfile />}
      </div>

      {/* Bottom navigation */}
      <ChurchBottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  );
}
