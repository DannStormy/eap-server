const queries = {
    registerApplicant: `
            INSERT INTO applicants (firstname, lastname, email, phone, password)
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *;
    `,
    findByEmail: `SELECT email FROM applicants WHERE email = $1;`,
    getApplicantByEmail: `SELECT * FROM applicants WHERE email = $1`,

}

module.exports = queries;