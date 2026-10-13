import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  Bookmark, 
  RefreshCw, 
  PlusCircle, 
  Sun, 
  Moon, 
  Compass
} from 'lucide-react';

export default function Navbar({
  theme,
  toggleTheme,
  onOpenFloorplan,
  onOpenLists,
  onOpenSync,
  onOpenAddGame,
  totalSavedGames,
  lastSyncTime,
  isSyncing
}) {
  const formattedSyncTime = React.useMemo(() => {
    if (!lastSyncTime) return 'À l\'instant';
    const date = new Date(lastSyncTime);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }, [lastSyncTime]);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Logo et Marque */}
        <div className="brand-wrapper" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="brand-logo-dice">
            <span>🎲</span>
          </div>
          <div className="brand-titles">
            <div className="brand-name">
              SPIEL ESSEN 2026
              <span className="brand-badge">OCTOBRE 2026</span>
            </div>
            <span className="brand-tagline">Guide & Assistant Officieux des Nouveautés</span>
          </div>
        </div>

        {/* Actions de navigation */}
        <div className="navbar-actions">
          {/* Plan des Halls */}
          <button 
            className="btn-nav-primary"
            onClick={onOpenFloorplan}
            title="Consulter le plan des Halls et localiser les stands"
          >
            <Compass size={17} />
            <span className="hide-on-mobile">Plan des Halls</span>
          </button>

          {/* Mes Listes */}
          <button 
            className="btn-icon"
            onClick={onOpenLists}
            title="Gérer mes listes de jeux (À tester, Priorité achat, Coups de cœur)"
          >
            <Bookmark size={19} />
            {totalSavedGames > 0 && (
              <span className="btn-badge-counter">{totalSavedGames}</span>
            )}
          </button>

          {/* Synchronisation / Flux Essen */}
          <button 
            className="btn-icon"
            onClick={onOpenSync}
            title={`Synchroniser les annonces Essen 2026 (Dernière màj: ${formattedSyncTime})`}
          >
            <RefreshCw size={18} className={isSyncing ? 'animate-spin' : ''} />
            <span className="pulse-dot" style={{ position: 'absolute', bottom: '6px', right: '6px' }} />
          </button>

          {/* Ajouter un jeu */}
          <button 
            className="btn-icon"
            onClick={onOpenAddGame}
            title="Ajouter manuellement une annonce de jeu pour Essen 2026"
          >
            <PlusCircle size={19} />
          </button>

          {/* Sélecteur de Thème */}
          <button 
            className="btn-icon"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Basculer en mode clair' : 'Basculer en mode sombre'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
