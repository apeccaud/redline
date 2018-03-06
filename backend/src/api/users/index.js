const { Router } = require('express');

const router = new Router();
const controler = require('./users.controller');

router.get('/', controler.findAll);
// router.get('/:id', controler.findOne);
// router.post('/', controler.create);

module.exports = router;
