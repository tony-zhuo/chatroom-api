const express = require('express');
const MsgCtr = require('../controllers/msgCtr');
const authCtr = require('../controllers/authCtr');

const router = express.Router();

router.route('/all').get(authCtr.protect, MsgCtr.getAllMsg);
router.route('/send').post(authCtr.protect, MsgCtr.sendMsg);

module.exports = router;
