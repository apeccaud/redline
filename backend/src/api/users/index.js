const { Router } = require('express');

const router = new Router();
const controler = require('./users.controller');

/**
 * @api {get} /users Get all users
 * @apiName GetAllUsers
 * @apiGroup Users
 * @apiDescription Affiche tous les utilisateurs
 */
router.get('/', controler.findAll);

/**
 * @api {post} /users Create a user
 * @apiName CreateUser
 * @apiGroup Users
 * @apiDescription Crée un utilisateur
 *
 * @apiParam  {String} name Nom de l'user à créer
 * @apiParam  {String} role Rôle de l'user à créer ("teacher" ou "student")
 */
router.post('/', controler.create);

/**
 * @api {get} /users/status Get all user status
 * @apiName GetAllUserStatus
 * @apiGroup Users
 * @apiDescription Permet d'obtenir une liste des status de tous les utilisateurs
 */
router.get('/status', controler.getAllStatus);

/**
 * @api {get} /users/resetAllStatus Reset status of all users to 'neutral'
 * @apiName resetAllStatus
 * @apiGroup Users
 * @apiDescription Réinitialise le statut de tous les utilisateurs à 'neutral'
 */
router.get('/resetAllStatus', controler.resetAllStatus);

/**
 * @api {get} /users/get Get user in request parameter
 * @apiName getFromJWT
 * @apiGroup Users
 * @apiDescription Renvoie l'utilisateur dans le paramètre req
 */
router.get('/get', controler.getUser);

/**
 * @api {get} /users/:id Get one user
 * @apiName GetUser
 * @apiGroup Users
 * @apiDescription Affiche un utilisateur à partir de son id
 *
 * @apiParam  {String} id id de l'user à récupérer
 */
router.get('/:id', controler.findOne);

/**
 * @api {get} /users/:id/status Get status of a user
 * @apiName GetUserStatus
 * @apiGroup Users
 * @apiDescription Affiche le statut d'un utilisateur à partir de son id
 *
 * @apiParam  {String} id id de l'user à récupérer
 */
router.get('/:id/status', controler.getStatus);

/**
 * @api {put} /users/:id/changeStatus Change status of a user
 * @apiName ChangeUserStatus
 * @apiGroup Users
 * @apiDescription Change le statut d'un utilisateur par un statut spécifié et respectant la
 * validation ('lost' ou 'neutral')
 *
 * @apiParam  {String} id id de l'user à récupérer
 */
router.put('/:id/changeStatus', controler.changeStatus);

module.exports = router;
