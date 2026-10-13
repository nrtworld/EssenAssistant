import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import FiltersBar from './components/FiltersBar';
import GameCard from './components/GameCard';
import GameDetailModal from './components/GameDetailModal';
import FloorPlanModal from './components/FloorPlanModal';
import CustomListsModal from './components/CustomListsModal';
import SyncModal from './components/SyncModal';
import AddGameModal from './components/AddGameModal';
import Toast from './components/Toast';

import { 
  getCatalogGames, 
  saveCatalogGames, 
  performSync, 
  getLastSyncTime, 
  getSyncLogs, 
  addCustomGameToCatalog 
} from './services/syncService';
import { 
  getCustomLists, 
  saveCustomLists, 
  createCustomList, 
  deleteCustomList, 
  toggleGameInList, 
  getUserGameData, 
  saveUserGameNote 
} from './services/storageService';

export default function App() {
  // --- Données et État Global ---
  const [games, setGames] = useState(() => getCatalogGames());
  const [customLists, setCustomLists] = useState(() => getCustomLists());
  const [userGameData, setUserGameData] = useState(() => getUserGameData());
  const [lastSyncTime, setLastSyncTime] = useState(() => getLastSyncTime());
  const [syncLogs, setSyncLogs] = useState(() => getSyncLogs());
  const [isSyncing, setIsSyncing] = useState(false);
  const [autoSyncInterval, setAutoSyncInterval] = useState(600000); // 10 minutes par défaut

  // --- Thème (Sombre / Clair) ---
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('essen2026_theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('essen2026_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // --- Modales ---
  const [selectedGameForModal, setSelectedGameForModal] = useState(null);
  const [isFloorplanOpen, setIsFloorplanOpen] = useState(false);
  const [isListsOpen, setIsListsOpen] = useState(false);
  const [isSyncOpen, setIsSyncOpen] = useState(false);
  const [isAddGameOpen, setIsAddGameOpen] = useState(false);
  const [activeListId, setActiveListId] = useState('must_try');

  // --- Toasts / Notifications ---
  const [toasts, setToasts] = useState([]);
  const showToast = useCallback((message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  // --- Filtres et Recherche ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHall, setSelectedHall] = useState(null);
  const [sortBy, setSortBy] = useState('hype');
  const [viewMode, setViewMode] = useState('detailed');
  const [filterComplexity, setFilterComplexity] = useState('all');
  const [filterPlayers, setFilterPlayers] = useState('all');
  const [filterDuration, setFilterDuration] = useState('all');
  const [filterLanguage, setFilterLanguage] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTag, setSelectedTag] = useState(null);

  // Pagination progressive (pour une fluidité maximale avec 1250+ jeux)
  const [visibleCount, setVisibleCount] = useState(48);

  useEffect(() => {
    setVisibleCount(48);
  }, [
    searchTerm,
    selectedHall,
    sortBy,
    filterComplexity,
    filterPlayers,
    filterDuration,
    filterLanguage,
    filterStatus,
    selectedTag,
  ]);

  // Vérifier si des filtres personnalisés sont actifs
  const hasActiveFilters = useMemo(() => {
    return (
      searchTerm !== '' ||
      selectedHall !== null ||
      filterComplexity !== 'all' ||
      filterPlayers !== 'all' ||
      filterDuration !== 'all' ||
      filterLanguage !== 'all' ||
      filterStatus !== 'all' ||
      selectedTag !== null
    );
  }, [
    searchTerm,
    selectedHall,
    filterComplexity,
    filterPlayers,
    filterDuration,
    filterLanguage,
    filterStatus,
    selectedTag,
  ]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedHall(null);
    setFilterComplexity('all');
    setFilterPlayers('all');
    setFilterDuration('all');
    setFilterLanguage('all');
    setFilterStatus('all');
    setSelectedTag(null);
  };

  // --- Synchronisation en Continu ---
  const triggerSync = useCallback(async (force = false) => {
    setIsSyncing(true);
    try {
      const result = await performSync(force);
      setGames(getCatalogGames());
      setLastSyncTime(result.timestamp);
      setSyncLogs(getSyncLogs());
      if (result.newlyAdded.length > 0) {
        showToast(`🎉 Nouveau jeu détecté : "${result.newlyAdded[0].title}" (Hall ${result.newlyAdded[0].location.hall}) !`);
      } else {
        showToast('✓ Catalogue Essen 2026 synchronisé et vérifié.');
      }
    } catch (e) {
      console.error(e);
      showToast('Erreur lors de la synchronisation.');
    } finally {
      setIsSyncing(false);
    }
  }, [showToast]);

  // Intervalle de synchronisation en arrière-plan
  useEffect(() => {
    if (!autoSyncInterval || autoSyncInterval <= 0) return;
    const interval = setInterval(() => {
      triggerSync(false);
    }, autoSyncInterval);
    return () => clearInterval(interval);
  }, [autoSyncInterval, triggerSync]);

  // --- Gestion des Favoris (Liste Système 'favorites') ---
  const favoritesList = customLists.find((l) => l.id === 'favorites') || { gameIds: [] };
  const isFavorite = useCallback((gameId) => {
    return favoritesList.gameIds?.includes(gameId);
  }, [favoritesList]);

  const handleToggleFavorite = (gameId) => {
    const updated = toggleGameInList('favorites', gameId);
    setCustomLists([...updated]);
    const exists = isFavorite(gameId);
    showToast(exists ? 'Retiré de vos coups de cœur' : '❤️ Ajouté à vos coups de cœur !');
  };

  // --- Gestion des Listes Personnalisées ---
  const handleToggleGameInList = (listId, gameId) => {
    const updated = toggleGameInList(listId, gameId);
    setCustomLists([...updated]);
  };

  const handleCreateList = (name, emoji, color) => {
    const newList = createCustomList(name, emoji, color);
    setCustomLists(getCustomLists());
    return newList;
  };

  const handleDeleteList = (listId) => {
    const updated = deleteCustomList(listId);
    setCustomLists([...updated]);
    setActiveListId(updated[0]?.id || 'must_try');
    showToast('Liste supprimée.');
  };

  const handleRemoveGameFromList = (listId, gameId) => {
    handleToggleGameInList(listId, gameId);
  };

  // --- Notes et Avis Utilisateur ---
  const handleSaveUserNote = (gameId, noteText, rating) => {
    const updated = saveUserGameNote(gameId, noteText, rating);
    setUserGameData({ ...updated });
  };

  // --- Ajout Manuel d'un Jeu ---
  const handleAddGame = (gameData) => {
    const added = addCustomGameToCatalog(gameData);
    setGames(getCatalogGames());
    setSyncLogs(getSyncLogs());
    showToast(`"${added.title}" ajouté avec succès au catalogue Essen 2026 !`);
  };

  // --- Filtrage & Tri des Jeux ---
  const filteredGames = useMemo(() => {
    return games.filter((g) => {
      // 1. Recherche plein texte
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const inTitle = g.title.toLowerCase().includes(query);
        const inPublisher = g.publisher.toLowerCase().includes(query);
        const inDesigners = g.designers?.some((d) => d.toLowerCase().includes(query));
        const inBooth = g.location?.booth?.toLowerCase().includes(query);
        const inBoothName = g.location?.boothName?.toLowerCase().includes(query);
        const inCategory = g.category?.some((c) => c.toLowerCase().includes(query));
        const inMechanics = g.mechanics?.some((m) => m.toLowerCase().includes(query));
        if (!inTitle && !inPublisher && !inDesigners && !inBooth && !inBoothName && !inCategory && !inMechanics) {
          return false;
        }
      }

      // 2. Hall
      if (selectedHall !== null && g.location?.hall !== selectedHall) {
        return false;
      }

      // 3. Complexité
      if (filterComplexity === 'familial' && g.complexity >= 2.3) return false;
      if (filterComplexity === 'initie' && (g.complexity < 2.3 || g.complexity > 3.4)) return false;
      if (filterComplexity === 'expert' && g.complexity <= 3.4) return false;

      // 4. Nombre de joueurs
      if (filterPlayers === 'solo' && g.players.min > 1) return false;
      if (filterPlayers === 'duo' && (g.players.min > 2 || g.players.max < 2)) return false;
      if (filterPlayers === 'medium' && (g.players.max < 3 || g.players.min > 4)) return false;
      if (filterPlayers === 'large' && g.players.max < 5) return false;

      // 5. Durée
      if (filterDuration === 'short' && g.duration.max > 30) return false;
      if (filterDuration === 'medium' && (g.duration.min > 60 || g.duration.max < 30)) return false;
      if (filterDuration === 'long' && (g.duration.min > 120 || g.duration.max < 60)) return false;
      if (filterDuration === 'epic' && g.duration.max <= 120) return false;

      // 6. Langue
      if (filterLanguage === 'vf' && !g.language?.includes('VF Intégrale')) return false;
      if (filterLanguage === 'vf_rules' && !g.language?.includes('VF')) return false;
      if (filterLanguage === 'vo' && g.language?.includes('VF Intégrale')) return false;

      // 7. Statut Essen
      if (filterStatus === 'sale' && !g.status?.toLowerCase().includes('vente') && !g.status?.toLowerCase().includes('sortie')) return false;
      if (filterStatus === 'demo' && !g.status?.toLowerCase().includes('démo')) return false;
      if (filterStatus === 'preview' && !g.status?.toLowerCase().includes('avant-première') && !g.status?.toLowerCase().includes('prototype')) return false;

      // 8. Tag Thématique
      if (selectedTag) {
        const hasInCat = g.category?.includes(selectedTag);
        const hasInMec = g.mechanics?.includes(selectedTag);
        if (!hasInCat && !hasInMec) return false;
      }

      return true;
    });
  }, [
    games,
    searchTerm,
    selectedHall,
    filterComplexity,
    filterPlayers,
    filterDuration,
    filterLanguage,
    filterStatus,
    selectedTag,
  ]);

  // Tri
  const sortedGames = useMemo(() => {
    return [...filteredGames].sort((a, b) => {
      switch (sortBy) {
        case 'hype':
          return (b.hypeIndex || 90) * (b.bggRating || 8) - (a.hypeIndex || 90) * (a.bggRating || 8);
        case 'location': {
          const hallA = a.location?.hall || 0;
          const hallB = b.location?.hall || 0;
          if (hallA !== hallB) return hallA - hallB;
          const rowA = a.location?.row || '';
          const rowB = b.location?.row || '';
          if (rowA !== rowB) return rowA.localeCompare(rowB);
          return (a.location?.booth || '').localeCompare(b.location?.booth || '');
        }
        case 'rating':
          return (b.bggRating || 0) - (a.bggRating || 0);
        case 'title_asc':
          return a.title.localeCompare(b.title);
        case 'complexity_asc':
          return a.complexity - b.complexity;
        case 'complexity_desc':
          return b.complexity - a.complexity;
        case 'duration_asc':
          return a.duration.min - b.duration.min;
        case 'price_asc':
          return (a.price || 999) - (b.price || 999);
        default:
          return 0;
      }
    });
  }, [filteredGames, sortBy]);

  // Nombre total de jeux sauvegardés dans les listes
  const totalSavedGamesCount = useMemo(() => {
    const ids = new Set();
    customLists.forEach((l) => l.gameIds?.forEach((id) => ids.add(id)));
    return ids.size;
  }, [customLists]);

  return (
    <div className="app-container">
      {/* Barre de navigation */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenFloorplan={() => setIsFloorplanOpen(true)}
        onOpenLists={() => setIsListsOpen(true)}
        onOpenSync={() => setIsSyncOpen(true)}
        onOpenAddGame={() => setIsAddGameOpen(true)}
        totalSavedGames={totalSavedGamesCount}
        lastSyncTime={lastSyncTime}
        isSyncing={isSyncing}
      />

      <main className="main-content">
        {/* Bannière Hero & Statistiques */}
        <HeroBanner
          games={games}
          selectedHall={selectedHall}
          onSelectHall={(hallId) => setSelectedHall(hallId)}
          onOpenFloorplan={() => setIsFloorplanOpen(true)}
        />

        {/* Dashboard Filtres & Recherche */}
        <FiltersBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          filterComplexity={filterComplexity}
          setFilterComplexity={setFilterComplexity}
          filterPlayers={filterPlayers}
          setFilterPlayers={setFilterPlayers}
          filterDuration={filterDuration}
          setFilterDuration={setFilterDuration}
          filterLanguage={filterLanguage}
          setFilterLanguage={setFilterLanguage}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          selectedHall={selectedHall}
          setSelectedHall={setSelectedHall}
          hasActiveFilters={hasActiveFilters}
          onResetFilters={handleResetFilters}
        />

        {/* En-tête du catalogue */}
        <div className="catalog-header-bar">
          <div className="catalog-count-badge">
            Affichage de <span className="catalog-count-number">{Math.min(visibleCount, sortedGames.length)}</span> sur {sortedGames.length} jeux trouvés
            <span style={{ opacity: 0.7 }}>({games.length} référencés au total sur BGG)</span>
            {selectedHall !== null && <span>• Hall {selectedHall}</span>}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              className="btn-secondary" 
              onClick={() => setIsFloorplanOpen(true)}
              style={{ fontSize: '0.82rem', padding: '0.45rem 0.85rem' }}
            >
              📍 Voir sur le plan des halls
            </button>
          </div>
        </div>

        {/* Grille des jeux */}
        {sortedGames.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 1.5rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Aucun jeu ne correspond à vos critères
            </h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 1.5rem auto', fontSize: '0.95rem' }}>
              Essayez d'élargir votre recherche, de changer de Hall ou de réinitialiser vos filtres.
            </p>
            <button className="btn-primary" onClick={handleResetFilters}>
              Réinitialiser tous les filtres
            </button>
          </div>
        ) : (
          <>
            <div className={`games-grid ${viewMode}`}>
              {sortedGames.slice(0, visibleCount).map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  viewMode={viewMode}
                  onOpenDetails={(g) => setSelectedGameForModal(g)}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={isFavorite(game.id)}
                  onOpenListMenu={(g) => {
                    setSelectedGameForModal(g);
                  }}
                  userLists={customLists}
                />
              ))}
            </div>

            {visibleCount < sortedGames.length && (
              <div style={{ textAlign: 'center', marginTop: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  className="btn-primary"
                  onClick={() => setVisibleCount((prev) => prev + 48)}
                  style={{ padding: '0.85rem 2.2rem', fontSize: '1rem' }}
                >
                  Afficher plus de jeux (+48)
                </button>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>
                  Affichés : {Math.min(visibleCount, sortedGames.length)} sur {sortedGames.length} jeux
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', padding: '2rem 1.5rem', marginTop: 'auto', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-main)' }}>
              🎲 SPIEL ESSEN 2026 • Assistant & Guide des Jeux
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Application web non-officielle pour préparer sa visite à Messe Essen (22 au 25 Octobre 2026).
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem' }}>
            <button className="btn-secondary" onClick={() => setIsFloorplanOpen(true)} style={{ fontSize: '0.82rem' }}>
              Plan du Salon
            </button>
            <button className="btn-secondary" onClick={() => setIsListsOpen(true)} style={{ fontSize: '0.82rem' }}>
              Mes Listes ({totalSavedGamesCount})
            </button>
            <button className="btn-secondary" onClick={() => setIsSyncOpen(true)} style={{ fontSize: '0.82rem' }}>
              Radar de Synchronisation
            </button>
          </div>
        </div>
      </footer>

      {/* Modale Détails du Jeu */}
      {selectedGameForModal && (
        <GameDetailModal
          game={selectedGameForModal}
          onClose={() => setSelectedGameForModal(null)}
          customLists={customLists}
          onToggleGameInList={handleToggleGameInList}
          userGameData={userGameData}
          onSaveUserNote={handleSaveUserNote}
          onShowToast={showToast}
        />
      )}

      {/* Modale Plan du Salon & Rangées */}
      {isFloorplanOpen && (
        <FloorPlanModal
          onClose={() => setIsFloorplanOpen(false)}
          games={games}
          onSelectGame={(g) => setSelectedGameForModal(g)}
          customLists={customLists}
          activeListId={activeListId}
        />
      )}

      {/* Modale Mes Listes & Exports */}
      {isListsOpen && (
        <CustomListsModal
          onClose={() => setIsListsOpen(false)}
          customLists={customLists}
          activeListId={activeListId}
          setActiveListId={setActiveListId}
          onCreateList={handleCreateList}
          onDeleteList={handleDeleteList}
          onRemoveGameFromList={handleRemoveGameFromList}
          games={games}
          onSelectGame={(g) => setSelectedGameForModal(g)}
          onShowToast={showToast}
        />
      )}

      {/* Modale Synchronisation & Flux Essen */}
      {isSyncOpen && (
        <SyncModal
          onClose={() => setIsSyncOpen(false)}
          lastSyncTime={lastSyncTime}
          syncLogs={syncLogs}
          onTriggerSync={triggerSync}
          isSyncing={isSyncing}
          autoSyncInterval={autoSyncInterval}
          onChangeAutoSyncInterval={setAutoSyncInterval}
          onOpenAddGame={() => setIsAddGameOpen(true)}
          totalGames={games.length}
        />
      )}

      {/* Modale Ajout Manuel d'un Jeu */}
      {isAddGameOpen && (
        <AddGameModal
          onClose={() => setIsAddGameOpen(false)}
          onAddGame={handleAddGame}
          onShowToast={showToast}
        />
      )}

      {/* Toast Notifications */}
      <Toast toasts={toasts} />
    </div>
  );
}
