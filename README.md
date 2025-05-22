# 🏋️‍♂️ Agenda Coach Sportif – Groupe 14

Projet réalisé dans le cadre du module **Projet Web Accessible et Optimisé** (HETIC - 3ème année Développeur Web).

---

## 🎯 Objectif

Créer une application web **ultra-légère**, **responsive** et **100% accessible**, compatible avec :
- les vieilles machines 🖥️
- les connexions lentes 📶
- la navigation au clavier ⌨️
- les lecteurs d’écran 🗣️

---

## 🧱 Technologies utilisées

- HTML5 sémantique
- CSS3 sans framework
- JavaScript vanilla (aucune dépendance)
- Déploiement via [GitHub Pages](https://pages.github.com/)

---

## ♿ Normes d'accessibilité respectées (WCAG 2.1)

- Navigation complète au clavier (avec `:focus` visible)
- Contrastes respectant le niveau **AAA**
- Utilisation des rôles ARIA (`aria-live`, `aria-invalid`, `aria-describedby`)
- Balises sémantiques (`<main>`, `<nav>`, `<section>`, `<form>`, etc.)
- Feedback vocal accessible via lecteurs d'écran
- Mode sombre activé via `prefers-color-scheme`

<<<<<<< HEAD
## 🎤 Commande vocale
Grâce à l’API Web Speech, votre navigateur (Edge/Cortana ou Safari/Siri) reconnaît ces commandes :
- **planning** : navigation rapide vers la section Planning  
- **enregistrer client [Nom] exercice [Exercice]** : préremplit le formulaire  
- **envoyer** ou **enregistrer** : soumet les données  

Cliquez sur le bouton 🎤 en haut à droite pour l’activer.

=======
>>>>>>> dea0045581fffa4caf80a09d49a6e473b46b11e9
---

## 🚀 Fonctionnalités

- 📅 Planning des séances selon la qualité de connexion
- 📝 Formulaire avec validation accessible et messages d'erreur
- 📊 Suivi de performances des clients
- 🥗 Suivi nutritionnel
- 😴 Recommandations de repos

---

## 🔌 Optimisations

- 🎨 Design minimaliste avec animations seulement en mode rapide
- 🌐 Mode `mode-basic` pour connexions 2G (contenu allégé)
- 🧠 `mode-detailed` pour enrichir l'expérience sur bonnes connexions
- 🕶 Fallback `noscript` pour navigateurs sans JavaScript
- 📏 Audits Lighthouse, Axe et WebAIM conformes WCAG AAA

---

## 🛠 Lancer le projet en local

```bash
git clone https://github.com/BragaAteMorrer/projet-stratinfra-3emeannee.git
cd projet-stratinfra-3emeannee
# Ouvrir index.html dans le navigateur
