const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const db = require('../config/config.js');
const queries = require('../queries/admin_queries.js');

const adminLogin = async (req, res) => {
    try {
        let { email, password } = req.body;
        const existingEmail = await db.any(queries.findByEmail, [email]);
        const admin = await db.any(queries.getAdminByEmail, [email]);
        if (existingEmail.length === 0) {
            return res.status(404).json({
                status: 'Failed',
                message: 'Admin not found'
            })
        }
        const passwordMatch = bcrypt.compareSync(password, admin[0].password);
        if (!passwordMatch) {
            return res.status(400).json({
                status: 'Failed',
                message: 'Incorrect password'
            })
        }
        const sessionToken = jwt.sign(
            {
                admin_id: admin.id,
                email: admin.email,
                name: admin.name,
            },
            process.env.JWT_SECRET_KEY
        );
        delete admin[0].password
        return res.status(200).json({
            status: 'Success',
            message: 'Logged In Successfully',
            data: {
                admin,
                token: sessionToken
            }
        })
    } catch (error) {
        console.log(error)
        return error
    }
}
const getAdminDetails = async (req, res) => {
    try {
        const details = await db.any(queries.getAdminDetails, [req.body.email])
        delete details[0].password
        return res.status(200).json({
            status: 'Success',
            message: 'Details returned',
            data: details
        })

    } catch (error) {
        console.log(error)
        return error
    }
}
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

const createApplication = async (req, res) => {
    try {
        console.log(req.body)
    } catch (error) {
        console.log(error)
        return error
    }
}

const updateApplicantStatus = async (req, res) => {
    try {
        let { status, applicant_id } = req.body
        console.log(req.body)
        await db.any(` UPDATE
        application_status
        SET
        status = ${status}
        WHERE
        applicant_id = '${applicant_id}'
        RETURNING *;`)
    } catch (error) {
        console.log(error)
        return error
    }
}
module.exports = {
    fetchApplications, createApplication, adminLogin, getAdminDetails, updateApplicantStatus
}