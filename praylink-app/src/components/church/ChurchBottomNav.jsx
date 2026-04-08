import { Icons } from './ChurchIcons';

const tabs = [
  { id: 'home',      label: 'Accueil',     icon: Icons.Home,     iconSolid: Icons.HomeSolid },
  { id: 'prayers',   label: 'Prières',     icon: Icons.Prayer,   iconSolid: Icons.PrayerSolid },
  { id: 'events',    label: 'Événements',  icon: Icons.Calendar, iconSolid: Icons.CalendarSolid },
  { id: 'donations', label: 'Dons',        icon: Icons.Wallet,   iconSolid: Icons.WalletSolid },
  { id: 'profile',   label: 'Notre page',  icon: Icons.Globe,    iconSolid: Icons.Globe },
];

export default function ChurchBottomNav({ active, onChange }) {
  return (
    <nav className="church-bottom-nav">
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        const IconComponent = isActive ? tab.iconSolid : tab.icon;
        return (
          <button
            key={tab.id}
            className={`church-nav-item${isActive ? ' church-nav-active' : ''}`}
            onClick={() => onChange(tab.id)}
          >
            <span className="church-nav-icon">
              <IconComponent size={22} />
            </span>
            <span className="church-nav-label">{tab.label}</span>
            {isActive && <span className="church-nav-indicator" />}
          </button>
        );
      })}
    </nav>
  );
}
