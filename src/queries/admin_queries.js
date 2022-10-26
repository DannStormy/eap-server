const queries = {
    getAllApplications: `
            SELECT 
                * 
            FROM 
                application_data 
            LEFT JOIN 
                application_status 
            ON 
                email = application_status.applicant_id
    `,
    findByEmail: `SELECT email FROM admin WHERE email = $1;`,
    getAdminByEmail: `SELECT email, password FROM admin WHERE email = $1`,
    getAdminDetails: `SELECT * FROM admin WHERE email = $1`,
    getAllQuestions: `SELECT * FROM assessment`,
    createApplication: `
    INSERT INTO 
        current_edition(batch_id, date, instructions, questions, time)
    VALUES
        ($1, $2, $3, $4, $5)
    RETURNING *;
    `,
    getAdminDashboardDetails: `
        SELECT count(*) FROM application_status;
    `,
    getCurrentBatch: `SELECT max(batch_id) FROM application_status;`,
    getCurrentBatchCount: `SELECT count(*) FROM application_status WHERE batch_id = $1`,
    getUpdates: `SELECT * FROM current_edition`,
    getApprovedCount: `SELECT count(*) FROM application_status WHERE status = true;`,
    getClosureDate: `SELECT date FROM current_edition ORDER BY date DESC LIMIT 1`,
    getAllAssessments: `SELECT * FROM assessment`,
    composeAssessment: `INSERT into assessment (docs, time) VALUES ($1, $2) RETURNING *`
}

module.exports = queries;