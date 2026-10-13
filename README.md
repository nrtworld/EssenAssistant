# 🎲 SPIEL ESSEN 2026 — Guide & Assistant des Nouveautés

Application web moderne, rapide et optimisée pour préparer sa visite au salon international du jeu de société **SPIEL ESSEN 2026** (Messe Essen, 22 au 25 Octobre 2026).

---

## 🌟 Fonctionnalités Principales

- 🇫🇷 **1 250+ Jeux Référencés** : Intégration complète de la liste officielle BGG GeekPreview 93 (SPIEL Essen 2026) avec visuels HD, notes, poids de complexité, auteurs, illustrateurs, nombre de joueurs, durées et prix indicatifs en euros.
- 📍 **Localisation Précise dans le Salon** : Emplacement exact par **Hall (Halls 1 à 6)**, **Allée / Rangée** et **Numéro de Stand** pour chaque jeu, avec nombre de tables de démo et horaires de dédicaces.
- 🧭 **Plan Interactif des Halls** : Vue d'ensemble des 6 halls de Messe Essen et regroupement des stands par allée (Rangées A, B, C...).
- 🔍 **Recherche & Filtres Avancés** : Recherche instantanée plein texte, filtres par public/complexité (Familial, Initié, Expert), configuration de joueurs, durée, disponibilité de la VF et thématiques populaires.
- 📋 **Listes Personnalisées & Optimisation de Parcours** : Créez vos listes de visite (*À tester absolument, Priorité achat, Coups de cœur...*), visualisez le budget cumulé et activez l'optimisation de parcours pour visiter les stands hall par hall sans allers-retours inutiles !
- 💾 **Exports** : Export de vos listes en format CSV (Excel) ou JSON, et feuille de route imprimable pour le salon.
- 🔄 **Radar & Synchronisation en Continu** : Détection des nouveaux jeux annoncés et mise à jour automatique des fiches et stands.

---

## 🚀 Déploiement en Ligne

### Option 1 : Déploiement automatique sur GitHub Pages (Recommandé)
Le workflow GitHub Actions est déjà configuré dans `.github/workflows/deploy.yml`.

Pour activer le déploiement sur votre compte GitHub :
1. Rendez-vous sur votre dépôt : [https://github.com/nrtworld/EssenAssistant/settings/pages](https://github.com/nrtworld/EssenAssistant/settings/pages)
2. Dans la section **Build and deployment > Source**, sélectionnez **GitHub Actions**.
3. Le site sera automatiquement compilé et déployé sur :  
   👉 **`https://nrtworld.github.io/EssenAssistant/`**

### Option 2 : Déploiement en 1 clic sur Vercel
1. Allez sur [vercel.com/new](https://vercel.com/new).
2. Connectez votre compte GitHub et sélectionnez le dépôt `nrtworld/EssenAssistant`.
3. Cliquez sur **Deploy** (Vite est détecté automatiquement).
4. Vous obtiendrez immédiatement votre URL sécurisée en `https://essen-assistant.vercel.app`.

---

## 💻 Lancer l'application en local

### Sur macOS :
Double-cliquez simplement sur le fichier `demarrer.command` dans le Finder.

### En ligne de commande :
```bash
# Installation des dépendances
npm install

# Lancement du serveur de développement (ouvre automatiquement votre navigateur)
npm run dev

# Compilation pour la production
npm run build
```

---

*Application web non-officielle pour la communauté des passionnés de jeux de société.*
