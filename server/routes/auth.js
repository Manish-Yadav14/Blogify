const express = require('express');
const router = express.Router();
const {Login,Signup,Authenticate,getUserInfo} = require('../controllers/auth')

router.route('/login').post(Login);
router.route('/signup').post(Signup);
router.route('/authenticate').post(Authenticate);
router.route('/getUserInfo').post(getUserInfo)

module.exports = router;