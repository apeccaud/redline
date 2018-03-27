Redline
===============

[![Build Status](https://travis-ci.org/EBM-2017-2018/redline.svg?branch=master)](https://travis-ci.org/EBM-2017-2018/redline)
[![Maintainability](https://api.codeclimate.com/v1/badges/7b5e67d7a1c25ebd47d0/maintainability)](https://codeclimate.com/github/EBM-2017-2018/EBM-boilerplate/maintainability)

Redline est une application voulant favoriser les interactions entre les élèves et les professeurs lors de cours magistraux.

## API Doc

Une documentation complète des différentes routes de l'API est disponible ici : https://ebm-2017-2018.github.io/redline/

## Authentification

Afin d'accéder à l'application, il faut au préalablement se connecter à Linkapp (i.e avoir un Json Web Token (JWT) valide dans le local storage du navigateur).
Si l'utilisateur essayer d'accéder à Redline sans être connecté à Linkapp, il est redirigé vers Linkapp.

Après s'être connecté sur Linkapp, l'utilisateur est redirigé vers Redline. Le JWT est fourni dans un paramètre GET de l'url. Redline récupère ce token et l'enregistre dans le local storage.

Les routes de l'API sont protégées par un middleware qui vérifie que l'utilisateur a fourni un JWT valide dans les en-têtes de sa requête.

## Base de données

Redline utilise une base de données MangoDB pour enregistrer les données produites au cours de l'utilisation de l'application.

## React

La partie fontend utilise la librairie React, qui permet de créer et d'utiliser des composants réutiliables et déclaratifs.

## Redux

Redux est utilisé pour enregistrer les variables d'état utilisées de manière globale (e.g User).

## WebSockets

La librairie `socket.io` est utilisée pour émettre / recevoir des websockets. Les websockets sont utilisés pour actualiser certaines données rapidement dans les différents dashboards.

## Logs

Chaque appel API est enregistré :

```js
app.use((req, res, next) => {
    console.log(new Date(), req.ip, req.method, req.url, req.query, req.body);
    next();
  });
```

## Linter

Le linter ESLint est utilisé avec la configuration `airbnb-base`.

