const express = require('express');
const { loginController, registerController } = require('../controllers/userController');

const router = express.Router();

router.post('/login', loginController);

router.post('/sign-up', registerController);
module.exports = router