// Service de gestion du stockage local (Listes personnalisées, Favoris, Notes, Filtres)

const STORAGE_KEYS = {
  GAMES: 'essen2026_games_catalog',
  LISTS: 'essen2026_custom_lists',
  USER_DATA: 'essen2026_user_game_data', // notes, notes étoilées, statut acheté/testé
  SYNC_LOGS: 'essen2026_sync_history',
  SETTINGS: 'essen2026_user_settings',
};

export const DEFAULT_LISTS = [
  {
    id: 'must_try',
    name: 'À tester absolument',
    emoji: '🎲',
    color: '#8b5cf6',
    description: 'Les jeux à essayer en priorité sur les tables de démo',
    isSystem: true,
    gameIds: ['essen-2026-001', 'essen-2026-002', 'essen-2026-006'],
  },
  {
    id: 'must_buy',
    name: 'Priorité Achat',
    emoji: '🛍️',
    color: '#10b981',
    description: 'Les boîtes à acheter dès l\'ouverture avant rupture de stock',
    isSystem: true,
    gameIds: ['essen-2026-001', 'essen-2026-008'],
  },
  {
    id: 'favorites',
    name: 'Coups de Cœur',
    emoji: '❤️',
    color: '#ef4444',
    description: 'Mes plus grandes attentes de l\'édition 2026',
    isSystem: true,
    gameIds: ['essen-2026-003', 'essen-2026-004', 'essen-2026-005'],
  },
  {
    id: 'tested',
    name: 'Déjà testés au salon',
    emoji: '✅',
    color: '#3b82f6',
    description: 'Les jeux essayés pendant la visite avec mes impressions',
    isSystem: true,
    gameIds: [],
  },
];

// Chargement des listes
export const getCustomLists = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LISTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.LISTS, JSON.stringify(DEFAULT_LISTS));
      return DEFAULT_LISTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Erreur lecture listes:', e);
    return DEFAULT_LISTS;
  }
};

// Sauvegarde des listes
export const saveCustomLists = (lists) => {
  try {
    localStorage.setItem(STORAGE_KEYS.LISTS, JSON.stringify(lists));
  } catch (e) {
    console.error('Erreur sauvegarde listes:', e);
  }
};

// Ajouter une nouvelle liste
export const createCustomList = (name, emoji = '📋', color = '#6366f1', description = '') => {
  const lists = getCustomLists();
  const newList = {
    id: 'list_' + Date.now(),
    name: name.trim(),
    emoji,
    color,
    description: description.trim(),
    isSystem: false,
    gameIds: [],
    createdAt: new Date().toISOString(),
  };
  lists.push(newList);
  saveCustomLists(lists);
  return newList;
};

// Supprimer une liste personnalisée
export const deleteCustomList = (listId) => {
  let lists = getCustomLists();
  lists = lists.filter((l) => l.id !== listId || l.isSystem); // impossible de supprimer les listes système
  saveCustomLists(lists);
  return lists;
};

// Ajouter ou retirer un jeu d'une liste
export const toggleGameInList = (listId, gameId) => {
  const lists = getCustomLists();
  const listIndex = lists.findIndex((l) => l.id === listId);
  if (listIndex === -1) return lists;

  const currentIds = lists[listIndex].gameIds || [];
  const exists = currentIds.includes(gameId);

  if (exists) {
    lists[listIndex].gameIds = currentIds.filter((id) => id !== gameId);
  } else {
    lists[listIndex].gameIds = [...currentIds, gameId];
  }

  saveCustomLists(lists);
  return lists;
};

// Données personnalisées par jeu (notes, avis, statut)
export const getUserGameData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
};

export const saveUserGameNote = (gameId, noteText, rating = null) => {
  const data = getUserGameData();
  data[gameId] = {
    ...data[gameId],
    note: noteText,
    ...(rating !== null ? { userRating: rating } : {}),
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(data));
  return data;
};

// Export au format CSV
export const exportListToCSV = (listName, games) => {
  const headers = ['Titre', 'Éditeur', 'Hall', 'Rangée', 'Stand', 'Prix (€)', 'Joueurs', 'Durée (min)', 'Complexité', 'Statut'];
  const rows = games.map((g) => [
    `"${g.title.replace(/"/g, '""')}"`,
    `"${g.publisher.replace(/"/g, '""')}"`,
    `"Hall ${g.location.hall}"`,
    `"${g.location.row}"`,
    `"${g.location.booth}"`,
    g.price || '',
    `"${g.players.min}-${g.players.max}"`,
    `"${g.duration.min}-${g.duration.max}"`,
    `"${g.complexityLabel} (${g.complexity}/5)"`,
    `"${g.status}"`,
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(';'), ...rows.map((e) => e.join(';'))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Essen2026_${listName.replace(/\s+/g, '_')}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Export au format JSON
export const exportListToJSON = (listName, games) => {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({ listName, exportedAt: new Date().toISOString(), count: games.length, games }, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `Essen2026_${listName.replace(/\s+/g, '_')}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};
