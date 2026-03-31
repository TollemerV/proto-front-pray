import { useState } from 'react';
import PostCard from '../PostCard';
import EventCard from './EventCard';
import PrayerRequest from './PrayerRequest';
import MembersGrid from './MembersGrid';

const tabs = [
  { id: 'wall', icon: '📝', label: 'Mur' },
  { id: 'events', icon: '📅', label: 'Événements' },
  { id: 'prayers', icon: '🙏', label: 'Prières', hasNotification: true },
  { id: 'members', icon: '👥', label: 'Membres' },
];

const events = [
  { month: 'AVR', day: '02', title: 'Soirée de louange & adoration', time: '🕐 19h30 — Salle principale' },
  { month: 'AVR', day: '06', title: 'Culte de Pâques', time: '🕐 10h00 — Église Béthel' },
  { month: 'AVR', day: '10', title: 'Groupe de jeunes — Bible study', time: '🕐 18h00 — Salle annexe' },
  { month: 'AVR', day: '15', title: 'Maraude solidaire', time: '🕐 14h00 — Place de la République' },
];

const prayers = [
  {
    avatar: '👩🏽', avatarBg: 'var(--accent-blue-light)',
    name: 'Marie Dupont', time: 'Il y a 30 min',
    text: 'Priez pour la guérison de mon père qui est hospitalisé. Merci pour votre soutien 🙏',
    count: 127,
    status: 'en_cours',
  },
  {
    avatar: '👨🏻', avatarBg: 'var(--accent-gold-light)',
    name: 'Thomas Bernard', time: 'Il y a 2h',
    text: 'Je cherche un logement à Paris depuis 3 mois. Prions ensemble pour que Dieu ouvre une porte 🏠',
    count: 23,
    status: 'en_cours',
  },
  {
    avatar: '👩🏾', avatarBg: 'var(--accent-pray-light)',
    name: 'Esther Mbeki', time: 'Il y a 5h',
    text: 'Prions pour la paix dans nos familles et dans le monde. Que l\'amour de Christ règne partout 🕊️',
    count: 67,
    status: 'exaucee',
  },
];

export default function ChurchTabs() {
  const [activeTab, setActiveTab] = useState('wall');

  return (
    <>
      <div className="church-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`church-tab${activeTab === tab.id ? ' active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="church-tab-icon">{tab.icon}</span>
            <span className="church-tab-label">{tab.label}</span>
            {tab.hasNotification && <span className="tab-notification-dot"></span>}
          </button>
        ))}
      </div>

      {/* Tab: Mur */}
      <div className={`church-tab-content${activeTab === 'wall' ? ' active' : ''}`}>
        <div className="feed-container" style={{ padding: 0 }}>
          <PostCard
            avatar="⛪"
            avatarColor="gold"
            username="Église Béthel"
            badge="⛪ Officiel"
            badgeType="church"
            time="Il y a 2h"
            content="🎶 Quel culte extraordinaire ce dimanche ! Merci à tous les bénévoles et au groupe de louange. Revivez les moments forts en story ! #culte #louange"
            socialProof={{ icon: '🙏', text: '198 personnes prient avec eux' }}
            prayLabel="Amen"
            comments={34}
            likes={198}
          />
          <PostCard
            avatar="👨🏿"
            avatarColor="blue"
            username="Pasteur Emmanuel"
            time="Hier"
            content="Chers bien-aimés, n'oubliez pas notre soirée de prière ce mercredi à 19h30. Venez avec un cœur ouvert, Dieu va faire de grandes choses ! 🔥"
            socialProof={{ icon: '🙏', text: '76 personnes s\'associent' }}
            prayLabel="Soutenir"
            comments={18}
            likes={76}
          />
        </div>
      </div>

      {/* Tab: Événements */}
      <div className={`church-tab-content${activeTab === 'events' ? ' active' : ''}`}>
        {events.map((event, i) => (
          <EventCard key={i} {...event} />
        ))}
      </div>

      {/* Tab: Prières */}
      <div className={`church-tab-content${activeTab === 'prayers' ? ' active' : ''}`}>
        <button className="ask-prayer-cta-btn">
          <span className="text">🙏 Demander une prière</span>
        </button>

        <div className="section-title highlight-title">⭐ Prière du moment</div>
        <PrayerRequest {...prayers[0]} />

        <div className="section-title" style={{ marginTop: '24px' }}>Récents</div>
        {prayers.slice(1).map((prayer, i) => (
          <PrayerRequest key={i} {...prayer} />
        ))}
      </div>

      {/* Tab: Membres */}
      <div className={`church-tab-content${activeTab === 'members' ? ' active' : ''}`}>
        <MembersGrid />
      </div>
    </>
  );
}
