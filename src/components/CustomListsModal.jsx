import React from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Download, 
  Printer, 
  MapPin, 
  Compass, 
  Check, 
  Euro, 
  Clock, 
  Sparkles,
  Bookmark,
  Share2
} from 'lucide-react';
import { HALLS_CONFIG } from '../data/hallsInfo';
import { exportListToCSV, exportListToJSON } from '../services/storageService';

export default function CustomListsModal({
  onClose,
  customLists,
  activeListId,
  setActiveListId,
  onCreateList,
  onDeleteList,
  onRemoveGameFromList,
  games,
  onSelectGame,
  onShowToast
}) {
  const [showCreateForm, setShowCreateForm] = React.useState(false);
  const [newListName, setNewListName] = React.useState('');
  const [newListEmoji, setNewListEmoji] = React.useState('🎯');
  const [newListColor, setNewListColor] = React.useState('#8b5cf6');
  const [sortOptimizedPath, setSortOptimizedPath] = React.useState(false);

  const currentList = customLists.find((l) => l.id === activeListId) || customLists[0] || {};
  
  // Jeux de la liste active
  const listGames = React.useMemo(() => {
    const ids = new Set(currentList.gameIds || []);
    let items = games.filter((g) => ids.has(g.id));

    if (sortOptimizedPath) {
      // Trier par Hall (1 à 6) puis par Rangée (A à G) puis par numéro de stand pour créer le parcours optimal de visite
      items = [...items].sort((a, b) => {
        const hallDiff = (a.location?.hall || 0) - (b.location?.hall || 0);
        if (hallDiff !== 0) return hallDiff;
        const rowDiff = (a.location?.row || '').localeCompare(b.location?.row || '');
        if (rowDiff !== 0) return rowDiff;
        return (a.location?.booth || '').localeCompare(b.location?.booth || '');
      });
    }

    return items;
  }, [games, currentList, sortOptimizedPath]);

  // Statistiques de la liste (Budget, Durée, Répartition par Hall)
  const listStats = React.useMemo(() => {
    const totalBudget = listGames.reduce((acc, g) => acc + (g.price || 0), 0);
    const totalTimeMin = listGames.reduce((acc, g) => acc + (g.duration?.min || 30), 0);
    
    // Répartition par hall
    const halls = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    listGames.forEach((g) => {
      const h = g.location?.hall;
      if (h && halls[h] !== undefined) halls[h]++;
    });

    return { totalBudget, totalTimeMin, halls };
  }, [listGames]);

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newListName.trim()) return;
    const created = onCreateList(newListName.trim(), newListEmoji, newListColor);
    setNewListName('');
    setShowCreateForm(false);
    setActiveListId(created.id);
    onShowToast(`Liste "${created.name}" créée avec succès !`);
  };

  const handlePrintList = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" style={{ maxWidth: '960px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} title="Fermer mes listes">
          <X size={20} />
        </button>

        {/* Header Listes */}
        <div style={{ padding: '1.75rem 2rem 1rem 2rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Bookmark size={22} style={{ color: 'var(--accent-gold)' }} />
                <h2 style={{ fontSize: '1.6rem', fontWeight: 900 }}>Mes Listes de Visite Essen 2026</h2>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.2rem' }}>
                Organisez vos priorités d'achat, démos et coups de cœur avec calcul de budget et itinéraire dans les halls.
              </p>
            </div>

            <button
              className="btn-primary"
              onClick={() => setShowCreateForm(!showCreateForm)}
              style={{ fontSize: '0.82rem', padding: '0.5rem 1rem' }}
            >
              <Plus size={16} />
              <span>Créer une nouvelle liste</span>
            </button>
          </div>

          {/* Formulaire de création rapide */}
          {showCreateForm && (
            <form onSubmit={handleCreateSubmit} style={{ marginTop: '1rem', padding: '1rem', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Nom de la liste (ex: Pépites Solo, À négocier...)"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                style={{ flex: 1, minWidth: '220px', padding: '0.55rem 0.85rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)' }}
                autoFocus
              />
              <select
                value={newListEmoji}
                onChange={(e) => setNewListEmoji(e.target.value)}
                style={{ padding: '0.55rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}
              >
                <option value="🎯">🎯 Cible</option>
                <option value="🎲">🎲 Dé</option>
                <option value="🛍️">🛍️ Shopping</option>
                <option value="❤️">❤️ Cœur</option>
                <option value="🧩">🧩 Casse-tête</option>
                <option value="⚔️">⚔️ Combat</option>
                <option value="👨‍👩‍👦">👨‍👩‍👦 Famille</option>
                <option value="💰">💰 Budget</option>
              </select>
              <input
                type="color"
                value={newListColor}
                onChange={(e) => setNewListColor(e.target.value)}
                style={{ width: '42px', height: '36px', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', background: 'transparent' }}
              />
              <button type="submit" className="btn-primary" style={{ padding: '0.55rem 1rem' }}>
                Créer
              </button>
              <button type="button" className="btn-secondary" onClick={() => setShowCreateForm(false)}>
                Annuler
              </button>
            </form>
          )}

          {/* Onglets des listes */}
          <div className="lists-tabs-bar" style={{ marginTop: '1.25rem' }}>
            {customLists.map((list) => {
              const isCurrent = list.id === currentList.id;
              const count = list.gameIds?.length || 0;
              return (
                <button
                  key={list.id}
                  className={`list-tab-btn ${isCurrent ? 'active' : ''}`}
                  onClick={() => setActiveListId(list.id)}
                  style={{ '--list-color': list.color }}
                >
                  <span>{list.emoji}</span>
                  <span>{list.name}</span>
                  <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Corps de la liste active */}
        <div style={{ padding: '1.5rem 2rem 2rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Métriques / Synthèse de la liste */}
          <div className="list-summary-stats">
            <div className="list-stat-item">
              <span className="list-stat-num">{listGames.length}</span>
              <span className="list-stat-label">Jeux sélectionnés</span>
            </div>

            <div className="list-stat-item">
              <span className="list-stat-num" style={{ color: '#34d399' }}>{listStats.totalBudget} €</span>
              <span className="list-stat-label">Budget estimé</span>
            </div>

            <div className="list-stat-item">
              <span className="list-stat-num" style={{ color: '#c4b5fd' }}>{Math.round(listStats.totalTimeMin / 60)}h{listStats.totalTimeMin % 60 > 0 ? `${listStats.totalTimeMin % 60}m` : ''}</span>
              <span className="list-stat-label">Temps de jeu cumulé</span>
            </div>

            {/* Répartition par Hall */}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Halls :</span>
              {Object.entries(listStats.halls).map(([hallId, count]) => {
                if (count === 0) return null;
                const hConfig = HALLS_CONFIG[hallId];
                return (
                  <span
                    key={hallId}
                    style={{
                      padding: '0.2rem 0.55rem',
                      borderRadius: 'var(--radius-full)',
                      background: `${hConfig.color}22`,
                      color: hConfig.color,
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      border: `1px solid ${hConfig.color}66`
                    }}
                  >
                    Hall {hallId} : {count}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Barre d'actions : Parcours optimisé + Exports */}
          <div className="list-actions-bar">
            <button
              onClick={() => setSortOptimizedPath(!sortOptimizedPath)}
              style={{
                padding: '0.55rem 1rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: sortOptimizedPath ? 'var(--accent-gold)' : 'var(--bg-elevated)',
                color: sortOptimizedPath ? '#0b0f19' : 'var(--text-main)',
                border: '1px solid var(--border-subtle)',
                cursor: 'pointer'
              }}
              title="Organise les jeux dans l'ordre de votre marche : Hall 1 puis Hall 2, 3, 4, 5, 6 rangée par rangée"
            >
              <Compass size={16} />
              <span>{sortOptimizedPath ? '✓ Parcours dans le Salon Actif' : 'Optimiser le Parcours (Hall par Hall)'}</span>
            </button>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                className="btn-secondary"
                onClick={() => exportListToCSV(currentList.name, listGames)}
                title="Exporter la liste au format Excel / CSV"
              >
                <Download size={14} />
                <span>Export CSV</span>
              </button>

              <button
                className="btn-secondary"
                onClick={() => exportListToJSON(currentList.name, listGames)}
                title="Exporter la liste au format JSON"
              >
                <Download size={14} />
                <span>Export JSON</span>
              </button>

              <button
                className="btn-secondary"
                onClick={handlePrintList}
                title="Imprimer votre feuille de route"
              >
                <Printer size={14} />
                <span>Imprimer</span>
              </button>

              {!currentList.isSystem && (
                <button
                  className="btn-secondary"
                  onClick={() => {
                    if (confirm(`Supprimer la liste "${currentList.name}" ?`)) {
                      onDeleteList(currentList.id);
                    }
                  }}
                  style={{ color: 'var(--accent-rose)', borderColor: 'rgba(244, 63, 94, 0.3)' }}
                  title="Supprimer cette liste personnalisée"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Liste des jeux de cette liste */}
          {listGames.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{currentList.emoji}</div>
              <p style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-main)' }}>
                Cette liste est vide pour le moment
              </p>
              <p style={{ fontSize: '0.88rem', marginTop: '0.3rem' }}>
                Ajoutez des jeux en cliquant sur le bouton <strong>"+ Liste"</strong> sur n'importe quelle carte du catalogue !
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {listGames.map((game, idx) => {
                const hallConfig = HALLS_CONFIG[game.location?.hall] || { color: '#f59e0b' };
                return (
                  <div
                    key={game.id}
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '0.85rem 1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      flexWrap: 'wrap',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {/* Étape / Index si parcours optimisé */}
                    {sortOptimizedPath && (
                      <span
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          background: 'var(--accent-gold)',
                          color: '#0b0f19',
                          fontWeight: 900,
                          fontSize: '0.78rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {idx + 1}
                      </span>
                    )}

                    {/* Titre & Éditeur */}
                    <div style={{ flex: 1, minWidth: '200px', cursor: 'pointer' }} onClick={() => { onSelectGame(game); onClose(); }}>
                      <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-main)' }}>
                        {game.title}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {game.publisher} • {game.players.min}-{game.players.max} joueurs • {game.duration.min}m
                      </div>
                    </div>

                    {/* Localisation Salon (Hall, Rangée, Stand) */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.4rem 0.8rem',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(15, 23, 42, 0.6)',
                        border: `1.5px solid ${hallConfig.color}66`
                      }}
                    >
                      <MapPin size={15} style={{ color: hallConfig.color }} />
                      <div style={{ fontSize: '0.82rem' }}>
                        <strong style={{ color: hallConfig.color }}>Hall {game.location?.hall}</strong>
                        <span style={{ color: 'var(--text-muted)' }}> • Rangée {game.location?.row}</span>
                        <div style={{ fontWeight: 800, color: 'var(--text-main)' }}>Stand {game.location?.booth}</div>
                      </div>
                    </div>

                    {/* Prix */}
                    {game.price && (
                      <span className="card-price-tag">
                        {game.price} €
                      </span>
                    )}

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button
                        className="btn-secondary"
                        onClick={() => { onSelectGame(game); onClose(); }}
                        style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
                      >
                        Voir
                      </button>

                      <button
                        className="btn-secondary"
                        onClick={() => {
                          onRemoveGameFromList(currentList.id, game.id);
                          onShowToast(`Retiré de la liste "${currentList.name}"`);
                        }}
                        style={{ padding: '0.4rem 0.6rem', color: 'var(--text-dim)' }}
                        title="Retirer de cette liste"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
