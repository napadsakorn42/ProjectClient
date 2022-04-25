const router = require("express").Router(),
  db = require("./database");

let accounts = db.accounts.account;

router.get("/accounts", async (req, res) => {
  res.status(200).json(accounts);
});

router.get("/account/:id", async (req, res) => {
  const { id } = req.params;
  const response = accounts.find((item) => item.id === +id);
  if (!response) {
    res.status(404).json({ message: "accout not found" });
  }
  res.status(200).json(response);
});

router.post("/account", async (req, res) => {
  const { name, date, description, value, type } = req.body;
  if (!name || !date || !description || !value || !type) {
    res.status(400).json({ message: "invalid data" });
  }
  const account = {
    id: accounts.length + 1,
    name,
    date,
    description,
    value,
    type,
  };
  accounts.push(account);
  res.status(200).json(account);
});

router.put("/account/:id", async (req, res) => {
  const { id } = req.params;
  const { name, date, description, value, type } = req.body;
  let account = accounts[+id - 1];
  if (name) {
    account.name = name;
  }
  if (date) {
    account.date = date;
  }
  if (description) {
    account.description = description;
  }
  if (value) {
    account.value = value;
  }
  if (type) {
    account.type = type;
  }

  res.status(200).json(account);
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
