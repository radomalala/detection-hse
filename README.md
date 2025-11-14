# 🚨 Application de Détection HSE

Application web mobile pour la déclaration et le signalement d'événements HSE (Hygiène, Sécurité, Environnement).

## 📋 Description

Cette application permet aux utilisateurs de signaler rapidement des incidents de sécurité, accidents, observations ou problèmes environnementaux directement depuis leur appareil mobile. L'interface intuitive facilite la collecte d'informations essentielles avec la possibilité d'ajouter des photos.

## ✨ Fonctionnalités

- 📱 **Interface mobile responsive** optimisée pour les appareils mobiles
- 🎨 **Design moderne** avec Tailwind CSS
- 📸 **Capture de photos** pour documenter les incidents
- 📝 **Formulaire complet** avec validation
- ⚡ **Catégorisation** des événements :
  - Accidents
  - Incidents proches
  - Observations de sécurité
  - Problèmes environnementaux
- 📍 **Géolocalisation** et horodatage automatique
- ✅ **Feedback visuel** lors de la soumission

## 🛠️ Technologies Utilisées

- **React 19** - Framework JavaScript
- **TypeScript** - Typage statique
- **Vite** - Build tool et dev server
- **Tailwind CSS** - Framework CSS utilitaire
- **ESLint** - Linter pour la qualité du code

## 🚀 Installation

```bash
# Cloner le dépôt
git clone https://github.com/radomalala/detection-hse.git

# Accéder au dossier
cd detection-hse

# Installer les dépendances
npm install
```

## 💻 Utilisation

```bash
# Lancer le serveur de développement
npm run dev

# Compiler pour la production
npm run build

# Prévisualiser la version de production
npm run preview

# Linter le code
npm run lint
```

## 📦 Structure du Projet

```
mon-app-hse/
├── public/              # Fichiers statiques
├── src/
│   ├── App.jsx         # Composant principal de l'application
│   ├── main.tsx        # Point d'entrée
│   ├── index.css       # Styles globaux avec Tailwind
│   └── assets/         # Images et ressources
├── index.html          # Template HTML
├── vite.config.ts      # Configuration Vite
├── tailwind.config.js  # Configuration Tailwind CSS
└── package.json        # Dépendances et scripts
```

## 🎯 Prochaines Étapes

- [ ] Intégration d'une API backend
- [ ] Authentification des utilisateurs
- [ ] Tableau de bord administrateur
- [ ] Notifications push
- [ ] Mode hors ligne
- [ ] Export des données en PDF

## 👤 Auteur

**radomalala**

## 📄 Licence

Ce projet est privé.
