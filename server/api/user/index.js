'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.get('/contacts/list', auth.isAuthenticated(), controller.contacts);
router.get('/conversations/list', auth.isAuthenticated(), controller.convo);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.addContact);
router.post('/', controller.create);
// router.put('/contacts/add/:id', auth.isAuthenticated(), controller.updateContacts);

module.exports = router;
