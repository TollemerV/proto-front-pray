import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import BottomNavbar from './components/BottomNavbar';
import Feed from './pages/Feed';
import Notifications from './pages/Notifications';
import Communities from './pages/Communities';
import Profile from './pages/Profile';
import PrayerThread from './pages/PrayerThread';

import './index.css';
import './styles/MobileFrame.css';
import './styles/Feed.css';
import './styles/Church.css';
import './styles/Navbar.css';
import './styles/Profile.css';
import './styles/PrayerThread.css';

function AppContent() {
  const location = useLocation();
  const hideBottomNav = location.pathname.startsWith('/prayer');

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
          <Route path="/" element={<Feed />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/prayer/:id" element={<PrayerThread />} />
        </Routes>
      </div>

      {/* Bottom Navigation */}
      {!hideBottomNav && <BottomNavbar />}
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
