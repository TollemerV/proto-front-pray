import { useState, useRef, useEffect } from 'react';

const Icons = {
  Prière: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>,
  Témoignage: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>,
  Annonce: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>,
  Public: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>,
  Église: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v6"></path><path d="M10 5h4"></path><path d="M12 8l-8 6h3v8h4v-5h2v5h4v-8h3l-8-6z"></path></svg>,
  Groupe: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
};

export default function CreatePostModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    text: '',
    type: 'Prière', // Default
    target: 'Public', // Default
    tags: []
  });
  const [customTag, setCustomTag] = useState('');

  const predefinedTags = ['#santé', '#famille', '#finances', '#examen', '#paix', '#gratitude'];
  const displayTags = Array.from(new Set([...predefinedTags, ...formData.tags]));

  const handleAddCustomTag = () => {
    let tag = customTag.trim();
    if (!tag) return;
    if (!tag.startsWith('#')) tag = '#' + tag;
    
    if (!formData.tags.includes(tag)) {
      updateForm('tags', [...formData.tags, tag]);
    }
    setCustomTag('');
  };

  const textareaRef = useRef(null);

  useEffect(() => {
    if (isOpen && step === 3) {
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }, 400); // Wait for modal slide animation
    }
  }, [isOpen, step]);

  if (!isOpen) return null;

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleClose = () => {
    onClose();
    // Reset state after animation finishes
    setTimeout(() => {
      setStep(1);
      setFormData({ text: '', type: 'Prière', target: 'Public', tags: [] });
    }, 400);
  };

  const handlePublish = () => {
    // console.log("Publishing", formData);
    handleClose();
  };

  const updateForm = (key, value) => setFormData({ ...formData, [key]: value });

  return (
    <div className="create-post-overlay">
      <div className="create-post-modal">
        {/* Header */}
        <div className="create-header">
          {step > 1 ? (
            <button className="icon-btn" onClick={prevStep}>←</button>
          ) : (
             <button className="icon-btn" style={{visibility: 'hidden'}}>←</button>
          )}
          <div className="step-indicator">
            <span className="step-dots">
              {[1, 2, 3, 4, 5].map(s => (
                <span key={s} className={`dot ${s === step ? 'active' : ''}`}></span>
              ))}
            </span>
          </div>
          <button className="icon-btn" onClick={handleClose}>✕</button>
        </div>

        {/* Content Wrapper for Sliding */}
        <div className="create-content-wrapper">
          <div className="create-content-slider" style={{ transform: `translateX(-${(step - 1) * 20}%)` }}>
            
            {/* Step 1: Type */}
            <div className="create-step">
              <h2 className="step-title">Quel est le type de ce post ?</h2>
              <p className="step-subtitle">Cela aide la communauté à mieux réagir.</p>
              <div className="options-grid">
                {['Prière', 'Témoignage', 'Annonce'].map((type) => (
                  <button 
                    key={type}
                    className={`option-btn ${formData.type === type ? 'selected' : ''}`}
                    onClick={() => { updateForm('type', type); setTimeout(nextStep, 200); }}
                  >
                    <span className="option-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {Icons[type]}
                    </span>
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Target */}
            <div className="create-step">
              <h2 className="step-title">Qui peut voir ce post ?</h2>
              <p className="step-subtitle">Choisis ton audience.</p>
              <div className="options-grid">
                {[
                  { id: 'Public', label: 'Public', desc: 'Visible par tous les membres' },
                  { id: 'Église', label: 'Mon église', desc: 'Membres de ton église locale' },
                  { id: 'Groupe', label: 'Groupe', desc: 'Un cercle plus restreint' }
                ].map((tgt) => (
                  <button 
                    key={tgt.id}
                    className={`option-btn option-btn-large ${formData.target === tgt.id ? 'selected' : ''}`}
                    onClick={() => { updateForm('target', tgt.id); setTimeout(nextStep, 200); }}
                  >
                    <span className="option-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {Icons[tgt.id]}
                    </span>
                    <div className="option-text">
                      <div className="option-label">{tgt.label}</div>
                      <div className="option-desc">{tgt.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Write */}
            <div className="create-step">
              <h2 className="step-title">Créer un post</h2>
              <textarea 
                ref={textareaRef}
                className="create-textarea" 
                placeholder="Exprime ce que tu ressens..."
                value={formData.text}
                onChange={(e) => updateForm('text', e.target.value)}
              />
              <button 
                className="btn-primary step-btn" 
                disabled={!formData.text.trim()} 
                onClick={nextStep}
              >Suivant</button>
            </div>

            {/* Step 4: Options */}
            <div className="create-step">
              <h2 className="step-title">Options supplémentaires</h2>
              <p className="step-subtitle">Ajoute des tags pour mieux référencer ton post.</p>
              
              <div className="custom-tag-wrapper">
                <input 
                  type="text" 
                  className="custom-tag-input" 
                  placeholder="Écrire un tag (ex: #espoir)"
                  value={customTag}
                  onChange={(e) => setCustomTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddCustomTag();
                  }}
                />
                <button className="custom-tag-add" onClick={handleAddCustomTag}>+</button>
              </div>

              <div className="tags-container">
                {displayTags.map((tag) => {
                  const isSelected = formData.tags.includes(tag);
                  return (
                    <button 
                      key={tag}
                      className={`tag-btn ${isSelected ? 'selected' : ''}`}
                      onClick={() => {
                        const newTags = isSelected 
                          ? formData.tags.filter(t => t !== tag)
                          : [...formData.tags, tag];
                        updateForm('tags', newTags);
                      }}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
              <div className="spacer"></div>
              <button className="btn-primary step-btn" onClick={nextStep}>Continuer</button>
            </div>

            {/* Step 5: Publish */}
            <div className="create-step">
              <h2 className="step-title">C'est prêt !</h2>
              <p className="step-subtitle">Voici un aperçu de ton post.</p>
              
              <div className="post-preview">
                <div className="preview-header">
                  <div className="preview-badges">
                    <span className={`badge ${formData.type.toLowerCase().replace('é', 'e')}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ display: 'flex', width: '16px', height: '16px' }}>{Icons[formData.type]}</span> {formData.type}
                    </span>
                    <span className="badge target" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ display: 'flex', width: '16px', height: '16px' }}>{Icons[formData.target]}</span> {formData.target}
                    </span>
                  </div>
                </div>
                <div className="preview-content">
                  {formData.text}
                </div>
                {formData.tags.length > 0 && (
                  <div className="preview-tags">
                    {formData.tags.join(' ')}
                  </div>
                )}
              </div>
              <div className="spacer"></div>
              <button className="btn-primary step-btn publish-btn" onClick={handlePublish}>
                Publier
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
