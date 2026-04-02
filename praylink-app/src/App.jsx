import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import BottomNavbar from './components/BottomNavbar';
import Gateway from './pages/Gateway';
import Feed from './pages/Feed';
import Notifications from './pages/Notifications';
import CommunitiesList from './pages/CommunitiesList';
import CommunityDetail from './pages/CommunityDetail';
import ChurchDashboard from './pages/church/ChurchDashboard';
import ChurchMembers from './pages/church/ChurchMembers';
import ChurchEvents from './pages/church/ChurchEvents';
import ChurchAnnouncements from './pages/church/ChurchAnnouncements';
import ChurchPrayers from './pages/church/ChurchPrayers';
import ChurchNotifications from './pages/church/ChurchNotifications';
import ChurchDonations from './pages/church/ChurchDonations';
import Profile from './pages/Profile';
import PrayerThread from './pages/PrayerThread';
import CreatePostModal from './components/CreatePostModal';

import './index.css';
import './styles/MobileFrame.css';
import './styles/Feed.css';
import './styles/Church.css';
import './styles/Navbar.css';
import './styles/Profile.css';
import './styles/PrayerThread.css';
import './styles/CreatePost.css';

function AppContent() {
  const location = useLocation();
  const hideBottomNav = location.pathname.startsWith('/prayer') || location.pathname.startsWith('/church') || location.pathname === '/';
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="mobile-frame">
      {/* iOS Status Bar */}
      <div className="status-bar">
        <span className="time">10:41</span>
        <span className="icons">
          <span>📶</span>
          <span>🔋</span>
        </span>
      </div>

      {/* Screen Content */}
      <div className="screen-container">
        <Routes>
          <Route path="/" element={<Gateway />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/communities" element={<CommunitiesList />} />
          <Route path="/community/:id" element={<CommunityDetail />} />
          <Route path="/church" element={<ChurchDashboard />} />
          <Route path="/church/members" element={<ChurchMembers />} />
          <Route path="/church/events" element={<ChurchEvents />} />
          <Route path="/church/announcements" element={<ChurchAnnouncements />} />
          <Route path="/church/prayers" element={<ChurchPrayers />} />
          <Route path="/church/notifications" element={<ChurchNotifications />} />
          <Route path="/church/donations" element={<ChurchDonations />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/prayer/:id" element={<PrayerThread />} />
        </Routes>
      </div>

      {/* Bottom Navigation */}
      {!hideBottomNav && <BottomNavbar onOpenCreate={() => setIsCreateOpen(true)} />}

      {/* Modals */}
      <CreatePostModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
