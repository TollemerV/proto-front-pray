import AppHeader from '../components/AppHeader';
import StoryRow from '../components/StoryRow';
import VerseCard from '../components/VerseCard';
import PostCard from '../components/PostCard';

const posts = [
  {
    avatar: '👩🏽', avatarColor: 'blue',
    username: 'Marie Dupont', badge: '🌍 Public', badgeType: 'public',
    time: 'Il y a 15 min',
    content: 'Merci de prier pour moi, j\'ai un examen très important demain matin 🙏 Je ressens beaucoup de stress mais je sais que Dieu est avec moi.',
    hashtags: ['priere', 'examen', 'confiance'],
    socialProof: { icon: '🙏', text: '127 personnes prient pour toi' },
    comments: 24, likes: 89,
  },
  {
    avatar: '👨🏿', avatarColor: 'gold',
    username: 'David Okafor', badge: '⛪ Église Béthel', badgeType: 'church',
    time: 'Il y a 1h',
    content: '🎉 Témoignage : Après 3 ans de prière, j\'ai enfin trouvé un emploi ! Dieu est fidèle. Ne perdez jamais espoir, mes frères et sœurs. Il agit en Son temps parfait.',
    hashtags: ['témoignage', 'fidélité', 'emploi'],
    comments: 56, likes: 342,
  },
  {
    avatar: '👩🏻', avatarColor: 'purple',
    username: 'Sarah Martin', badge: '👥 Groupe Femmes', badgeType: 'group',
    time: 'Il y a 3h',
    content: 'Sœurs en Christ, prions ensemble pour la guérison de ma mère. Elle traverse un moment difficile. Votre soutien signifie tellement pour notre famille 💕',
    hashtags: ['guérison', 'prieredefamille'],
    socialProof: { icon: '🙏', text: '89 personnes prient pour toi' },
    comments: 31, likes: 156,
  },
  {
    avatar: '👨🏽', avatarColor: 'green',
    username: 'Jean-Pierre L.', badge: '⛪ Église Lumière', badgeType: 'church',
    time: 'Il y a 5h',
    content: '« L\'Éternel est mon berger, je ne manquerai de rien. » — Psaume 23:1 ✨ Ce verset m\'accompagne chaque jour. Quel est le vôtre ?',
    hashtags: ['versetdujour', 'psaume23'],
    comments: 45, likes: 210,
  },
];

export default function Feed() {
  return (
    <>
      <AppHeader />
      <StoryRow />
      <VerseCard />
      <div className="feed-container">
        {posts.map((post, i) => (
          <PostCard key={i} {...post} />
        ))}
        <div style={{ height: 20 }}></div>
      </div>
    </>
  );
}
