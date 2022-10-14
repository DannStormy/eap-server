const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const db = require('../config/config.js');
const queries = require('../queries/applicants_queries.js');

const signup = async (req, res) => {
    let { firstName, lastName, email, phone, password } = await req.body;
    try {
        const existingEmail = await db.any(queries.findByEmail, [email]);
        if (existingEmail.length > 0) {
            return res.status(400).json({
                status: 'Failed',
                message: 'User already exists, please proceed to login'
            })
        }
        password = bcrypt.hashSync(password, 10);
        const applicant = await db.any(queries.registerApplicant, [firstName, lastName, email, phone, password])
        return res.status(200).json({
            status: 'Success',
            message: 'Registered Successfully',
            data: applicant.firstName
        })
    } catch (err) {
        console.log(err)
        return err;
    }
}

const login = async (req, res) => {
    let { email, password } = req.body;
    try {
        const existingEmail = await db.any(queries.findByEmail, [email]);
        const applicant = await db.any(queries.getApplicantByEmail, [email]);
        if (existingEmail.length === 0) {
            return res.status(404).json({
                status: 'Failed',
                message: 'No user with this email'
            })
        }
        const passwordMatch = bcrypt.compareSync(password, applicant[0].password);
        if (!passwordMatch) {
            return res.status(400).json({
                status: 'Failed',
                message: 'Incorrect password'
            })
        }
        const sessionToken = jwt.sign(
            {
                applicant_id: applicant.id,
                email: applicant.email,
                name: applicant.name,
            },
            process.env.JWT_SECRET_KEY
        );
        delete applicant[0].password
        return res.status(200).json({
            status: 'Success',
            message: 'Logged In Successfully',
            data: {
                applicant,
                token: sessionToken
            }
        })
    } catch (err) {
        console.log(err)
        return err;
    }

}

module.exports = {
    signup, login
}