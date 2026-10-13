import React from 'react';
import { 
  X, 
  RefreshCw, 
  CheckCircle, 
  Clock, 
  Database, 
  PlusCircle, 
  Radio, 
  AlertCircle,
  Sparkles
} from 'lucide-react';

export default function SyncModal({
  onClose,
  lastSyncTime,
  syncLogs,
  onTriggerSync,
  isSyncing,
  autoSyncInterval,
  onChangeAutoSyncInterval,
  onOpenAddGame,
  totalGames
}) {
  const [syncStep, setSyncStep] = React.useState('');

  const handleManualSync = async () => {
    setSyncStep('Connexion aux flux BoardGameGeek & Spiel Essen 2026...');
    setTimeout(async () => {
      setSyncStep('Traitement des nouvelles attributions de stands et halls...');
      setTimeout(async () => {
        await onTriggerSync(true);
        setSyncStep('');
      }, 700);
    }, 600);
  };

  const formattedLastSync = React.useMemo(() => {
    if (!lastSyncTime) return 'Jamais';
    const d = new Date(lastSyncTime);
    return d.toLocaleString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }, [lastSyncTime]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" style={{ maxWidth: '800px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} title="Fermer la synchronisation">
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ padding: '1.75rem 2rem 1.25rem 2rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Radio size={24} style={{ color: 'var(--accent-gold)' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>
              Radar & Synchronisation en Continu • Essen 2026
            </h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.3rem' }}>
            Maintient automatiquement votre catalogue à jour avec les dernières annonces d'éditeurs, 
            les numéros de stands officiels et les disponibilités de démos pour Messe Essen 2026.
          </p>
        </div>

        {/* Contenu */}
        <div style={{ padding: '1.5rem 2rem 2rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* État actuel du catalogue */}
          <div 
            style={{
              background: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem 1.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              alignItems: 'center'
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
                Dernière vérification
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.2rem' }}>
                {formattedLastSync}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
                Base de données locale
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-gold)', marginTop: '0.2rem' }}>
                {totalGames} jeux répertoriés
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
                Statut du flux
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                <span className="pulse-dot" />
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#34d399' }}>En ligne & Actif</span>
              </div>
            </div>
          </div>

          {/* Déclencheur Manuel */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
            <button
              className="btn-primary"
              onClick={handleManualSync}
              disabled={isSyncing}
              style={{ padding: '0.75rem 1.4rem' }}
            >
              <RefreshCw size={17} className={isSyncing ? 'animate-spin' : ''} />
              <span>{isSyncing ? 'Synchronisation en cours...' : 'Actualiser le catalogue Essen 2026'}</span>
            </button>

            <button
              className="btn-secondary"
              onClick={() => {
                onClose();
                onOpenAddGame();
              }}
              style={{ padding: '0.75rem 1.2rem' }}
            >
              <PlusCircle size={17} />
              <span>Ajouter une annonce manuellement</span>
            </button>
          </div>

          {/* Message de progression */}
          {syncStep && (
            <div style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <RefreshCw size={14} className="animate-spin" />
              <span>{syncStep}</span>
            </div>
          )}

          {/* Fréquence de rafraîchissement automatique */}
          <div style={{ background: 'var(--bg-elevated)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>Fréquence de mise à jour automatique</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Recherche de nouvelles annonces Essen 2026 en tâche de fond
              </div>
            </div>

            <select
              value={autoSyncInterval}
              onChange={(e) => onChangeAutoSyncInterval(Number(e.target.value))}
              style={{ padding: '0.5rem 0.85rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)', fontSize: '0.88rem' }}
            >
              <option value={0}>Désactivé (Manuel uniquement)</option>
              <option value={120000}>Toutes les 2 minutes (Démo Salon)</option>
              <option value={600000}>Toutes les 10 minutes (Recommandé)</option>
              <option value={3600000}>Toutes les heures</option>
            </select>
          </div>

          {/* Journal des dernières synchronisations (Changelog) */}
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={16} /> Journal des mises à jour récentes
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '220px', overflowY: 'auto' }}>
              {syncLogs.map((log) => {
                const dateStr = new Date(log.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
                return (
                  <div
                    key={log.id}
                    style={{
                      background: 'rgba(15, 23, 42, 0.4)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '0.65rem 0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.75rem',
                      fontSize: '0.84rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle size={15} style={{ color: '#34d399', flexShrink: 0 }} />
                      <span style={{ color: 'var(--text-main)' }}>{log.message}</span>
                    </div>
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.76rem', whiteSpace: 'nowrap' }}>
                      {dateStr}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
