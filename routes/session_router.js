const express = require("express");
const router = express.Router();
const db = require("../db/index");
const bcrypt = require("bcrypt"); 

// render login page
router.get("/login", (req, res) => {
  res.render("login");
});

// parse login details, check if username/email exist and compare unhashed password against inputPassword
router.post("/login", (req, res) => {
  let inputUsernameEmail = req.body.username_email;
  let inputPassword = req.body.password;
  const checkUserQuery = `
    SELECT * FROM users 
    WHERE username = $1 OR email = $1`;

  db.query(checkUserQuery, [inputUsernameEmail], (err, result) => {
    if (err) {
      console.log(err);
      res.render('login')
      return
    }

    // check if user exist
    if (result.rows.length === 0) {
      res.send('User does not exist, please sign up')
      return;
    }

    const hashedPass = result.rows[0].password_encrypt

    bcrypt.compare(inputPassword, hashedPass, (err, isPasswordCorrect) => {
      if (!isPasswordCorrect) {
        res.send('Incorrect password')
        return;
      }
      req.session.userId = result.rows[0].id;
      res.redirect('/pin')
    });
  });
})

// render sign up page
router.get("/signup", (req, res) => {
  res.render("signup");
});

// parse sign up details, hash the password, save details and hashed password into db
router.post("/signup", (req, res) => {
  let inputUsername = req.body.username;
  let inputEmail = req.body.email;
  let inputPassword = req.body.password;
  const saltRound = 10;
  const checkEmailQuery = `SELECT * FROM users WHERE email = $1;`;
  const checkUsernameQuery = `SELECT * FROM users WHERE username = $1;`;

  // check if username has already been chosen
  db.query(checkUsernameQuery, [inputUsername], (err, result) => {
    if (err) {
      console.log(err);
      res.render("signup");
      return;
    }

    if (result.rows.length > 0) {
      res.send("This username is already being used, please choose a new one.");
      return;
    }

    // check if email address already exists in db
    db.query(checkEmailQuery, [inputEmail], (err, result) => {
      if (err) {
        console.log(err);
        res.render("signup");
        return;
      }
    
      if (result.rows.length > 0) {
        res.send("Email address already exists");
        return;
      }

      // if email address and username don't already exist, then proceed to hash password and store details in db
      bcrypt.genSalt(saltRound, (err, salt) => {
        bcrypt.hash(inputPassword, salt, (err, hashedPass) => {
          const sql = `
          INSERT INTO users
          (username, email, password_encrypt)
          VALUES
          ($1, $2, $3)
          RETURNING id;
        `;
  
          db.query(
            sql,
            [inputUsername, inputEmail, hashedPass],
            (err, result) => {
              if (err) {
                console.log(err);
                res.render("signup");
                return;
              }
              req.session.userId = result.rows[0].id;
              res.redirect("/pin");
            }
          );
        });
      });    
    });
  });
});

// log the user out and reset userId to null
router.delete("/logout", (req, res) => {
  req.session.userId = null
  res.redirect("/")
})

// this feature is not done yet
router.get("/forgotpassword", (req, res) => {
  res.render("forgot_password")
})

module.exports = router;