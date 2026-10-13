import React from 'react';
import { 
  Search, 
  X, 
  SlidersHorizontal, 
  ArrowUpDown, 
  LayoutGrid, 
  Grid2X2, 
  RotateCcw,
  Sparkles,
  MapPin
} from 'lucide-react';
import { HALLS_CONFIG } from '../data/hallsInfo';

export const POPULAR_TAGS = [
  'Eurogame',
  'Deckbuilding',
  'Pose d\'ouvriers',
  'Coopératif',
  'Gestion',
  'Cartes',
  'Science-Fiction',
  'Nature / Animaux',
  'Japon',
  'Ambiance',
  'Enquête',
  'Figurines',
];

export default function FiltersBar({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  filterComplexity,
  setFilterComplexity,
  filterPlayers,
  setFilterPlayers,
  filterDuration,
  setFilterDuration,
  filterLanguage,
  setFilterLanguage,
  filterStatus,
  setFilterStatus,
  selectedTag,
  setSelectedTag,
  selectedHall,
  setSelectedHall,
  hasActiveFilters,
  onResetFilters,
}) {
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  return (
    <div className="filter-dashboard">
      {/* Ligne Principale : Recherche + Tri + Vue */}
      <div className="search-primary-row">
        {/* Barre de Recherche */}
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon-left" />
          <input
            type="text"
            className="search-input"
            placeholder="Rechercher par titre, éditeur, auteur, mécanique ou stand (ex: 3-B110)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              className="search-clear-btn" 
              onClick={() => setSearchTerm('')}
              title="Effacer la recherche"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Sélecteur de Tri */}
        <div className="sort-select-wrapper">
          <select 
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="hype">🔥 Plus Attendus (Hype Essen 2026)</option>
            <option value="location">📍 Parcours Salon (Hall & Rangée)</option>
            <option value="rating">⭐ Note BGG Décroissante</option>
            <option value="title_asc">🔤 Titre de A à Z</option>
            <option value="complexity_asc">🧩 Complexité : Familial d'abord</option>
            <option value="complexity_desc">🧠 Complexité : Expert d'abord</option>
            <option value="duration_asc">⏱️ Durée : Parties rapides d'abord</option>
            <option value="price_asc">💶 Prix croissant (€)</option>
          </select>
        </div>

        {/* Bouton Filtres Avancés */}
        <button
          className={`btn-secondary ${showAdvanced || hasActiveFilters ? 'active' : ''}`}
          onClick={() => setShowAdvanced(!showAdvanced)}
          title="Afficher/Masquer les critères détaillés"
        >
          <SlidersHorizontal size={17} />
          <span>Filtres {hasActiveFilters ? '• Actifs' : ''}</span>
        </button>

        {/* Toggle Vue Compacte / Détaillée */}
        <div className="view-toggle-group">
          <button
            className={`view-btn ${viewMode === 'detailed' ? 'active' : ''}`}
            onClick={() => setViewMode('detailed')}
            title="Vue Grille Complète"
          >
            <LayoutGrid size={18} />
          </button>
          <button
            className={`view-btn ${viewMode === 'compact' ? 'active' : ''}`}
            onClick={() => setViewMode('compact')}
            title="Vue Grille Compacte"
          >
            <Grid2X2 size={18} />
          </button>
        </div>
      </div>

      {/* Panneau des Filtres Avancés (Déroulable ou actif) */}
      {(showAdvanced || hasActiveFilters) && (
        <div className="advanced-filters-panel">
          {/* Hall */}
          <div className="filter-group">
            <label className="filter-label">Hall du Salon</label>
            <select
              className="filter-select"
              value={selectedHall !== null ? selectedHall : ''}
              onChange={(e) => setSelectedHall(e.target.value === '' ? null : Number(e.target.value))}
            >
              <option value="">Tous les Halls (1 à 6)</option>
              {Object.values(HALLS_CONFIG).map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name} - {h.theme}
                </option>
              ))}
            </select>
          </div>

          {/* Complexité / Public */}
          <div className="filter-group">
            <label className="filter-label">Public / Complexité</label>
            <select
              className="filter-select"
              value={filterComplexity}
              onChange={(e) => setFilterComplexity(e.target.value)}
            >
              <option value="all">Tous les niveaux</option>
              <option value="familial">Familial (&lt; 2.3)</option>
              <option value="initie">Initié (2.3 - 3.4)</option>
              <option value="expert">Expert (&gt; 3.4)</option>
            </select>
          </div>

          {/* Nombre de joueurs */}
          <div className="filter-group">
            <label className="filter-label">Configuration Joueurs</label>
            <select
              className="filter-select"
              value={filterPlayers}
              onChange={(e) => setFilterPlayers(e.target.value)}
            >
              <option value="all">Tous effectifs</option>
              <option value="solo">Jouable en Solo (1 joueur)</option>
              <option value="duo">Optimisé 2 joueurs</option>
              <option value="medium">3 à 4 joueurs</option>
              <option value="large">5 joueurs et plus</option>
            </select>
          </div>

          {/* Durée de jeu */}
          <div className="filter-group">
            <label className="filter-label">Durée de partie</label>
            <select
              className="filter-select"
              value={filterDuration}
              onChange={(e) => setFilterDuration(e.target.value)}
            >
              <option value="all">Toutes durées</option>
              <option value="short">Moins de 30 min (Rapide)</option>
              <option value="medium">30 à 60 min (Moyen)</option>
              <option value="long">60 à 120 min (Complet)</option>
              <option value="epic">Plus de 2 heures (Épique)</option>
            </select>
          </div>

          {/* Disponibilité Langue */}
          <div className="filter-group">
            <label className="filter-label">Langue & Règles</label>
            <select
              className="filter-select"
              value={filterLanguage}
              onChange={(e) => setFilterLanguage(e.target.value)}
            >
              <option value="all">Toutes versions</option>
              <option value="vf">VF Intégrale disponible</option>
              <option value="vf_rules">Règles VF fournies</option>
              <option value="vo">Matériel sans texte / VO</option>
            </select>
          </div>

          {/* Statut Essen */}
          <div className="filter-group">
            <label className="filter-label">Disponibilité à Essen</label>
            <select
              className="filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Tous statuts</option>
              <option value="sale">Vente sur place (Boîtes dispo)</option>
              <option value="demo">Démo uniquement</option>
              <option value="preview">Avant-première limitée</option>
            </select>
          </div>
        </div>
      )}

      {/* Tags Thématiques & Mécaniques en accès rapide */}
      <div className="filter-tags-row">
        <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', alignSelf: 'center', marginRight: '0.2rem' }}>
          Thèmes populaires :
        </span>
        {POPULAR_TAGS.map((tag) => (
          <button
            key={tag}
            className={`filter-tag-chip ${selectedTag === tag ? 'active' : ''}`}
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
          >
            {tag}
          </button>
        ))}

        {hasActiveFilters && (
          <button className="reset-filters-btn" onClick={onResetFilters}>
            <RotateCcw size={13} style={{ verticalAlign: 'middle', marginRight: 3 }} />
            Réinitialiser les filtres
          </button>
        )}
      </div>
    </div>
  );
}
