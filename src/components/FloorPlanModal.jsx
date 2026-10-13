import React from 'react';
import { 
  X, 
  MapPin, 
  Compass, 
  Layers, 
  Navigation, 
  Info, 
  ArrowRight,
  Sparkles,
  Bookmark
} from 'lucide-react';
import { HALLS_CONFIG, ESSEN_DATES } from '../data/hallsInfo';

export default function FloorPlanModal({
  onClose,
  games,
  onSelectGame,
  customLists,
  activeListId
}) {
  const [selectedHallId, setSelectedHallId] = React.useState(3); // Hall 3 par défaut (le plus culte)
  const [filterOnlyMyList, setFilterOnlyMyList] = React.useState(false);

  // Jeux dans la liste active si demandée
  const activeList = customLists.find((l) => l.id === activeListId) || customLists[0];
  const targetGameIds = new Set(activeList?.gameIds || []);

  const displayedGames = React.useMemo(() => {
    return games.filter((g) => {
      const matchHall = g.location?.hall === selectedHallId;
      if (!matchHall) return false;
      if (filterOnlyMyList) {
        return targetGameIds.has(g.id);
      }
      return true;
    });
  }, [games, selectedHallId, filterOnlyMyList, targetGameIds]);

  // Regroupement par Rangée (Row) dans le hall sélectionné
  const gamesByRow = React.useMemo(() => {
    const map = {};
    displayedGames.forEach((g) => {
      const row = g.location?.row || 'Autre';
      if (!map[row]) map[row] = [];
      map[row].push(g);
    });
    // Trier les rangées alphabétiquement (A, B, C...)
    return Object.keys(map).sort().reduce((acc, key) => {
      acc[key] = map[key];
      return acc;
    }, {});
  }, [displayedGames]);

  const currentHall = HALLS_CONFIG[selectedHallId];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" style={{ maxWidth: '1050px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} title="Fermer le plan">
          <X size={20} />
        </button>

        {/* Header Plan des Halls */}
        <div style={{ padding: '1.75rem 2rem 1rem 2rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
            <Compass size={24} style={{ color: 'var(--accent-gold)' }} />
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900 }}>
              Plan Interactif & Géolocalisation des Stands • MESSE ESSEN 2026
            </h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Localisez instantanément vos jeux favoris par Hall, Rangée et Allée pour optimiser vos déplacements durant le salon.
          </p>

          {/* Sélecteur de Halls en Onglets Visuels */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.25rem' }}>
            {Object.values(HALLS_CONFIG).map((hall) => {
              const isSelected = selectedHallId === hall.id;
              const countInHall = games.filter((g) => g.location?.hall === hall.id).length;
              return (
                <button
                  key={hall.id}
                  onClick={() => setSelectedHallId(hall.id)}
                  style={{
                    padding: '0.6rem 1.1rem',
                    borderRadius: 'var(--radius-lg)',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: isSelected ? hall.color : 'var(--bg-elevated)',
                    color: isSelected ? '#0b0f19' : 'var(--text-main)',
                    border: `2px solid ${hall.color}`,
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? `0 4px 15px ${hall.color}66` : 'none',
                    cursor: 'pointer'
                  }}
                >
                  <span>{hall.name}</span>
                  <span style={{ fontSize: '0.75rem', opacity: isSelected ? 0.9 : 0.6 }}>
                    ({countInHall} jeux)
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Corps : Détail du Hall sélectionné & Liste des Rangées */}
        <div style={{ padding: '1.5rem 2rem 2rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Fiche d'identité du Hall */}
          <div 
            style={{ 
              background: 'rgba(15, 23, 42, 0.7)', 
              borderRadius: 'var(--radius-lg)', 
              padding: '1.25rem 1.5rem',
              border: `1.5px solid ${currentHall.color}44`,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 900, color: currentHall.color }}>
                  {currentHall.name}
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  — {currentHall.subtitle}
                </span>
              </div>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '0.2rem', maxWidth: '650px' }}>
                {currentHall.description}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
              {activeList && (
                <button
                  onClick={() => setFilterOnlyMyList(!filterOnlyMyList)}
                  style={{
                    padding: '0.5rem 0.9rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: filterOnlyMyList ? 'var(--accent-gold)' : 'var(--bg-secondary)',
                    color: filterOnlyMyList ? '#0b0f19' : 'var(--text-main)',
                    border: '1px solid var(--border-subtle)',
                    cursor: 'pointer'
                  }}
                >
                  <Bookmark size={14} />
                  <span>Uniquement ma liste ({activeList.name})</span>
                </button>
              )}
            </div>
          </div>

          {/* Grille des Rangées & Stands dans le Hall */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>
                Jeux et Stands par Allée / Rangée ({displayedGames.length} répertoriés)
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                Cliquez sur un jeu pour ouvrir sa fiche détaillée
              </span>
            </div>

            {Object.keys(gamesByRow).length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                Aucun jeu trouvé pour ce filtre dans le {currentHall.name}.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {Object.entries(gamesByRow).map(([rowLetter, rowGames]) => (
                  <div 
                    key={rowLetter}
                    style={{
                      background: 'rgba(30, 41, 59, 0.4)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '1rem 1.25rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                      <span 
                        style={{ 
                          width: '28px', 
                          height: '28px', 
                          borderRadius: 'var(--radius-md)', 
                          background: currentHall.color, 
                          color: '#0b0f19', 
                          fontWeight: 900, 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          fontSize: '0.9rem'
                        }}
                      >
                        {rowLetter}
                      </span>
                      <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>
                        Rangée {rowLetter} • {rowGames.length} stand(s) référencé(s)
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.75rem' }}>
                      {rowGames.map((g) => (
                        <div
                          key={g.id}
                          onClick={() => {
                            onSelectGame(g);
                            onClose();
                          }}
                          style={{
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-md)',
                            padding: '0.75rem 1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '0.75rem',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                          className="stand-row-card"
                        >
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {g.title}
                            </div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                              {g.publisher}
                            </div>
                          </div>

                          <div 
                            style={{ 
                              padding: '0.25rem 0.6rem', 
                              borderRadius: 'var(--radius-sm)', 
                              background: 'rgba(255, 255, 255, 0.08)',
                              fontWeight: 800, 
                              fontSize: '0.8rem',
                              color: currentHall.color,
                              whiteSpace: 'nowrap',
                              border: `1px solid ${currentHall.color}66`
                            }}
                          >
                            Stand {g.location?.booth}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Conseils Essentiels Essen 2026 */}
          <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: 'var(--radius-md)', padding: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <Info size={20} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: 2 }} />
            <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              <strong style={{ color: 'var(--accent-gold)' }}>Conseil Visiteur Essen :</strong> Les Halls 1 et 3 sont les plus congestionnés entre 10h00 et 13h00. Pour tester des nouveautés sans trop attendre, commencez par les Halls 4 (Asie) et 5 (Indépendants) le matin, ou réservez vos créneaux de démo sur place dès l'ouverture des portes.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
