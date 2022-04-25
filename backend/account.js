const router = require("express").Router(),
  db = require("./database");

let accounts = db.accounts.account;

router.get("/accounts", async (req, res) => {
  res.status(200).json(accounts);
});

router.get("/account/:id", async (req, res) => {
  const { id } = req.params;
  console.log(accounts);
  const response = accounts.find((item) => item.id === +id);
  if (!response) {
    res.status(404).json({ message: "accout not found" });
  }
  res.status(200).json(response);
});

router.delete("/account/:id", async (req, res) => {
  const { id } = req.params;
  const findAccount = accounts.find((item) => item.id === +id);
  if (!findAccount) {
    res.status(404).json({ message: "accout not found" });
  }
  const deleted = accounts.filter((item) => item.id !== +id);
  accounts = [...new Set(deleted)];
  res.status(200).json({ message: "delete suceeded" });
});

module.exports = router;
