const express = require('express');
const LoginController = require('../controllers/LoginController');

const router = express.Router();

router.get('/index', LoginController.index);
router.get('/register', LoginController.register);
router.post('/index', LoginController.auth);
router.get('/logout', LoginController.logout);
router.post('/register', LoginController.storeUser);

module.exports = router;