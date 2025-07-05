# FESPACO - Festival Panafricain du Cinéma et de la Télévision de Ouagadougou

## Description du Projet

Application web moderne de présentation du FESPACO (Festival Panafricain du Cinéma et de la Télévision de Ouagadougou), le plus grand festival de cinéma d'Afrique qui se tient tous les deux ans au Burkina Faso. Cette application présente les différentes activités, événements et informations du festival avec un design moderne et des effets 3D immersifs.

## Objectifs

- Présenter le FESPACO et son importance culturelle
- Mettre en valeur les activités et événements du festival
- Offrir une expérience utilisateur moderne avec des effets 3D
- Assurer une accessibilité optimale et un design responsive
- Promouvoir le cinéma africain et la culture panafricaine

## Structure du Projet

```
Project-Integrateur-Fespaco/
├── README.md
├── templates/
│   ├── index.html          # Page d'accueil
│   ├── apropos.html        # À propos du FESPACO
│   ├── partenaires.html    # Partenaires du festival
│   ├── contact.html        # Contact et informations
│   └── evenements.html     # Événements et programmation
├── resources/
│   ├── styles/
│   │   ├── main.css        # Styles principaux
│   │   ├── components.css  # Styles des composants
│   │   └── effects.css     # Effets 3D et animations
│   ├── scripts/
│   │   ├── main.js         # Script principal
│   │   ├── animations.js   # Animations et effets
│   │   └── interactions.js # Interactions utilisateur
│   └── assets/
│       ├── images/         # Images du festival
│       ├── videos/         # Vidéos promotionnelles
│       └── icons/          # Icônes et logos
└── .github/
    └── workflows/
        └── ci-cd.yml       # Configuration GitHub Actions
```

## Technologies Utilisées

- **HTML5** - Structure sémantique et accessible
- **CSS3/SCSS** - Styles modernes avec préprocesseur
- **Bootstrap 5** - Framework CSS responsive
- **JavaScript ES6+** - Interactions et effets dynamiques
- **GitHub Actions** - CI/CD et déploiement automatique
- **GitHub Pages** - Hébergement du site

## Fonctionnalités

### Pages Principales
- **Accueil** : Présentation générale avec effets 3D
- **À Propos** : Histoire et mission du FESPACO
- **Partenaires** : Sponsors et collaborateurs
- **Contact** : Informations de contact et localisation
- **Événements** : Programmation et activités

### Effets et Animations
- Animations 3D CSS et JavaScript
- Parallax scrolling
- Transitions fluides
- Effets hover interactifs
- Animations au scroll

## Installation et Lancement

### Prérequis
- Navigateur web moderne
- Git
- Node.js (optionnel pour le développement)

### Cloner le Projet
```bash
git clone https://github.com/votre-username/fespaco-website.git
cd fespaco-website
```

### Lancement Local
```bash
# Ouvrir directement le fichier HTML
open templates/index.html

# Ou utiliser un serveur local
python -m http.server 8000
# Puis aller sur http://localhost:8000
```

## 👥 Équipe de Développement

| Nom               | Rôle                 |  Pages Assignées             |
|-------------------|----------------------|------------------------------|
| SAWADOGO Honorine | Developpement        | Accueil, À Propos            |
|                   | Receuille des ressources, images et videos          |
| SEBGO Leonard     | Developpement        | Partenaires, Contact         |
|                   | JavaScript Developer | Événements, Effets 3D        |

## Workflow de Développement

### Stratégie de Branches
- `main` : Branche principale (code stable)
- `feature/*` : Branches de fonctionnalités
- `fix/*` : Corrections de bugs

### Processus de Contribution
1. Créer une branche feature depuis main
2. Développer la fonctionnalité
3. Créer une Pull Request
4. Revue de code par les pairs
5. Merge après validation

### Commits Structurés
```
feat: ajout de la page d'accueil avec effets 3D
fix: correction de l'animation du header
docs: mise à jour du README
style: amélioration du CSS responsive
```

## CI/CD avec GitHub Actions

### Validations Automatiques
- **Linting HTML** : Validation du HTML avec HTMLHint
- **Linting CSS** : Validation du CSS avec Stylelint
- **Tests JavaScript** : Validation du JS avec ESLint
- **Tests d'Accessibilité** : Validation WCAG
- **Tests de Performance** : Lighthouse CI

### Déploiement
- Déploiement automatique sur GitHub Pages
- Déclenchement sur push vers main
- URL de production : `https://votre-username.github.io/fespaco-website`

## Métriques de Qualité

- **Performance** : Score Lighthouse > 90
- **Accessibilité** : Conformité WCAG 2.1 AA
- **SEO** : Optimisation pour les moteurs de recherche
- **Responsive** : Support mobile/tablette/desktop

## À Propos du FESPACO

Le Festival Panafricain du Cinéma et de la Télévision de Ouagadougou (FESPACO) est le plus grand festival de cinéma d'Afrique, créé en 1969 au Burkina Faso. Il se tient tous les deux ans et promeut le cinéma africain et la production audiovisuelle du continent.

### Objectifs du Festival
- Promouvoir la production cinématographique africaine
- Encourager la diffusion des films africains
- Favoriser les échanges entre professionnels du cinéma
- Contribuer au développement culturel de l'Afrique

## Contact

Pour toute question ou suggestion concernant ce projet :
- Email : sebgoleonardo3@gmail.com, honorinesawadogo07@gmail.com
- GitHub Issues : [Issues du projet](https://github.com/LeoSEBGO/Project-Integrateur-Fespaco/issues)

## Remerciements

- FESPACO pour l'inspiration et les informations
- Communauté open source pour les outils utilisés
---

*Développé avec ❤️ pour promouvoir le cinéma africain* 