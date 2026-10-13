<div align="center">

# 🎲 SPIEL ESSEN 2026 • Assistant & Guide des Jeux

<p align="center">
  <strong>L'application web ultime pour préparer, explorer et vivre le plus grand salon du jeu de société au monde.</strong>
</p>

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![BoardGameGeek](https://img.shields.io/badge/BGG_GeekPreview-93-FF5100?style=for-the-badge&logo=boardgamegeek&logoColor=white)](https://boardgamegeek.com/geekpreview/93/spiel-essen-2026)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Déployé-22C55E?style=for-the-badge&logo=github&logoColor=white)](https://nrtworld.github.io/EssenAssistant/)
[![License](https://img.shields.io/badge/License-MIT-F59E0B?style=for-the-badge)](LICENSE)

[🌐 Voir l'application en ligne](https://nrtworld.github.io/EssenAssistant/) • [✨ Fonctionnalités](#-fonctionnalités-phares) • [🗺️ Plan des Halls](#-cartographie-des-halls-messe-essen) • [🚀 Déploiement](#-déploiement--mise-en-ligne)

</div>

---

## 🎯 À propos du projet

Chaque année en octobre, plus de **200 000 passionnés** se réunissent à **Messe Essen (Allemagne)** pour le salon international du jeu **SPIEL**. Avec plus d'un millier de nouveautés présentées simultanément à travers 6 halls gigantesques, planifier sa visite relève du défi stratégique !

**EssenAssistant** est une application web moderne, ultra-rapide et entièrement en français conçue pour vous accompagner avant et pendant le salon :
- **Ne manquez aucune pépite** grâce à l'intégration directe de la preview officielle BoardGameGeek.
- **Retrouvez immédiatement chaque jeu sur place** avec son numéro exact de Hall, Rangée et Stand.
- **Optimisez vos déplacements** grâce au calcul de parcours marcheur sans allers-retours inutiles dans les allées.
- **Maîtrisez votre budget** avec le récapitulatif financier et les exports de listes personnalisées.

---

## ✨ Fonctionnalités Phares

### 1. 🇫🇷 Catalogue Exhaustif (1 250+ Jeux BGG)
- **Base de données complète** : Intégration en direct du flux officiel **BGG GeekPreview n°93 (SPIEL Essen 2026)** et des sélections phares d'éditeurs.
- **Fiches de jeux détaillées en français** : Auteurs, illustrateurs, éditeurs, prix indicatif en euros, pitch, raisons de la hype à Essen, configuration de joueurs, durée de partie, âge et niveau de complexité (*Familial*, *Initié*, *Expert*).
- **Visuels officiels HD** : Jaquettes et illustrations hébergées en haute définition.

### 2. 📍 Géolocalisation Précise des Stands
- **Emplacement exact** : Retrouvez pour chaque jeu son **Hall (1 à 6)**, son **Allée / Rangée (A à G)** et son **Numéro de Stand** (*ex : Hall 3 • Rangée B • Stand 3-B110*).
- **Infos exclusives sur le stand** : Nombre de tables de démonstration annoncées, horaires des séances de dédicaces avec les auteurs et conseils d'accès (files d'attente prioritaires le matin, goodies collectors).

### 3. 🗺️ Plan Interactif des 6 Halls de Messe Essen
- **Hall 1** : Grands éditeurs internationaux & Nouveautés Grand Public / Famille.
- **Hall 2** : Jeux d'ambiance, Party games, Jeux enfants & Petits jeux futés.
- **Hall 3** : Le temple des Eurogames, Gros jeux de gestion & Hype mondiale.
- **Hall 4** : Pavillon Asie (Japon, Corée, Taïwan) & Studios émergents indépendants.
- **Hall 5** : Éditeurs indépendants européens, jeux de stratégie & financements participatifs.
- **Hall 6** : Jeux de rôle, Figurines, Peinture, Wargames & Univers immersifs.

### 4. 🔍 Moteur de Recherche & Filtres Multicritères
- Recherche instantanée plein texte par titre, auteur, éditeur, mécanique ou numéro de stand.
- Filtrage rapide par Hall, niveau de complexité, nombre de joueurs (solo, duo, 3-4, 5+), durée de partie et disponibilité de la version française (VF intégrale, règles VF, VO sans texte).
- Chips de thématiques populaires (*Eurogame, Deckbuilding, Pose d'ouvriers, Coopératif, Japon, Cyberpunk, Enquête, etc.*).
- 8 modes de tri : **Hype Essen 2026**, **Parcours Salon**, Note BGG, Prix croissant, Complexité, Durée, Alphabétique.

### 5. 📋 Gestion de Listes Personnalisées & Optimisation de Parcours
- Créez vos propres listes : *À tester absolument*, *Priorité achat*, *Coups de cœur*, *Déjà testés au salon*...
- **Calcul automatique du budget** cumulé (€) et du temps de jeu total.
- 🧭 **Parcours optimisé dans le salon** : Réorganise automatiquement votre sélection hall par hall et rangée par rangée pour une visite fluide et méthodique.
- **Exports multi-formats** : Téléchargement en **CSV (Excel)**, en **JSON** ou format **Impression** (feuille de route papier à emporter dans son sac à dos).

### 6. 🔄 Radar de Synchronisation en Continu
- Interroge l'API BoardGameGeek en temps réel pour détecter les nouveaux jeux au fil des annonces des éditeurs.
- Fréquence automatique ajustable (mode salon toutes les 2 min, toutes les 10 min, ou manuel).
- Journal de bord des mises à jour récentes (changelog).
- Possibilité d'ajouter manuellement une fiche de jeu personnalisée en 30 secondes.

---

## 🏗️ Architecture & Technologies

| Élément | Technologie | Description |
| :--- | :--- | :--- |
| **Framework** | React 19 | Interface réactive, composants modulaires et hooks modernes |
| **Outillage Build** | Vite 8 | Compilation ultra-rapide et rechargement à chaud (HMR) |
| **Style & UI** | Vanilla CSS | Design system sur-mesure, glassmorphisme, dark mode & light mode |
| **Typographie** | Google Fonts | *Outfit* (titrages percutants) & *Plus Jakarta Sans* (lisibilité) |
| **Icônes** | Lucide React | Bibliothèque d'icônes vectorielles légères et expressives |
| **Données** | BoardGameGeek API | GeekPreview 93 SPIEL Essen 2026 + Catalogue enrichi |
| **CI / CD** | GitHub Actions | Déploiement continu automatisé sur GitHub Pages |

---

## 💻 Démarrage Local

### Prérequis
- [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée)
- npm

### Installation & Lancement rapide

```bash
# 1. Cloner le dépôt
git clone https://github.com/nrtworld/EssenAssistant.git
cd EssenAssistant

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
npm run dev
```

> **Sur macOS** : Vous pouvez également double-cliquer directement sur le fichier `demarrer.command` dans le Finder pour lancer l'application et ouvrir votre navigateur automatiquement !

---

## 🚀 Déploiement en Ligne

### Déploiement automatique sur GitHub Pages
Le dépôt intègre déjà le workflow de publication continue [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

1. Allez dans les réglages de votre dépôt : **Settings > Pages**.
2. Dans la section **Build and deployment > Source**, sélectionnez **GitHub Actions**.
3. Chaque modification poussée sur la branche `main` sera automatiquement mise en ligne sur :  
   👉 **`https://nrtworld.github.io/EssenAssistant/`**

### Déploiement alternatif sur Vercel
1. Importez le dépôt sur [Vercel](https://vercel.com/new).
2. Cliquez sur **Deploy** (aucune variable d'environnement requise).

---

## 📅 Informations Pratiques — SPIEL ESSEN 2026

- **Dates** : Du jeudi 22 au dimanche 25 octobre 2026
- **Lieu** : Messe Essen, Messeplatz 1, 45131 Essen, Allemagne
- **Horaires** : 10h00 - 19h00 (Dimanche : 10h00 - 18h00)
- **Site officiel** : [spiel-essen.de](https://www.spiel-essen.de/)

---

## 📄 Licence & Mentions

- Projet open-source sous licence **MIT**.
- Les données et visuels de jeux sont la propriété respective de leurs éditeurs et de **BoardGameGeek**.
- Ce projet est un outil communautaire indépendant non-officiel d'aide aux visiteurs.

<div align="center">
  <sub>Fait avec passion pour les joueurs et les explorateurs de SPIEL Essen 🎲</sub>
</div>
