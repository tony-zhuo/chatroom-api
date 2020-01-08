const express = require('express');
const adminCtr = require('../controllers/adminCtr');
const authCtr = require('../controllers/authCtr');

const router = express.Router();

router.route('/create').post(authCtr.protect, adminCtr.create);
router.route('/removeUser').delete(authCtr.protect, adminCtr.removeUser);
router.route('/upgrade').patch(authCtr.protect, adminCtr.upgrade);

module.exports = router;
