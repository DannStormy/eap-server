const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin.js');

router.get('/admin/application-entries', admin.fetchApplications);

module.exports = router;
