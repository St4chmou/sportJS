'use strict';

const express = require('express');
const controller = require('./user.controller');

const router = express.Router();

router.post('/', controller.getUser);

module.exports = router;
