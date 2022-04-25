const router = require("express").Router(),
  db = require("./database.js"),
  passport = require("passport");

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.send(req.user);
  }
);

router.get("/alluser", (req, res) => res.json(db.users.users));

module.exports = router;
