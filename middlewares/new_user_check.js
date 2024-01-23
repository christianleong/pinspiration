function newUserCheck(req, res, next) {

    const sql = `SELECT * FROM users;`

    db.query(sql, (err, result) => {
        if (err)
    })


//   if (req.session.userId) {
//     next();
//   } else {
//     res.send("sorry please logged in first");
//   }
}

module.exports = ensureLoggedIn;
