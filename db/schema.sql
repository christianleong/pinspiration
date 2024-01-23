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
image_url TEXT,
user_id INTEGER
);

\dt

SELECT * FROM users;
SELECT * FROM pins;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS pins;

INSERT INTO pins
    (title, image_url, user_id)
VALUES
    ('PANTONE COLOR OF THE YEAR 2017', 
    'https://i.pinimg.com/564x/8b/59/6e/8b596e7cb0babff9e72717c6da802e06.jpg',
    1);

INSERT INTO pins
    (title, image_url, user_id)
VALUES
    ('abstract', 
    'https://i.pinimg.com/564x/38/82/84/388284695feed6940587f33c848da25a.jpg',
    2);

INSERT INTO pins
    (title, image_url, user_id)
VALUES
    ('black and white', 
    'https://i.pinimg.com/564x/af/ad/19/afad1986f94cd7307f0ba7b676aee21b.jpg',
    1);

INSERT INTO users
    (username, email, password_encrypt)
VALUES
    ('christianleong', 
    'christianleong@gmail.com',
    '123pass');