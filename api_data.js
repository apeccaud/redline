define({ "api": [
  {
    "type": "put",
    "url": "/users/:id/changeStatus",
    "title": "Change status of a user",
    "name": "ChangeUserStatus",
    "group": "Static_Pages",
    "description": "<p>Change le statut d'un utilisateur par un statut spécifié et respectant la validation ('lost' ou 'neutral')</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id de l'user à récupérer</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/users/index.js",
    "groupTitle": "Static_Pages",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/users/:id/changeStatus"
      }
    ]
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Create a user",
    "name": "CreateUser",
    "group": "Static_Pages",
    "description": "<p>Crée un utilisateur</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Nom de l'user à créer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>Rôle de l'user à créer (&quot;teacher&quot; ou &quot;student&quot;)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/users/index.js",
    "groupTitle": "Static_Pages",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/users"
      }
    ]
  },
  {
    "type": "get",
    "url": "/users/status",
    "title": "Get all user status",
    "name": "GetAllUserStatus",
    "group": "Static_Pages",
    "description": "<p>Permet d'obtenir une liste des status de tous les utilisateurs</p>",
    "version": "0.0.0",
    "filename": "src/api/users/index.js",
    "groupTitle": "Static_Pages",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/users/status"
      }
    ]
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Get all users",
    "name": "GetAllUsers",
    "group": "Static_Pages",
    "description": "<p>Affiche tous les utilisateurs</p>",
    "version": "0.0.0",
    "filename": "src/api/users/index.js",
    "groupTitle": "Static_Pages",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/users"
      }
    ]
  },
  {
    "type": "get",
    "url": "/",
    "title": "Hello World",
    "name": "GetHome",
    "group": "Static_Pages",
    "description": "<p>Cette URL affiche un simple message Hello World</p> <p>Il est possible d'écrire des messages sur plusieurs lignes dans la description.</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\nHello, World!",
          "type": "html"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/index.js",
    "groupTitle": "Static_Pages",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/"
      }
    ]
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "Get one user",
    "name": "GetUser",
    "group": "Static_Pages",
    "description": "<p>Affiche un utilisateur à partir de son id</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id de l'user à récupérer</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/users/index.js",
    "groupTitle": "Static_Pages",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/users/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/users/:id/status",
    "title": "Get status of a user",
    "name": "GetUserStatus",
    "group": "Static_Pages",
    "description": "<p>Affiche le statut d'un utilisateur à partir de son id</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id de l'user à récupérer</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/users/index.js",
    "groupTitle": "Static_Pages",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/api/users/:id/status"
      }
    ]
  }
] });