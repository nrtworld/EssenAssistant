import React from 'react';
import { 
  Heart, 
  MapPin, 
  Users, 
  Clock, 
  Brain, 
  Plus, 
  Check, 
  ChevronRight,
  Flame,
  Bookmark
} from 'lucide-react';
import { HALLS_CONFIG } from '../data/hallsInfo';

export default function GameCard({
  game,
  viewMode = 'detailed',
  onOpenDetails,
  onToggleFavorite,
  isFavorite,
  onOpenListMenu,
  userLists = [],
}) {
  const [imgError, setImgError] = React.useState(false);
  const hallConfig = HALLS_CONFIG[game.location?.hall] || { color: '#f59e0b' };

  // Vérifier si le jeu est présent dans des listes
  const listsContainingGame = userLists.filter((l) => l.gameIds?.includes(game.id));

  // Image de secours esthétique avec fond abstrait si Unsplash est inaccessible
  const fallbackImg = `https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=800&q=80`;

  return (
    <article className="game-card">
      {/* Média / Image & Badges flottants */}
      <div className="card-media-wrapper" onClick={() => onOpenDetails(game)} style={{ cursor: 'pointer' }}>
        <img
          src={imgError ? fallbackImg : game.image}
          alt={game.title}
          className="card-image"
          loading="lazy"
          onError={() => setImgError(true)}
        />
        <div className="card-gradient-overlay" />

        {/* Badges Flottants : Hall & Stand + Bouton Favori */}
        <div className="card-floating-badges" onClick={(e) => e.stopPropagation()}>
          <div 
            className="booth-hall-badge" 
            style={{ '--hall-color': hallConfig.color }}
            title={`Situé au Hall ${game.location?.hall}, Rangée ${game.location?.row}, Stand ${game.location?.booth}`}
          >
            <MapPin size={13} className="booth-hall-icon" />
            <span>Hall {game.location?.hall} • {game.location?.booth}</span>
          </div>

          <button
            className={`card-fav-btn ${isFavorite ? 'is-fav' : ''}`}
            onClick={() => onToggleFavorite(game.id)}
            title={isFavorite ? 'Retirer des favoris' : 'Ajouter à mes coups de cœur'}
          >
            <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      {/* Corps de la Carte */}
      <div className="card-body">
        {/* Éditeur & Prix */}
        <div className="card-publisher-row">
          <span className="card-publisher">{game.publisher}</span>
          {game.price && (
            <span className="card-price-tag">
              {game.price} €
            </span>
          )}
        </div>

        {/* Titre & Sous-titre */}
        <div onClick={() => onOpenDetails(game)} style={{ cursor: 'pointer' }}>
          <h2 className="card-title">{game.title}</h2>
          <p className="card-tagline">{game.tagline}</p>
        </div>

        {/* Spécifications du Jeu : Joueurs, Temps, Complexité */}
        <div className="card-specs-row">
          <div className="spec-item">
            <Users size={14} className="spec-icon" />
            <span className="spec-val">{game.players.min}-{game.players.max} j.</span>
            <span className="spec-sub">({game.players.recommended})</span>
          </div>

          <div className="spec-item">
            <Clock size={14} className="spec-icon" />
            <span className="spec-val">{game.duration.min}-{game.duration.max}m</span>
            <span className="spec-sub">Durée</span>
          </div>

          <div className="spec-item">
            <Brain size={14} className="spec-icon" />
            <span className="spec-val">{game.complexityLabel}</span>
            <span className="spec-sub">{game.complexity} / 5</span>
          </div>
        </div>

        {/* Localisation Précise Essen & Actions */}
        <div className="card-location-footer">
          <div className="card-location-text">
            <MapPin size={14} style={{ color: hallConfig.color }} />
            <span>
              <strong>Hall {game.location?.hall}</strong> (Rangée {game.location?.row})
            </span>
          </div>

          <div className="card-action-btns">
            <button
              className="btn-card-list"
              onClick={() => onOpenListMenu(game)}
              title="Ajouter ou gérer dans mes listes"
            >
              <Bookmark size={14} />
              <span>{listsContainingGame.length > 0 ? `${listsContainingGame.length} liste(s)` : '+ Liste'}</span>
            </button>

            <button
              className="btn-card-details"
              onClick={() => onOpenDetails(game)}
              title="Afficher tous les détails et infos du stand"
            >
              Détails
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
