import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  Layers, 
  Calendar, 
  Clock, 
  Trophy,
  Flame,
  Users
} from 'lucide-react';
import { HALLS_CONFIG, ESSEN_DATES } from '../data/hallsInfo';

export default function HeroBanner({ 
  games, 
  selectedHall, 
  onSelectHall, 
  onOpenFloorplan 
}) {
  // Calcul des statistiques en temps réel
  const stats = React.useMemo(() => {
    const totalGames = games.length;
    const totalDemoTables = games.reduce((acc, g) => acc + (g.location?.demoTables || 0), 0);
    const avgRating = totalGames > 0
      ? (games.reduce((acc, g) => acc + (g.bggRating || 8.0), 0) / totalGames).toFixed(1)
      : '8.2';
    
    // Répartition par Hall
    const hallCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    games.forEach((g) => {
      const h = g.location?.hall;
      if (h && hallCounts[h] !== undefined) {
        hallCounts[h]++;
      }
    });

    return { totalGames, totalDemoTables, avgRating, hallCounts };
  }, [games]);

  return (
    <section className="hero-section">
      <div className="hero-card">
        <div className="hero-content">
          {/* Header Row avec Badges officiels */}
          <div className="hero-header-row">
            <div className="hero-tag">
              <span className="pulse-dot" />
              <span>RADAR DE SORTIES • MESSE ESSEN 2026</span>
            </div>
            <div className="hero-tag" style={{ background: 'rgba(245, 158, 11, 0.15)', borderColor: 'rgba(245, 158, 11, 0.35)', color: '#fbbf24' }}>
              <Calendar size={14} style={{ marginRight: 4 }} />
              <span>22 - 25 OCTOBRE 2026 • MESSE ESSEN</span>
            </div>
          </div>

          {/* Titre & Accroche */}
          <div>
            <h1 className="hero-title">
              Explorez les Nouveautés de <span className="hero-title-highlight">SPIEL ESSEN 2026</span>
            </h1>
            <p className="hero-description">
              Le guide complet en français des jeux annoncés pour le plus grand salon du jeu de société au monde. 
              Retrouvez l’emplacement exact de chaque jeu par <strong>Hall, Allée et Numéro de Stand</strong>, 
              filtrez selon vos goûts et organisez vos listes de visite pour ne rien manquer !
            </p>
          </div>

          {/* Statistiques Clés */}
          <div className="hero-stats-grid">
            <div className="stat-pill">
              <div className="stat-icon-wrapper" style={{ color: '#fbbf24' }}>
                <Flame size={22} />
              </div>
              <div>
                <div className="stat-value">{stats.totalGames}</div>
                <div className="stat-label">Jeux Référencés</div>
              </div>
            </div>

            <div className="stat-pill" onClick={onOpenFloorplan} style={{ cursor: 'pointer' }} title="Cliquez pour voir le plan complet">
              <div className="stat-icon-wrapper" style={{ color: '#8b5cf6' }}>
                <MapPin size={22} />
              </div>
              <div>
                <div className="stat-value">6 Halls</div>
                <div className="stat-label">Stands Localisés</div>
              </div>
            </div>

            <div className="stat-pill">
              <div className="stat-icon-wrapper" style={{ color: '#10b981' }}>
                <Users size={22} />
              </div>
              <div>
                <div className="stat-value">{stats.totalDemoTables}+</div>
                <div className="stat-label">Tables de Démo</div>
              </div>
            </div>

            <div className="stat-pill">
              <div className="stat-icon-wrapper" style={{ color: '#ec4899' }}>
                <Trophy size={22} />
              </div>
              <div>
                <div className="stat-value">{stats.avgRating} / 10</div>
                <div className="stat-label">Note Moyenne BGG</div>
              </div>
            </div>
          </div>

          {/* Barre de sélection rapide par Hall */}
          <div style={{ marginTop: '0.5rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.04em' }}>
              Filtrer par Hall du salon :
            </div>
            <div className="halls-quick-pills">
              <button
                className={`hall-pill ${selectedHall === null ? 'active' : ''}`}
                onClick={() => onSelectHall(null)}
                style={{ '--hall-color': '#f59e0b' }}
              >
                <span>🏢 Tous les Halls</span>
                <span style={{ opacity: 0.75, fontSize: '0.72rem' }}>({stats.totalGames})</span>
              </button>

              {Object.values(HALLS_CONFIG).map((hall) => {
                const count = stats.hallCounts[hall.id] || 0;
                const isSelected = selectedHall === hall.id;
                return (
                  <button
                    key={hall.id}
                    className={`hall-pill ${isSelected ? 'active' : ''}`}
                    onClick={() => onSelectHall(isSelected ? null : hall.id)}
                    style={{ '--hall-color': hall.color }}
                    title={`${hall.name} : ${hall.theme}`}
                  >
                    <span className="hall-pill-dot" />
                    <span>{hall.name}</span>
                    <span style={{ opacity: 0.8, fontSize: '0.72rem' }}>({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
