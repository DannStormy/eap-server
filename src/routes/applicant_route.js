const express = require('express');
const router = express.Router();
const applicant = require('../controllers/applicant.js');

router.post('/applicant/signup', applicant.signup);
router.post('/applicant/login', applicant.login);


module.exports = router;
