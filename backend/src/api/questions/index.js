const { Router } = require('express');

const router = new Router();
const controler = require('./questions.controller');
const controlerResponses = require('./responses.controller');

/**
 * @api {get} /questions Get all questions
 * @apiName GetAllQuestions
 * @apiGroup Static Pages
 * @apiDescription Affiche toutes les questions
 */
router.get('/', controler.findAll);

/**
 * @api {post} /questions Create a question
 * @apiName CreateQuestion
 * @apiGroup Static Pages
 * @apiDescription Crée une question
 *
 * @apiParam  {String} answer1 Réponse 1
 * @apiParam  {String} answer2 Réponse 2
 * @apiParam  {String} answer3 Réponse 3
 * @apiParam  {String} answer4 Réponse 4
 */
router.post('/', controler.create);

/**
 * @api {get} /questions/findLastActive Find last active question or return null
 * @apiName findLastActive
 * @apiGroup Static Pages
 * @apiDescription Find last active question or return null
 */
router.get('/findLastActive', controler.findLastActive);

/**
 * @api {put} /questions/deactivate Deactivate specific question
 * @apiName deactivate
 * @apiGroup Static Pages
 * @apiDescription Desactive la question dont l'identifiant est fourni
 *
 * @apiParam  {String} id Id de la question à desactiver
 */
router.put('/:id/deactivate', controler.deactivate);

/**
 * @api {get} /questions/:id/getResponses Get responses for question
 * @apiName getResponses
 * @apiGroup Questions
 * @apiDescription Get responses for question
 */
router.get('/:id/getResponses', controlerResponses.getResponses);

/**
 * @api {post} /questions/:id/responses/create Create a response
 * @apiName CreateResponse
 * @apiGroup Questions
 * @apiDescription Crée une réponse
 *
 * @apiParam  {String} id id de la question
 * @apiParam  {String} answer compris dans ['answer1', 'answer2', 'answer3', 'answer4']
 */
router.post('/:id/responses/create', controlerResponses.create);

module.exports = router;
