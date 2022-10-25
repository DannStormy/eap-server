const express = require('express');
const router = express.Router();
const applicant = require('../controllers/applicant.js');
const checkAuth = require('../middleware/user_auth.js')


router.post('/applicant/signup', applicant.signup);
router.post('/applicant/login', applicant.login);
router.post('/applicant/apply', checkAuth, applicant.apply);
router.post('/applicant/dashboard', applicant.dashboardPic);
router.post('/applicant/assessment-status', applicant.updateAssessmentStatus)
router.post('/applicant/score', applicant.setScore);
router.get('/applicant/get-assessment', applicant.getAssessment)



module.exports = router;