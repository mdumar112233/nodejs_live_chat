const express = require('express');
const { check } = require('express-validator');

const { getUsers } = require('../controller/usersController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const avatarUpload = require('../middlewares/users/avatarUpload');


const router = express.Router();


// login page
router.get('/', decorateHtmlResponse('Users'), getUsers);

// add user 
router.post('/', avatarUpload, );

module.exports = router;