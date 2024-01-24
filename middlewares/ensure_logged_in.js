function ensureLoggedIn(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.render("login_required")
  }
}

module.exports = ensureLoggedIn;