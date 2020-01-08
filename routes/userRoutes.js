const express = require('express');
const UserCtr = require('../controllers/userCtr');
const authCtr = require('../controllers/authCtr');

const router = express.Router();

router.route('/me').get(authCtr.protect, UserCtr.getMe);

router.route('/signup').post(UserCtr.signup);
router.route('/login').post(UserCtr.login);
router.route('/all').get(UserCtr.getAllUsers);

module.exports = router;
