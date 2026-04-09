import { useState } from 'react';
import PostCard from '../PostCard';
import EventCard from './EventCard';
import PrayerRequest from './PrayerRequest';
import MembersGrid from './MembersGrid';

const tabs = [
  { id: 'wall', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="14" width="7" height="7" rx="1"></rect><rect x="3" y="14" width="7" height="7" rx="1"></rect></svg>, label: 'Mur' },
  { id: 'events', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>, label: 'Événements' },
  { id: 'prayers', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>, label: 'Prières', hasNotification: true },
  { id: 'members', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>, label: 'Membres' },
];

const events = [
  {
    month: 'AVR', day: '02',
    title: 'Soirée de louange & adoration',
    time: '19h30',
    location: 'Salle principale — Église Béthel',
    description: 'Une soirée de louange et d\'adoration pour célébrer la présence de Dieu ensemble. Programme : louange contemporaine, temps de prière, témoignages.',
    audience: 'public',
    organizer: 'Pasteur Emmanuel',
  },
  {
    month: 'AVR', day: '06',
    title: 'Culte de Pâques',
    time: '10h00',
    location: 'Église Béthel — Grande salle',
    description: 'Le culte de résurrection le plus attendu de l\'année. Toute la famille est invitée. Accueil des enfants dès 9h45.',
    audience: 'public',
    organizer: 'Équipe pastorale',
  },
  {
    month: 'AVR', day: '10',
    title: 'Groupe de jeunes — Bible study',
    time: '18h00',
    location: 'Salle annexe — 1er étage',
    description: 'Étude biblique pour les 15-25 ans. Ce mois-ci : les paraboles de Jésus.',
    audience: 'membres',
    organizer: 'Responsable Jeunesse',
  },
  {
    month: 'AVR', day: '15',
    title: 'Maraude solidaire',
    time: '14h00',
    location: 'Place de la République — Paris',
    description: 'Distribution de repas et rencontre avec les personnes sans-abri. Venez avec votre cœur et vos bras !',
    audience: 'public',
    organizer: 'Équipe diaconie',
  },
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

export default function ChurchTabs({ onSharePost }) {
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
            <span className="church-tab-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {tab.icon}
            </span>
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
            onShare={() => onSharePost?.({ avatar: '⛪', username: 'Église Béthel', content: '🎶 Quel culte extraordinaire ce dimanche ! Merci à tous les bénévoles et au groupe de louange. Revivez les moments forts en story ! #culte #louange' })}
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
            onShare={() => onSharePost?.({ avatar: '👨🏿', username: 'Pasteur Emmanuel', content: 'Chers bien-aimés, n\'oubliez pas notre soirée de prière ce mercredi à 19h30. Venez avec un cœur ouvert, Dieu va faire de grandes choses ! 🔥' })}
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
