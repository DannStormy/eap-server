const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const db = require('../config/config.js');
const queries = require('../queries/admin_queries.js');

const fetchApplications = async (req, res) => {
    try {
        const applications = await db.any(queries.getAllApplications)
        return res.status(200).json({
            status: 'Success',
            message: 'Applications returned',
            data: applications
        })
    } catch (err) {
        console.log(err)
        return err;
    }
}

module.exports = {
    fetchApplications
}