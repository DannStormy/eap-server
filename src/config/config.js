const dotenv = require('dotenv');
const pg = require('pg-promise');
const promise = require('bluebird');

dotenv.config()
// const DB_URL = process.env.DB_URL
const pgp = pg({ promiseLib: promise, noLocking: true });
// const db = pgp(String(DB_URL));
const db = pgp(process.env.DB_URL);

// const cn = {
//     connectionString: process.env.DB_URL,
//     max: 30
// };

// const db = pgp(cn);


module.exports = db
