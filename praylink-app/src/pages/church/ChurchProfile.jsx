import { useState } from 'react';
import { Icons } from '../../components/church/ChurchIcons';

export default function ChurchProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Église Vivante Paris');
  const [tagline, setTagline] = useState('Une communauté vivante, ancrée dans la Parole');
  const [description, setDescription] = useState(
    "L'Église Vivante Paris est une communauté chrétienne évangélique au cœur de Paris. Nous nous réunissons chaque dimanche pour adorer, étudier la Bible et vivre la foi ensemble."
  );
  const [location, setLocation] = useState('Paris 11e, France');
  const [website, setWebsite] = useState('eglisevivanteparis.fr');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="chp-root">

      {/* ── PUBLIC PREVIEW HEADER ── */}
      <div className="chp-preview-banner">
        <div className="chp-preview-label">
          <Icons.Globe size={13} style={{ marginRight: 5 }} />
          Aperçu de votre page publique
        </div>
      </div>

      {/* ── COVER + AVATAR ── */}
      <div className="chp-cover">
        <div className="chp-cover-gradient" />
        {isEditing && (
          <button className="chp-cover-edit-btn">
            <Icons.Plus size={16} />
            Photo de couverture
          </button>
        )}
      </div>

      <div className="chp-identity">
        <div className="chp-avatar-wrap">
          <div className="chp-avatar">⛪</div>
          {isEditing && (
            <button className="chp-avatar-edit-btn">
              <Icons.Plus size={14} />
            </button>
          )}
        </div>

        {!isEditing ? (
          /* ── READ VIEW ── */
          <div className="chp-info-read">
            <h1 className="chp-church-name">{name}</h1>
            <p className="chp-tagline">{tagline}</p>

            <div className="chp-meta-row">
              <div className="chp-meta-item">
                <Icons.Globe size={14} stroke="var(--text-tertiary)" />
                <span>{website}</span>
              </div>
              <div className="chp-meta-item">
                <Icons.Home size={14} stroke="var(--text-tertiary)" />
                <span>{location}</span>
              </div>
            </div>

            <div className="chp-stats-row">
              <div className="chp-stat">
                <span className="chp-stat-val">248</span>
                <span className="chp-stat-lbl">Membres</span>
              </div>
              <div className="chp-stat-div" />
              <div className="chp-stat">
                <span className="chp-stat-val">14</span>
                <span className="chp-stat-lbl">Prières actives</span>
              </div>
              <div className="chp-stat-div" />
              <div className="chp-stat">
                <span className="chp-stat-val">4</span>
                <span className="chp-stat-lbl">Événements</span>
              </div>
            </div>

            <div className="chp-desc-block">
              <p className="chp-desc-text">{description}</p>
            </div>

            <button className="chp-edit-btn" onClick={() => setIsEditing(true)}>
              <Icons.Settings size={16} />
              Modifier la page de l'église
            </button>
          </div>
        ) : (
          /* ── EDIT VIEW ── */
          <div className="chp-edit-form">
            <div className="chp-field">
              <label className="chp-label">Nom de l'église</label>
              <input
                className="chp-input"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Nom de l'église"
              />
            </div>

            <div className="chp-field">
              <label className="chp-label">Slogan / Accroche</label>
              <input
                className="chp-input"
                value={tagline}
                onChange={e => setTagline(e.target.value)}
                placeholder="Une courte phrase qui vous définit"
              />
            </div>

            <div className="chp-field">
              <label className="chp-label">Description</label>
              <textarea
                className="chp-textarea-edit"
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={4}
                placeholder="Décrivez votre église..."
              />
            </div>

            <div className="chp-field">
              <label className="chp-label">Ville / Adresse</label>
              <input
                className="chp-input"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="Paris, France"
              />
            </div>

            <div className="chp-field">
              <label className="chp-label">Site web</label>
              <input
                className="chp-input"
                value={website}
                onChange={e => setWebsite(e.target.value)}
                placeholder="votrsite.fr"
              />
            </div>

            <div className="chp-edit-actions">
              <button className="chp-cancel-btn" onClick={() => setIsEditing(false)}>
                Annuler
              </button>
              <button className="chp-save-btn" onClick={handleSave}>
                <Icons.Check size={16} />
                Enregistrer
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── SUCCESS TOAST ── */}
      {saved && (
        <div className="chp-toast">
          <Icons.Check size={16} stroke="white" />
          Page de l'église mise à jour !
        </div>
      )}
    </div>
  );
}
