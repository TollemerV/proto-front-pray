import { useNavigate } from 'react-router-dom';
import { Icons } from '../../components/church/ChurchIcons';

export default function ChurchNotifications() {
  const navigate = useNavigate();

  return (
    <div className="church-page-container">
      
      <div className="church-page-header">
        <button onClick={() => navigate('/church')} className="church-back-btn">
          <Icons.ArrowLeft size={20} />
        </button>
        <div className="church-page-title-group">
          <h1 className="church-page-title">Notification Push</h1>
          <p className="church-page-subtitle">Alertez instantanément vos membres</p>
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--bg-card)', padding: '24px', borderRadius: '24px', boxShadow: 'var(--shadow-md)' }}>
        <label style={{ display: 'block', fontWeight: '800', marginBottom: '12px', fontSize: '14px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Désigner l'audience</label>
        <select style={{ width: '100%', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-medium)', marginBottom: '24px', fontSize: '15px', backgroundColor: 'var(--bg-primary)', fontWeight: '600', color: 'var(--text-primary)', appearance: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%236B7280\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', backgroundSize: '18px' }}>
          <option>Toute l'église (248)</option>
          <option>Groupe : Prière du soir</option>
          <option>Groupe : Jeunes</option>
          <option>Membres inactifs</option>
        </select>

        <label style={{ display: 'block', fontWeight: '800', marginBottom: '12px', fontSize: '14px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Message Push</label>
        <textarea 
          placeholder="Rédigez le texte de la notification..." 
          style={{ width: '100%', minHeight: '120px', padding: '18px', borderRadius: '16px', border: '1px solid var(--border-medium)', fontFamily: 'inherit', fontSize: '16px', marginBottom: '24px', resize: 'vertical', backgroundColor: 'var(--bg-primary)' }}
        />

        <button className="church-create-btn" style={{ background: 'var(--accent-pray)', boxShadow: '0 4px 14px rgba(123, 104, 238, 0.3)' }}>
          <Icons.Bell size={20} />
          Envoyer la notification
        </button>
      </div>

    </div>
  );
}
