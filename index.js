const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');


require('dotenv').config()

const adminRoute = require('./src/routes/admin_route');
const applicantRoute = require('./src/routes/applicant_route');


const app = express();
const port = process.env.PORT;

app.use(fileUpload());
// app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));
// app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']

}));
//origin:*

app.use(adminRoute);
app.use(applicantRoute);

app.listen(port, () => {
    console.log(`Application running on  port ${port}`);
})