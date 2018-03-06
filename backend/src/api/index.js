const { Router } = require('express');

const router = new Router();

/**
 * @api {get} / Hello World
 * @apiName GetHome
 * @apiGroup Static Pages
 * @apiDescription Cette URL affiche un simple message Hello World
 *
 * Il est possible d'écrire des messages sur plusieurs lignes dans la description.
 * @apiSuccessExample {html} Success-Response:
 *     HTTP/1.1 200 OK
 *     Hello, World!
 */
router.get('/', (req, res) => res.send('Hello, World!'));

router.use('/users', require('./users'));

module.exports = router;
