# 📚 Library – Plateforme de gestion de bibliothèque modulaire

> Application de gestion de bibliothèque développée dans une architecture **microservices** conteneurisée, respectant les principes **SOLID**, les **design patterns** et orientée vers la **scalabilité**.

---

## 🧭 Présentation

Ce projet vise à mettre en œuvre une architecture distribuée moderne pour gérer les fonctionnalités d'une bibliothèque :
- Gestion des livres et des utilisateurs
- Analyse des comportements
- Moteur de recommandation
- Communication entre services via RabbitMQ
- Conteneurisation complète via Docker Compose

---

## 🏗️ Architecture technique

- **API Gateway** : point d’entrée unique (Express.js)
- **library-service** : gestion des livres (Express.js + TypeScript + PostgreSQL)
- **analytics-service** : analyse des comportements (NestJS + MongoDB)
- **recommandation-engine** : moteur de recommandation (Python – à implémenter)
- **RabbitMQ** : bus de communication entre services
- **Bases de données** : PostgreSQL (relationnelle) + MongoDB (NoSQL)

---

## 🧰 Stack utilisée

| Composant                   | Technologie                         |
|----------------------------|--------------------------------------|
| Backend principal           | Node.js, Express.js, TypeScript     |
| Service analytique          | NestJS                              |
| Recommandation (à venir)    | Python                              |
| Base de données relationnelle | PostgreSQL                        |
| Base de données NoSQL       | MongoDB                             |
| Communication inter-services| RabbitMQ                            |
| Conteneurisation            | Docker, Docker Compose              |

---

## 📦 Fonctionnalités prévues

- ✅ CRUD livres et utilisateurs
- 🔄 Collecte de données et analytique
- 🛠️ Système de recommandation
- 🧱 Authentification centralisée (à venir)
- 🧠 Application des principes **SOLID** & **Design Patterns**

---

## 🎯 Objectifs du projet

- Démontrer la capacité à structurer et implémenter une architecture microservices.
- Illustrer une approche pragmatique orientée **maintenabilité**, **extensibilité** et **bonnes pratiques**.
- Offrir un socle extensible et réutilisable pour tout projet similaire.

---

## 🚧 État d’avancement

| Composant                | Statut       |
|--------------------------|--------------|
| `library-service`        | ✅ opérationnel (Express + PostgreSQL)  
| `analytics-service`      | ✅ opérationnel (NestJS + MongoDB)  
| `recommandation-engine`  | 🛑 à démarrer (Python)  
| `api-gateway`            | ✅ opérationnel  
| `RabbitMQ`               | ✅ configuré  
| Authentification         | 🛑 à venir  

---

## 📂 Structure du projet

