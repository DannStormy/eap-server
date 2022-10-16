CREATE TABLE application_data (
    id SERIAL PRIMARY KEY NOT NULL,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    email VARCHAR NOT NULL,
    dob VARCHAR,
    address VARCHAR,
    university VARCHAR,
    course VARCHAR,
    cgpa VARCHAR(50),
    cv VARCHAR,
    profilepic VARCHAR,
    applicant_id VARCHAR NOT NULL references applicants(email)
);