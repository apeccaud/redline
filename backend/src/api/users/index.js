const { Router } = require('express');

const router = new Router();
const controler = require('./users.controller');

/**
 * @api {get} / Get all users
 * @apiName GetAllUsers
 * @apiGroup Static Pages
 * @apiDescription Affiche tous les utilisateurs
 */
router.get('/', controler.findAll);

/**
 * @api {post} / Create a user
 * @apiName CreateUser
 * @apiGroup Static Pages
 * @apiDescription Crée un utilisateur
 *
 * @apiParam  {String} name Nom de l'user à créer
 * @apiParam  {String} role Rôle de l'user à créer ("teacher" ou "student")
 */
router.post('/', controler.create);

/**
 * @api {get} / Get one user
 * @apiName GetUser
 * @apiGroup Static Pages
 * @apiDescription Affiche un utilisateur à partir de son id
 *
 * @apiParam  {String} id id de l'user à récupérer
 */
router.get('/:id', controler.findOne);

/**
 * @api {get} / Get status of a user
 * @apiName GetUserStatus
 * @apiGroup Static Pages
 * @apiDescription Affiche le statut d'un utilisateur à partir de son id
 *
 * @apiParam  {String} id id de l'user à récupérer
 */
router.get('/:id/status', controler.getStatus);

module.exports = router;
