import React from 'react';
import { X, PlusCircle, MapPin, Sparkles } from 'lucide-react';
import { HALLS_CONFIG } from '../data/hallsInfo';

export default function AddGameModal({ onClose, onAddGame, onShowToast }) {
  const [formData, setFormData] = React.useState({
    title: '',
    tagline: '',
    publisher: '',
    designers: '',
    artists: '',
    hall: 3,
    row: 'B',
    boothNumber: '210',
    boothName: '',
    demoTables: 6,
    signingSchedule: '',
    minPlayers: 2,
    maxPlayers: 4,
    minDuration: 45,
    maxDuration: 75,
    complexity: 3.0,
    price: 45,
    language: 'VF Intégrale',
    status: 'Sortie officielle Essen 2026',
    categories: 'Eurogame, Gestion',
    mechanics: 'Pose d\'ouvriers, Cartes',
    description: '',
    whyHyped: '',
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=800&q=80',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Veuillez saisir un titre pour le jeu.');
      return;
    }

    onAddGame(formData);
    onShowToast(`Jeu "${formData.title}" ajouté au catalogue (Hall ${formData.hall}, Stand ${formData.hall}-${formData.row}${formData.boothNumber}) !`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" style={{ maxWidth: '780px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} title="Fermer">
          <X size={20} />
        </button>

        <div style={{ padding: '1.75rem 2rem 1rem 2rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <PlusCircle size={22} style={{ color: 'var(--accent-gold)' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Ajouter une annonce Essen 2026</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.2rem' }}>
            Enregistrez un nouveau jeu découvert sur les réseaux ou les previews officielles avec sa géolocalisation dans Messe Essen.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '1.5rem 2rem 2rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Titre & Accroche */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div>
              <label className="filter-label">Titre du jeu *</label>
              <input
                type="text"
                required
                className="search-input"
                style={{ padding: '0.65rem 1rem' }}
                placeholder="Ex: Terraforming Mars: The Colonies"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div>
              <label className="filter-label">Éditeur *</label>
              <input
                type="text"
                required
                className="search-input"
                style={{ padding: '0.65rem 1rem' }}
                placeholder="Ex: IELLO / Matagot / CGE"
                value={formData.publisher}
                onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="filter-label">Accroche / Sous-titre en français</label>
            <input
              type="text"
              className="search-input"
              style={{ padding: '0.65rem 1rem' }}
              placeholder="Ex: Un duel tactique impitoyable dans les tranchées de la Première Guerre mondiale"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            />
          </div>

          {/* LOCALISATION DANS LE SALON (Hall, Rangée, Stand) */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.1rem' }}>
            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--accent-gold)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <MapPin size={16} /> Emplacement dans Messe Essen 2026
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
              <div>
                <label className="filter-label">Hall</label>
                <select
                  className="filter-select"
                  value={formData.hall}
                  onChange={(e) => setFormData({ ...formData, hall: Number(e.target.value) })}
                >
                  {Object.values(HALLS_CONFIG).map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.name} - {h.theme}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="filter-label">Allée / Rangée</label>
                <select
                  className="filter-select"
                  value={formData.row}
                  onChange={(e) => setFormData({ ...formData, row: e.target.value })}
                >
                  {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((r) => (
                    <option key={r} value={r}>
                      Rangée {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="filter-label">Numéro Stand</label>
                <input
                  type="text"
                  className="search-input"
                  style={{ padding: '0.6rem 0.85rem' }}
                  placeholder="Ex: 110"
                  value={formData.boothNumber}
                  onChange={(e) => setFormData({ ...formData, boothNumber: e.target.value })}
                />
              </div>

              <div>
                <label className="filter-label">Tables de démo</label>
                <input
                  type="number"
                  className="search-input"
                  style={{ padding: '0.6rem 0.85rem' }}
                  value={formData.demoTables}
                  onChange={(e) => setFormData({ ...formData, demoTables: Number(e.target.value) })}
                />
              </div>
            </div>
          </div>

          {/* Joueurs, Durée, Complexité, Prix */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
            <div>
              <label className="filter-label">Joueurs Min</label>
              <input
                type="number"
                className="search-input"
                style={{ padding: '0.6rem' }}
                value={formData.minPlayers}
                onChange={(e) => setFormData({ ...formData, minPlayers: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="filter-label">Joueurs Max</label>
              <input
                type="number"
                className="search-input"
                style={{ padding: '0.6rem' }}
                value={formData.maxPlayers}
                onChange={(e) => setFormData({ ...formData, maxPlayers: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="filter-label">Durée Min (min)</label>
              <input
                type="number"
                className="search-input"
                style={{ padding: '0.6rem' }}
                value={formData.minDuration}
                onChange={(e) => setFormData({ ...formData, minDuration: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="filter-label">Complexité (1 à 5)</label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                className="search-input"
                style={{ padding: '0.6rem' }}
                value={formData.complexity}
                onChange={(e) => setFormData({ ...formData, complexity: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="filter-label">Prix (€)</label>
              <input
                type="number"
                className="search-input"
                style={{ padding: '0.6rem' }}
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              />
            </div>
          </div>

          {/* Description en français */}
          <div>
            <label className="filter-label">Description du jeu</label>
            <textarea
              className="user-notes-textarea"
              placeholder="Présentez les principes du jeu, le pitch et les mécaniques en français..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="btn-primary">
              Ajouter au catalogue Essen 2026
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
