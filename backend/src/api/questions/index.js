const { Router } = require('express');

const router = new Router();
const controler = require('./questions.controller');

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
 * @apiParam  {String} goodAnswer Bonne reponse
 * @apiParam  {String} badAnswer1 Mauvaise réponse 1
 * @apiParam  {String} badAnswer2 Mauvaise réponse 2
 * @apiParam  {String} badAnswer3 Mauvaise réponse 3
 */
router.post('/', controler.create);

/**
 * @api {post} /questions/findLastActive Find last active question or return null
 * @apiName findLastActive
 * @apiGroup Static Pages
 * @apiDescription Find last active question or return null
 */
router.get('/findLastActive', controler.findLastActive);

module.exports = router;