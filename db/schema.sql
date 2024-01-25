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

SELECT * FROM users
INNER JOIN pins
    ON users.id = pins.user_id
WHERE pins.id = 2;

SELECT * FROM pins
WHERE LOWER(title) LIKE LOWER('%$1%');