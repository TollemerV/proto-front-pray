import { Icons } from '../../components/church/ChurchIcons';

export default function ChurchDonations() {

  const history = [
    { name: 'Anonyme', date: "Aujourd'hui", amount: '50 €', color: 'var(--accent-blue-light)' },
    { name: 'Thomas Bernard', date: 'Hier', amount: '120 €', color: 'var(--accent-gold-light)' },
    { name: 'Famille L.', date: 'Le 04 Avril', amount: '500 €', color: 'var(--accent-pray-light)' }
  ];

  return (
    <div className="ch-tab-page">
      <div className="ch-tab-header">
        <h1 className="ch-tab-title">Dons</h1>
        <p className="ch-tab-subtitle">Suivi de la générosité · Avril</p>
      </div>

      {/* Hero Donation Card */}
      <div className="ch-donation-hero">
        <div className="ch-donation-hero-bg">
          <Icons.Wallet size={100} stroke="rgba(255,255,255,0.08)" />
        </div>
        <div className="ch-donation-hero-label">Total récolté</div>
        <div className="ch-donation-hero-amount">3 450 €</div>
        <div className="ch-donation-hero-bar">
          <div className="ch-donation-bar-bg">
            <div className="ch-donation-bar-fill" style={{ width: '85%' }} />
          </div>
          <div className="ch-donation-bar-info">
            <span>85% de l'objectif</span>
            <span>4 050 €</span>
          </div>
        </div>
        <div className="ch-donation-hero-badge">
          <Icons.Activity size={14} style={{marginRight: 4}} />
          +12% vs mars
        </div>
      </div>

      {/* Donation History */}
      <h2 className="ch-section-title" style={{marginTop: 24}}>Derniers dons</h2>
      <div className="ch-donation-list">
        {history.map((h, i) => (
          <div key={i} className="ch-donation-item">
            <div className="ch-donation-item-icon" style={{ backgroundColor: h.color }}>
              <Icons.Wallet size={18} stroke="var(--accent-gold)" />
            </div>
            <div className="ch-donation-item-info">
              <div className="ch-donation-item-name">{h.name}</div>
              <div className="ch-donation-item-date">
                <Icons.Calendar size={12} stroke="var(--text-tertiary)" style={{marginRight: 4}} />
                {h.date}
              </div>
            </div>
            <div className="ch-donation-item-amount">+{h.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
