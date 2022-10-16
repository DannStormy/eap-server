const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');


require('dotenv').config()

const applicantRoute = require('./src/routes/applicant_route');


const app = express();
const port = process.env.PORT;

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']

}));


app.use(applicantRoute);

app.listen(port, () => {
    console.log(`Application running on  port ${port}`);
})