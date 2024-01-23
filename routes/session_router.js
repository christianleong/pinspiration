const express = require("express");
const router = express.Router();
const db = require("../db/index");
const bcrypt = require("bcrypt"); 

// render login page
router.get("/login", (req, res) => {
  res.render("login");
});

// render sign up page
router.get("/signup", (req, res) => {
  res.render("signup");
});

// parse sign up details, hash the password, save details and hashed password into db
router.post("/signup", (req, res) => {
  let inputUsername = req.body.username
  let inputEmail = req.body.email;
  let inputPassword = req.body.password;
  const saltRound = 10;

  const sql = `
  SELECT * FROM users
  WHERE email = $1;
  `

  db.query(sql, [inputEmail], (err, result) => {
    if (err) {
      console.log(err);
    } 

    console.log(result.rows)
  });

  bcrypt.genSalt(saltRound, (err, salt) => {
  
    bcrypt.hash(inputPassword, salt, (err, hashedPass) => {

      const sql = `
      INSERT INTO users
      (username, email, password_encrypt)
      VALUES
      ($1, $2, $3)
      RETURNING id
      `;

      db.query(sql, [inputUsername, inputEmail, inputPassword], (err, result) => {

        if (err) {
          console.log(err)
        }
        console.log('user added')
        console.log(result.rows)
        res.render('login')
      });

    })

  })

});

module.exports = router;
