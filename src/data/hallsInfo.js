// Informations officielles et thématiques des Halls de Messe Essen (SPIEL ESSEN 2026)
export const HALLS_CONFIG = {
  1: {
    id: 1,
    name: 'Hall 1',
    subtitle: 'Grands Éditeurs & Jeux Tout Public / Famille',
    theme: 'Familial, Nouveautés Grand Public & Blockbusters',
    color: '#3b82f6', // Bleu
    gradient: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
    description: 'Le cœur battant du grand public. On y retrouve les stands géants de Ravensburger, IELLO, Days of Wonder, Asmodee, Libellud, etc.',
    rows: ['A', 'B', 'C', 'D', 'E', 'F'],
    totalStands: 140,
    crowdLevel: 'Très élevé',
    recommendedMorning: true,
  },
  2: {
    id: 2,
    name: 'Hall 2',
    subtitle: 'Jeux Enfants, Ambiance & Petits Jeux Futés',
    theme: 'Party games, Enfants, Jeux d\'ambiance et de cartes',
    color: '#ec4899', // Rose/Magenta
    gradient: 'linear-gradient(135deg, #831843, #ec4899)',
    description: 'Le temple de la rigolade, des jeux de rapidité, party games et la grande allée des jeux enfants (HABA, Cocktail Games, Pegasus Kids).',
    rows: ['A', 'B', 'C', 'D'],
    totalStands: 95,
    crowdLevel: 'Moyen à Élevé',
    recommendedMorning: false,
  },
  3: {
    id: 3,
    name: 'Hall 3',
    subtitle: 'Eurogames, Jeux Experts & Nouveautés Internationales',
    theme: 'Gros jeux de gestion, Eurogames, Hype mondiale',
    color: '#8b5cf6', // Violet
    gradient: 'linear-gradient(135deg, #4c1d95, #8b5cf6)',
    description: 'Le hall le plus prisé des passionnés et des geeks. C\'est ici que les stocks d\'avant-premières s\'épuisent en 30 minutes le jeudi matin !',
    rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    totalStands: 180,
    crowdLevel: 'Critique (Jeudi & Samedi)',
    recommendedMorning: true,
  },
  4: {
    id: 4,
    name: 'Hall 4',
    subtitle: 'Asie, Innovation & Nouveaux Créateurs',
    theme: 'Publishers japonais, coréens, taïwanais & Pépites indés',
    color: '#10b981', // Émeraude
    gradient: 'linear-gradient(135deg, #064e3b, #10b981)',
    description: 'Le pavillon des découvertes exotiques et du design minimaliste asiatique (Saashi & Saashi, Oink Games, CGE Tech, jeux d\'auteurs émergents).',
    rows: ['A', 'B', 'C', 'D', 'E'],
    totalStands: 110,
    crowdLevel: 'Modéré',
    recommendedMorning: false,
  },
  5: {
    id: 5,
    name: 'Hall 5',
    subtitle: 'Éditeurs Indépendants & Initiés',
    theme: 'Jeux de niche, prototypes avancés, Crowdfunding réussi',
    color: '#f59e0b', // Ambre / Or
    gradient: 'linear-gradient(135deg, #78350f, #f59e0b)',
    description: 'Ambiance chaleureuse avec les studios d\'auteurs indépendants européens, jeux de stratégie moyenne et éditeurs alternatifs.',
    rows: ['A', 'B', 'C', 'D', 'E'],
    totalStands: 125,
    crowdLevel: 'Moyen',
    recommendedMorning: false,
  },
  6: {
    id: 6,
    name: 'Hall 6',
    subtitle: 'Jeux de Rôle, Figurines & Wargames',
    theme: 'Immersion, Figurines, Peinture, Cosplay & Univers Fantastiques',
    color: '#ef4444', // Rouge sombre
    gradient: 'linear-gradient(135deg, #7f1d1d, #ef4444)',
    description: 'Le paradis des wargamers et des rôlistes : tables de démonstration géantes, Awaken Realms, Games Workshop, décors 3D et accessoires.',
    rows: ['A', 'B', 'C', 'D', 'E', 'F'],
    totalStands: 115,
    crowdLevel: 'Élevé le week-end',
    recommendedMorning: false,
  },
};

export const ESSEN_DATES = {
  edition: 'SPIEL ESSEN 2026',
  year: 2026,
  startDate: '2026-10-22',
  endDate: '2026-10-25',
  location: 'Messe Essen, Messeplatz 1, 45131 Essen, Allemagne',
  hours: '10h00 - 19h00 (Dimanche: 10h00 - 18h00)',
};
