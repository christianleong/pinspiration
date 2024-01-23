const express = require("express");
const router = express.Router();
const db = require("../db/index");

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

router.get("/pin/:id", (req, res) => {

    pin_ID = req.params.id;
    
    const sql = `SELECT * FROM pins WHERE id = $1`

    db.query(sql, [pin_ID], (err, result) => {
        let pinInfo = result.rows[0];
        console.log(pinInfo);
        res.render("info", { pinInfo: pinInfo });
    })

})

module.exports = router;