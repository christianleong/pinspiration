const express = require("express");
const router = express.Router();
const db = require("../db/index");
const ensureLoggedIn = require("../middlewares/ensure_logged_in");

// get into index page displaying all the images
router.get("/pin", (req, res) => {
    
    const sql = `SELECT * FROM pins;`
    
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        let pins = result.rows
        res.render("index", {pins: pins})
    })
});

// get into info page displaying details of the image
router.get("/pin/:id", (req, res) => {

    let pin_ID = req.params.id;
    
    // const sql = `
    // SELECT * FROM pins
    // INNER JOIN users
    //     ON pins.user_id = users.id
    // WHERE pins.id = $1;`

    const sql = `
    SELECT * FROM users
    INNER JOIN pins
        ON users.id = pins.user_id 
    WHERE pins.id = $1;`;

    db.query(sql, [pin_ID], (err, result) => {
        let pinInfo = result.rows[0];
        // console.log(result)
        console.log(pinInfo);
        res.render("info", { pinInfo: pinInfo, pin_ID: pin_ID });
    })
})

// edit/update info page and update db
router.get("/pin/:id/edit", (req, res) => {

    let pin_ID = req.params.id;
    console.log(pin_ID)

    const sql = `
    SELECT * FROM users
    INNER JOIN pins
        ON users.id = pins.user_id 
    WHERE pins.id = $1;`;

    db.query(sql, [pin_ID], (err, result) => {
        let pinInfo = result.rows[0];
        console.log(pinInfo);
        res.render("edit", { pinInfo: pinInfo, pin_ID: pin_ID });
    });

})

// get into the create page
router.get("/create", ensureLoggedIn,(req, res) => {
    res.render("create")
})

// create a new post
router.post("/pin", (req, res) => {
    console.log(req.body)
    let title = req.body.title
    let description = req.body.description
    let imageURL = req.body.image_url
    let userId = req.session.userId
    console.log(`userId is ${userId}`)

    const insertImageQuery = `
    INSERT INTO pins
    (title, description, image_url, user_id)
    VALUES
    ($1, $2, $3, $4)
    RETURNING id;`

    console.log(insertImageQuery)

    db.query(insertImageQuery, [title, description, imageURL, userId], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.redirect("/pin")
    });

})

module.exports = router;


// {
//   id: 2,
//   username: 'christianleong',
//   email: 'christianleong@gmail.com',
//   password_encrypt: '$2b$10$m5FXJ90L3GokUCyImoXXWuq6H.46mSTRu0HzWk9xjjwCYN5w7E4vm',
//   title: 'abstract',
//   description: 'image2',
//   image_url: 'https://i.pinimg.com/564x/38/82/84/388284695feed6940587f33c848da25a.jpg',
//   user_id: 1
// }