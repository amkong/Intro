'use strict';

var express = require('express');
var controller = require('./conversation.controller');

var router = express.Router();

router.get('/list/:id', controller.index);
router.get('/:id', controller.show);
// router.get('/list', controller.conversation);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;