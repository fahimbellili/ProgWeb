## Projet Programmation Client/Server Side

## Nom de l'application : Foody

### 1. Répartition des tâches
Chaque membre du groupe a travaillé sur toutes les parties du projet.

### 2. Technologies utilisées : 
#### 2.1. Serveur
* Node.js

#### 2.2. Stockage : 
* MongoDB (hébergement sur mLab)

#### 2.2. Client
* Angular 7
* Bootstrap 4
* Material Design

### 3. Lancement du projet 

#### 3.1. Serveur

Le serveur est hébergé à l'adresse <https://offserver2019.herokuapp.com>    
Pour le lancer en local, ouvrir un terminal dans le dossier "Server" puis faire :  
`npm install`  
`npm start`  
Pour utiliser le serveur local avec le client, aller dans "ProgWeb\Client\providers\server.ts" et modifier à ligne 12 :  
`this.path = 'https://offserver2019.herokuapp.com';`  
par `this.path = 'http://localhost:8080';`

#### 3.2. Client

Le client est hébergé et disponible à l'adresse <https://progweb2019.herokuapp.com/>  
Pour le lancer en local, ouvrir un terminal dans le dossier "Client" puis faire :  
`npm install`  
`npm start --open`  
Le client est alors accessible à l'adresse <http://localhost:4200/>   

