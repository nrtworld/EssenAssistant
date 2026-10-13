import React from 'react';
import { 
  X, 
  MapPin, 
  Users, 
  Clock, 
  Brain, 
  Euro, 
  Bookmark, 
  Star, 
  CheckCircle, 
  Flame, 
  Sparkles, 
  Calendar, 
  Share2,
  FileText
} from 'lucide-react';
import { HALLS_CONFIG } from '../data/hallsInfo';

export default function GameDetailModal({
  game,
  onClose,
  customLists,
  onToggleGameInList,
  userGameData,
  onSaveUserNote,
  onShowToast
}) {
  const [note, setNote] = React.useState('');
  const [rating, setRating] = React.useState(0);
  const [isSaved, setIsSaved] = React.useState(false);

  // Charger les notes de l'utilisateur pour ce jeu
  React.useEffect(() => {
    if (game && userGameData[game.id]) {
      setNote(userGameData[game.id].note || '');
      setRating(userGameData[game.id].userRating || 0);
    } else {
      setNote('');
      setRating(0);
    }
    setIsSaved(false);
  }, [game, userGameData]);

  if (!game) return null;

  const hallConfig = HALLS_CONFIG[game.location?.hall] || { color: '#f59e0b', name: 'Hall Inconnu' };

  const handleSaveNotes = () => {
    onSaveUserNote(game.id, note, rating);
    setIsSaved(true);
    onShowToast('Notes et avis enregistrés avec succès !');
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleCopyShare = () => {
    const text = `🎲 Découvrez "${game.title}" à SPIEL ESSEN 2026 ! Présenté au Hall ${game.location?.hall}, Rangée ${game.location?.row}, Stand ${game.location?.booth}. Prix: ${game.price || 'N/A'}€.`;
    navigator.clipboard.writeText(text);
    onShowToast('Informations copiées dans le presse-papier !');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} title="Fermer la fiche">
          <X size={20} />
        </button>

        {/* Hero Image */}
        <div className="game-detail-hero">
          <img src={game.image} alt={game.title} className="game-detail-hero-img" />
          <div className="game-detail-hero-overlay" />
        </div>

        {/* Contenu de la fiche */}
        <div className="game-detail-content">
          {/* Header Titre & Éditeur */}
          <div className="detail-header-block">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span className="card-publisher" style={{ fontSize: '0.95rem' }}>{game.publisher}</span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span className="card-price-tag" style={{ fontSize: '1rem', padding: '0.3rem 0.8rem' }}>
                  {game.price ? `${game.price} € indicatif` : 'Prix à confirmer'}
                </span>
                <button 
                  className="btn-secondary" 
                  onClick={handleCopyShare}
                  style={{ padding: '0.3rem 0.7rem' }}
                  title="Partager les coordonnées du stand"
                >
                  <Share2 size={15} />
                </button>
              </div>
            </div>

            <h1 className="detail-title">{game.title}</h1>
            <p className="detail-tagline">{game.tagline}</p>

            <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.3rem' }}>
              <span>Auteur(s) : <strong>{game.designers?.join(', ')}</strong></span>
              <span>•</span>
              <span>Illustrateur(s) : <strong>{game.artists?.join(', ')}</strong></span>
            </div>
          </div>

          {/* ========================================================
             ENCART GÉANT LOCALISATION MESSE ESSEN 2026 (TOP DEMANDE !)
             ======================================================== */}
          <div 
            className="booth-hall-showcase"
            style={{ '--hall-color': hallConfig.color }}
          >
            <div className="booth-badge-giant">
              <span>{hallConfig.name}</span>
              {game.location?.booth}
            </div>

            <div className="booth-info-text">
              <div className="booth-info-title">
                {game.location?.boothName}
              </div>
              <div className="booth-info-details">
                📍 <strong>Hall {game.location?.hall}</strong> • <strong>Rangée {game.location?.row}</strong> • Stand <strong>{game.location?.booth}</strong>
              </div>
              {game.location?.signingSchedule && (
                <div style={{ fontSize: '0.82rem', color: '#fbbf24', marginTop: '0.2rem' }}>
                  ✍️ Dédicaces : {game.location.signingSchedule}
                </div>
              )}
              {game.location?.notesAccess && (
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>
                  ℹ️ Accès : {game.location.notesAccess}
                </div>
              )}
            </div>

            {game.location?.demoTables && (
              <div className="booth-tables-badge">
                🎲 {game.location.demoTables} Tables de démo
              </div>
            )}
          </div>

          {/* Métadonnées & Specs rapides */}
          <div className="detail-meta-grid">
            <div className="meta-box">
              <span className="meta-label">Joueurs</span>
              <span className="meta-value">{game.players?.min}-{game.players?.max}</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Recom. {game.players?.recommended}</span>
            </div>

            <div className="meta-box">
              <span className="meta-label">Durée</span>
              <span className="meta-value">{game.duration?.min}-{game.duration?.max} m</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Partie moyenne</span>
            </div>

            <div className="meta-box">
              <span className="meta-label">Âge</span>
              <span className="meta-value">{game.age}+ ans</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Recommandé</span>
            </div>

            <div className="meta-box">
              <span className="meta-label">Complexité</span>
              <span className="meta-value" style={{ color: '#c4b5fd' }}>{game.complexity} / 5</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{game.complexityLabel}</span>
            </div>

            <div className="meta-box">
              <span className="meta-label">Langue</span>
              <span className="meta-value" style={{ color: '#34d399' }}>{game.language}</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Sur le stand</span>
            </div>

            <div className="meta-box">
              <span className="meta-label">Statut Salon</span>
              <span className="meta-value" style={{ color: '#fbbf24', fontSize: '0.85rem' }}>{game.status}</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Essen 2026</span>
            </div>
          </div>

          {/* Pourquoi la hype à Essen */}
          {game.whyHyped && (
            <div className="detail-why-hyped-card">
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Flame size={16} /> Pourquoi on l'attend avec impatience à Essen 2026 :
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                {game.whyHyped}
              </p>
            </div>
          )}

          {/* Description complète en français */}
          <div>
            <h3 className="detail-section-title">Présentation du jeu</h3>
            <p className="detail-paragraph">{game.description}</p>
          </div>

          {/* Tags Catégories & Mécaniques */}
          <div>
            <h3 className="detail-section-title">Mécaniques & Thématiques</h3>
            <div className="tags-list-container">
              {game.category?.map((cat, idx) => (
                <span key={idx} className="tag-badge" style={{ borderColor: 'rgba(245, 158, 11, 0.4)', color: '#fef08a' }}>
                  🏷️ {cat}
                </span>
              ))}
              {game.mechanics?.map((mec, idx) => (
                <span key={idx} className="tag-badge">
                  ⚙️ {mec}
                </span>
              ))}
            </div>
          </div>

          {/* Gérer dans mes listes de visite */}
          <div className="user-interaction-box">
            <h3 className="detail-section-title">
              <Bookmark size={18} /> Ajouter à mes listes pour Essen
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {customLists.map((list) => {
                const inList = list.gameIds?.includes(game.id);
                return (
                  <button
                    key={list.id}
                    onClick={() => {
                      onToggleGameInList(list.id, game.id);
                      onShowToast(inList ? `Retiré de "${list.name}"` : `Ajouté à "${list.name}"`);
                    }}
                    style={{
                      padding: '0.45rem 0.9rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      background: inList ? list.color : 'var(--bg-elevated)',
                      color: inList ? '#ffffff' : 'var(--text-main)',
                      border: `1.5px solid ${list.color}`,
                      transition: 'all 0.2s ease',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{list.emoji}</span>
                    <span>{list.name}</span>
                    {inList && <CheckCircle size={14} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes Personnelles & Avis utilisateur */}
          <div className="user-interaction-box">
            <h3 className="detail-section-title">
              <FileText size={18} /> Mes notes personnelles & Avis de visite
            </h3>
            
            {/* Note personnelle en étoiles */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Ma note d'intérêt :</span>
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  onClick={() => setRating(s)}
                  style={{ color: s <= rating ? '#fbbf24' : 'var(--text-dim)', fontSize: '1.25rem' }}
                >
                  ★
                </button>
              ))}
              {rating > 0 && <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{rating} / 5</span>}
            </div>

            <textarea
              className="user-notes-textarea"
              placeholder="Écrivez vos notes : priorité d'achat, impressions après démo, ami à qui offrir, budget négocié..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <button 
              className="btn-primary" 
              onClick={handleSaveNotes}
              style={{ alignSelf: 'flex-start' }}
            >
              {isSaved ? '✓ Enregistré !' : 'Sauvegarder mes notes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
