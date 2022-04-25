const router = require("express").Router(),
  db = require("./database");

let accounts = db.accounts;

router.get("/accounts", async (req, res) => {
  res.status(200).json(accounts.account);
});

router.get("/account/:id", async (req, res) => {
  const { id } = req.params;
  const response = accounts.account.find((item) => item.id === +id);
  res.status(200).json(response);
});

module.exports = router;
