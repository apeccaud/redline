const { Router } = require('express');

const router = new Router();

/**
 * @api {get} / Welcome
 * @apiName Welcome
 * @apiGroup Static Pages
 * @apiDescription Cette URL affiche un simple message d'accueil
 */
router.get('/', (req, res) => res.send('Bienvenue sur Redline API!'));

router.use('/users', require('./users'));

router.use('/questions', require('./questions'));

module.exports = router;
