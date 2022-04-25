const router = require("express").Router(),
  db = require("./database");

let accounts = db.accounts;

router.get("/accounts", async (req, res) => {
  res.status(200).json(accounts.account);
});

module.exports = router;
