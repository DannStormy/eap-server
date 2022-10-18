const queries = {
    getAllApplications: `
            SELECT * FROM application_data
    `,
    findByEmail: `SELECT email FROM admin WHERE email = $1;`,
    getAdminByEmail: `SELECT email, password FROM admin WHERE email = $1`,
    getAdminDetails: `SELECT * FROM admin WHERE email = $1`
}

module.exports = queries;