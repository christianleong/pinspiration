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
    
    const sql = `
    SELECT * FROM pins
    INNER JOIN users
        ON pins.user_id = users.id
    WHERE pins.id = $1;`

    console.log(sql)

    db.query(sql, [pin_ID], (err, result) => {
        let pinInfo = result.rows[0];
        console.log(result)
        // console.log(pinInfo);
        res.render("info", { pinInfo: pinInfo, pin_ID: pin_ID });
    })
})

// get into the create page
router.get("/create", ensureLoggedIn,(req, res) => {
    res.render("create")
})

// post a new pin
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