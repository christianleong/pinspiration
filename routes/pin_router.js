const express = require("express");
const router = express.Router();
const db = require("../db/index");

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

    pin_ID = req.params.id;
    
    const sql = `SELECT * FROM pins WHERE id = $1`

    db.query(sql, [pin_ID], (err, result) => {
        let pinInfo = result.rows[0];
        console.log(pinInfo);
        res.render("info", { pinInfo: pinInfo });
    })
})

// get into the create page
router.get("/create", (req, res) => {
    res.render("create")
})

// post a new pin
router.post("/pin", (req, res) => {
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

    db.query(insertImageQuery, [title, description, imageURL, userId], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.redirect("/pin")
    });

})

module.exports = router;