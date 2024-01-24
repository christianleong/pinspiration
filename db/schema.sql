CREATE DATABASE pinspiration;

\c pinspiration

CREATE TABLE IF NOT EXISTS users(
id SERIAL PRIMARY KEY,
username TEXT,
email TEXT,
password_encrypt TEXT
);

CREATE TABLE IF NOT EXISTS pins(
id SERIAL PRIMARY KEY,
title TEXT,
description TEXT,
image_url TEXT,
user_id INTEGER
);

\dt

SELECT * FROM users;
SELECT * FROM pins;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS pins;

INSERT INTO pins
    (title, description, image_url, user_id)
VALUES
    ('PANTONE COLOR OF THE YEAR 2017',
    'image1', 
    'https://i.pinimg.com/564x/8b/59/6e/8b596e7cb0babff9e72717c6da802e06.jpg',
    1);

INSERT INTO pins
    (title, description, image_url, user_id)
VALUES
    ('abstract',
    'image2', 
    'https://i.pinimg.com/564x/38/82/84/388284695feed6940587f33c848da25a.jpg',
    1);

INSERT INTO users
    (username, email, password_encrypt)
VALUES
    ('christianleong', 
    'christianleong@gmail.com',
    '123pass');

SELECT *
FROM pins
INNER JOIN users
    ON pins.user_id = users.id;
-- WHERE condition(s)
-- ORDER BY column, … ASC/DESC
-- LIMIT num_limit OFFSET num_offset;

SELECT * FROM users
    INNER JOIN pins
        ON users.id = pins.user_id
    WHERE pins.id = 2;