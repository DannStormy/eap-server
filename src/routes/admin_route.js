const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin.js');

router.get('/admin/application-closure', admin.applicationClosure);
router.get('/admin/all_batches', admin.getAllBatches);
router.get('/admin/application-entries', admin.fetchApplications);
router.post('/admin/application-by-batch', admin.fetchApplicationsByBatch);
router.get('/admin/dashboard', admin.getAdminDashboardDetails);
router.get('/admin/get-assessments', admin.getAllAssessments);
router.post('/admin/create-application', admin.createApplication);
router.get('/admin/create-application', admin.getAllQuestions);
router.post('/admin/create-admin', admin.createAdmin);
router.post('/admin/login', admin.adminLogin);
router.post('/admin/admin-details', admin.getAdminDetails);
router.post('/admin/status', admin.updateApplicantStatus);
router.post('/admin/compose-assessment', admin.composeAssessment);

module.exports = router;
