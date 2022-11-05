const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin.js');
const checkAuth = require('../middleware/user_auth.js');


router.get('/admin/application-closure', admin.applicationClosure);
router.get('/admin/all_batches', checkAuth, admin.getAllBatches);
router.get('/admin/application-entries', checkAuth, admin.fetchApplications);
router.post('/admin/application-by-batch', checkAuth, admin.fetchApplicationsByBatch);
router.get('/admin/dashboard', checkAuth, admin.getAdminDashboardDetails);
router.get('/admin/get-assessments', checkAuth, admin.getAllAssessments);
router.post('/admin/create-application', checkAuth, admin.createApplication);
router.get('/admin/create-application', checkAuth, admin.getAllQuestions);
router.post('/admin/create-admin', checkAuth, admin.createAdmin);
router.post('/admin/login', admin.adminLogin);
router.post('/admin/admin-details', checkAuth, admin.getAdminDetails);
router.post('/admin/status', checkAuth, admin.updateApplicantStatus);
router.post('/admin/compose-assessment', checkAuth, admin.composeAssessment);

module.exports = router;
