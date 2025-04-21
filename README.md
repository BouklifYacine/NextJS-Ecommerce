# E-Commerce Platform

Une plateforme e-commerce complète construite avec Next.js, offrant une expérience d'achat moderne et réactive.

## 📋 Présentation

Ce projet est une application e-commerce full-stack qui permet aux utilisateurs de parcourir des produits, de les ajouter au panier, de passer des commandes et de suivre leurs achats. L'application comprend également un panneau d'administration complet pour la gestion des produits, des commandes et des clients.

## ✨ Fonctionnalités principales

### 🛍️ Catalogue et Navigation
- Affichage en grille responsive des produits avec pagination
- Navigation par catégories et sous-catégories
- Pages détaillées des produits avec galerie d'images et zoom
- Mode sombre/clair

### 🔍 Filtres et Recherche
- Recherche par nom (globale et par catégorie)
- Filtres par prix (croissant/décroissant) avec input manuel min/max
- Filtres par popularité/ventes
- Filtres par avis et notation

### 🛒 Panier et Commande
- Ajout/suppression d'articles avec modification des quantités
- Persistance du panier entre sessions (Zustand + localStorage)
- Processus de commande en étapes avec options de livraison
- Calcul automatique de TVA et confirmation par email

### 👤 Espace Utilisateur
- Suivi des commandes avec statuts
- Gestion des adresses multiples
- Liste des articles favoris
- Système d'avis sur les produits achetés
- Annulation de commande (dans les 14 jours)
- Téléchargement de factures PDF

### 👨‍💼 Administration
- Gestion complète des produits (ajout, modification, suppression)
- Gestion des catégories et stocks
- Suivi des commandes avec changement de statut
- Tableau de bord des clients
- Visualisation des données de vente avec graphiques

### 🌟 Programme Premium (Bonus)
- Gestion des abonnements
- Avantages membres (livraison gratuite, remises, retours prolongés)
- Métriques de performance

## 🛠️ Stack Technique

### Frontend
- **Framework** : Next.js avec React 19
- **UI/Composants** : shadcn/ui, Tailwind CSS
- **État** : Zustand pour la gestion du panier et des filtres
- **Formulaires** : react-hook-form avec validation Zod
- **Data fetching** : @tanstack/react-query
- **Animations** : framer-motion
- **Thème** : next-themes pour le mode sombre/clair

### Backend
- **Base de données** : PostgreSQL avec Prisma ORM
- **Authentification** : NextAuth.js / Auth.js
- **Paiement** : Stripe
- **Gestion des images** : Cloudinary
- **PDF** : @react-pdf/renderer pour les factures

### Autres
- **Tests** : Tests unitaires, d'intégration et E2E (à implémenter)
- **CI/CD** : Configuration en cours
- **Containerisation** : Docker (à venir)

## 📥 Installation

### Prérequis
- Node.js 20.x ou supérieur
- npm 10.x ou supérieur
- PostgreSQL

### Étapes d'installation

1. Cloner le dépôt
```bash
git clone https://github.com/votre-username/e-commerce.git
cd e-commerce
```

2. Installer les dépendances
```bash
npm install
```

> **Note**: Si vous rencontrez des erreurs de compatibilité avec React 19, utilisez le flag suivant:
> ```bash
> npm install --legacy-peer-deps
> ```

3. Configurer les variables d'environnement
```bash
cp .env.example .env.local
```
Ensuite, modifiez le fichier `.env.local` avec vos propres valeurs.

4. Configurer la base de données
```bash
npx prisma migrate dev --name init
```

5. Lancer le serveur de développement
```bash
npm run dev
```

6. Accéder à l'application
Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.


## 📚 Structure du projet

```
e-commerce/
├── app/                  # App Router de Next.js
│   ├── admin/            # Pages d'administration
│   ├── api/              # Routes API
│   ├── auth/             # Pages d'authentification
│   ├── catalog/          # Pages de catalogue
│   ├── checkout/         # Pages de commande
│   └── user/             # Espace utilisateur
├── components/           # Composants React
├── lib/                  # Utilitaires et helpers
├── prisma/               # Schémas et migrations Prisma
├── public/               # Fichiers statiques
└── styles/               # Styles globaux
```

## 📝 Licence

MIT

## 👨‍💻 Auteur

Yacine Bouklif

---

Construit avec ❤️ et Next.js