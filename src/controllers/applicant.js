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
        return res.status(201).json({
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
        const findApplication = await db.any(queries.findApplicationByEmail, [email]);
        if (findApplication.length > 0) {
            delete applicant[0].password
            return res.status(200).json({
                status: 'Success',
                message: 'Logged In Successfully',
                data: {
                    applicant,
                    token: sessionToken
                }
            })
        } else {
            return res.status(200).json({
                status: 'Success',
                message: 'New User',
                data: {
                    applicant,
                    token: sessionToken
                }
            })
        }

    } catch (err) {
        console.log(err)
        return err;
    }

}

const apply = async (req, res) => {
    try {

        let { firstName, lastName, email, address, dob, university, cgpa, course, file, image, user_id } = req.body
        if (!user_id) {
            return res.status(401).json({
                status: 'Failed',
                message: 'Please login',
            })
        }
        const findApplication = await db.any(queries.findApplicationByEmail, [email]);
        console.log(findApplication)
        if (findApplication.length > 0) {
            return res.status(400).json({
                status: 'Failed',
                message: 'User already applied'
            })
        }
        try {
            const application = await db.any(queries.registerApplication, [firstName, lastName, email, dob, address, university, course, cgpa, file, image, user_id])
            let status = null;
            let batch = await db.any(queries.getCurrentBatch);
            let batch_id = batch[0].max.slice(batch[0].max.indexOf('E'), batch[0].max.indexOf('0') + 1)
            await db.any(queries.registerApplicationStatus, [email, status, batch_id]);
            return res.status(201).json({
                status: 'Success',
                message: 'Application Successful',
                data: application
            })
        } catch (error) {
            return res.status(400).json({
                status: 'Failed',
                message: 'Something went wrong'
            })
        }
    } catch (error) {
        console.log(error)
        return error;
    }
}
const dashboardPic = async (req, res) => {
    try {
        let email = req.body.email
        const profilepic = await db.any(queries.getProfilePic, [email])
        const status = await db.any(queries.getStatus, [email])
        return res.status(200).json({
            statud: 'Success',
            data: profilepic,
            applicantStatus: status
        })
    } catch (error) {
        console.log(error)
        return error
    }
}

const updateAssessmentStatus = async (req, res) => {
    try {
        let email = req.body.email
        const status = await db.any(` UPDATE
        application_data
        SET
        taken_assessment = ${true}
        WHERE
        email = '${email}'
        RETURNING taken_assessment;`)
        return res.json({
            taken_assessment: status
        })
    } catch (error) {
        console.log(error)
    }
}

const getAssessment = async (req, res) => {
    try {
        const assessment = await db.any(queries.getAssessment);
        res.json({
            quiz: assessment
        })
    } catch (error) {
        console.log(error)
        return error
    }
}
const getTime = async (req, res) => {
    try {
        const time = await db.any(queries.getTime);
        res.json({
            time: time
        })
    } catch (error) {
        console.log(error)
        return error
    }
}

const setScore = async (req, res) => {
    console.log(req.body)
    try {
        let { result, user } = req.body;
        await db.any(`UPDATE
        application_status
        SET
        test_score = ${result}
        WHERE
        applicant_id = '${user}'`)
        res.json({
            message: 'Score Updated'
        })
    } catch (error) {
        console.log(error)
        return error
    }
}
module.exports = {
    signup,
    login,
    apply,
    dashboardPic,
    updateAssessmentStatus,
    getAssessment,
    setScore,
    getTime
}