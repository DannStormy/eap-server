CREATE TABLE applicants (
    id SERIAL PRIMARY KEY NOT NULL,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    email VARCHAR NOT NULL,
    phone VARCHAR,
    password VARCHAR
);