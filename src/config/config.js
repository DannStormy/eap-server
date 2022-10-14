const dotenv = require('dotenv');
const pg = require('pg-promise');
const promise = require('bluebird');

dotenv.config()
const pgp = pg({ promiseLib: promise, noLocking: true });
const db = pgp(process.env.DB_URL);

module.exports = db
