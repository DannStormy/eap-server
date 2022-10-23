const queries = {
        registerApplicant: `
            INSERT INTO applicants (firstname, lastname, email, phone, password)
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *;
    `,
        registerApplication: `
            INSERT INTO application_data (firstname, lastname, email, dob, address, university, course, cgpa, cv, profilepic, applicant_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING *;
    `,
        findByEmail: `SELECT email FROM applicants WHERE email = $1;`,
        findApplicationByEmail: `SELECT email FROM application_data WHERE email = $1`,
        getApplicantByEmail: `SELECT email, password FROM applicants WHERE email = $1`,
        getProfilePic: `SELECT 
                                firstname, lastname, email, profilepic, created_at, taken_assessment 
                        FROM 
                                application_data 
                        WHERE 
                                email = $1
                        `,
        getStatus: `SELECT status FROM application_status WHERE applicant_id = $1`,
        registerApplicationStatus: `
                INSERT INTO application_status (applicant_id, status, batch_id)
                VALUES ($1, $2, $3)
                RETURNING *;
        `,
        checkAssessmentStatus: `SELECT taken_assessment from application_data WHERE id = $1`
}

module.exports = queries;