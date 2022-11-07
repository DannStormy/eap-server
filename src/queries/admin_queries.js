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
    getApplicantsByBatch: `
            SELECT
                *
            FROM
                application_data
                LEFT JOIN application_status ON email = application_status.applicant_id
            WHERE
                batch_id = $1
    `,
    findByEmail: `SELECT email FROM admin WHERE email = $1;`,
    getAdminByEmail: `SELECT email, password FROM admin WHERE email = $1`,
    getAdminDetails: `SELECT * FROM admin WHERE email = $1`,
    getAllQuestions: `SELECT * FROM assessment`,
    createApplication: `
    INSERT INTO 
        current_edition(batch_id, date, instructions, questions, time, closed, running)
    VALUES
        ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `,
    getAdminDashboardDetails: `
        SELECT count(*) FROM application_status;
    `,
    createAdmin: `
    INSERT INTO 
        admin(name, email, country, address, profilepic, phone)
    VALUES
        ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `,
    getCurrentBatch: `SELECT batch_id FROM current_edition WHERE running = true`,
    getCurrentBatchCount: `SELECT count(*) FROM application_status WHERE batch_id = $1`,
    getAllBatches: `SELECT batch_id from current_edition`,
    getUpdates: `SELECT * FROM current_edition`,
    getApprovedCount: `SELECT count(*) FROM application_status WHERE status = true;`,
    getClosureDate: `SELECT date FROM current_edition WHERE running = true`,
    updateApplicationClosure: `UPDATE current_edition SET closed = $1, running = $2 WHERE running = true`,
    getAllAssessments: `SELECT * FROM assessment`,
    composeAssessment: `INSERT into assessment (docs, time) VALUES ($1, $2) RETURNING *`
}

module.exports = queries;