const express = require("express");
const router = express.Router();
const db = require("../db/index");
const ensureLoggedIn = require("../middlewares/ensure_logged_in");

// get into index page displaying all the images
router.get("/pin", (req, res) => {
    
    if (req.query.q) {
        let keyword = req.query.q

        const sql = `
        SELECT * FROM pins
        WHERE LOWER(title) LIKE LOWER('%' || $1 || '%');`

        db.query(sql, [keyword], (err, result) => {
            if (err) {
                console.log(err);
            }
            let pins = result.rows
            res.render("index", { pins: pins });
            return
        })
    }

    const sql = `SELECT * FROM pins;`
    
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        let pins = result.rows
        res.render("index", {pins: pins})
        return
    })
});

// get into info page displaying details of the image
router.get("/pin/:id", (req, res) => {

    let pin_ID = req.params.id;

    const sql = `
    SELECT * FROM users
    INNER JOIN pins
        ON users.id = pins.user_id 
    WHERE pins.id = $1;`;

    db.query(sql, [pin_ID], (err, result) => {
        let pinInfo = result.rows[0];
        res.render("info", { pinInfo: pinInfo, pin_ID: pin_ID });
    })
})

// show edit info page
router.get("/pin/:id/edit", (req, res) => {

    let pin_ID = req.params.id;

    const sql = `
    SELECT * FROM users
    INNER JOIN pins
        ON users.id = pins.user_id 
    WHERE pins.id = $1;`;

    db.query(sql, [pin_ID], (err, result) => {
        let pinInfo = result.rows[0];
        res.render("edit", { pinInfo: pinInfo, pin_ID: pin_ID });
    });

})

// update info page and db
router.put("/pin/:id", (req, res) => {
    let title = req.body.title
    let description = req.body.description
    let pin_ID = req.params.id
    
    const sql = `
        UPDATE pins
        SET title=$1,
            description=$2
        WHERE id=$3;`;

    db.query(sql, [title, description, pin_ID], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.redirect(`/pin/${pin_ID}`)
    });

});

// delete pin from index page and db
router.delete("/pin/:id", (req, res) => {
    let pin_ID = req.params.id

    const sql = `
    DELETE FROM pins
    WHERE id = $1;`

    db.query(sql, [pin_ID], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/pin')
    })

});

// get into the create page
router.get("/create", ensureLoggedIn,(req, res) => {
    res.render("create")
})

// create a new post
router.post("/pin", (req, res) => {
    let title = req.body.title
    let description = req.body.description
    let imageURL = req.body.image_url
    let userId = req.session.userId

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