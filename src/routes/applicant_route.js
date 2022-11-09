const express = require('express');
const router = express.Router();
const applicant = require('../controllers/applicant.js');
const checkAuth = require('../middleware/user_auth.js');


router.post('/applicant/reset-password', applicant.resetPassword)
router.put('/applicant/update-password', checkAuth, applicant.updatePassword)
router.post('/applicant/signup', applicant.signup);
router.post('/applicant/login', applicant.login);
router.get('/applicant/apply/:email', applicant.getNewApplicantDetails);
router.post('/applicant/apply', checkAuth, applicant.apply);
router.post('/applicant/dashboard', checkAuth, applicant.dashboardPic);
router.post('/applicant/assessment-status', checkAuth, applicant.updateAssessmentStatus);
router.post('/applicant/score', checkAuth, applicant.setScore);
router.get('/applicant/get-assessment', checkAuth, applicant.getAssessment);
router.get('/applicant/timer', checkAuth, applicant.getTime);



module.exports = router;