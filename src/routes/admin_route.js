const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin.js');

router.get('/admin/application-entries', admin.fetchApplications);
router.post('/admin/create-application', admin.createApplication);
router.post('/admin/login', admin.adminLogin);
router.post('/admin/admin-details', admin.getAdminDetails)

module.exports = router;
