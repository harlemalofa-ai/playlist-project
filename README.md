# Music Playlist Project

Projet web de gestion de playlists musicales réalisé avec Angular, NestJS et PostgreSQL.

## Technologies utilisées

### Backend
- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- JWT
- bcrypt
- dotenv

### Frontend
- Angular
- TypeScript
- Reactive Forms
- Angular Router
- HTTP Client
- LocalStorage

## Fonctionnalités

### Authentification
- Inscription
- Connexion
- Stockage de l'access token et du refresh token
- Route `/auth/me`
- Refresh token
- Protection des routes Angular avec un guard
- Envoi automatique du token avec un interceptor

### Gestion des playlists
- Afficher la liste des playlists
- Afficher les détails d'une playlist
- Créer une playlist
- Modifier une playlist
- Supprimer une playlist
- Routes API protégées par JWT

## Configuration du backend

Aller dans le dossier backend :

```bash
cd playlist-api