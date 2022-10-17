const queries = {
        registerApplicant: `
            INSERT INTO applicants (firstname, lastname, email, phone, password)
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *;
    `,
        registerApplication: `
            INSERT INTO application_data (firstname, lastname, email, dob, address, university, course, cgpa, cv, profilepic, applicant_id, applied)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING *;
    `,
        findByEmail: `SELECT email FROM applicants WHERE email = $1;`,
        findApplicationByEmail: `SELECT email, applied FROM application_data WHERE email = $1`,
        getApplicantByEmail: `SELECT email, password FROM applicants WHERE email = $1`,
        getProfilePic: `SELECT firstname, lastname, email, profilepic, date(created_at), applied FROM application_data WHERE email = $1`

}

module.exports = queries;