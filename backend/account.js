const router = require("express").Router(),
  db = require("./database");

let accounts = db.accounts.account;

router.get("/accounts/:skip/:take", async (req, res) => {
  const { skip, take } = req.params;
  const limit = take > accounts.length ? accounts.length : take;
  const response = [];
  for (let index = +skip; index < limit; index++) {
    response.push(accounts[index]);
  }
  let revenue = 0;
  let expenses = 0;
  for (const account of accounts) {
    if (account.type === "add") {
      revenue += account.value;
    } else {
      expenses += account.value;
    }
  }
  res
    .status(200)
    .json({ items: response, totalItems: accounts.length, revenue, expenses });
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
  const { name, transactionDate, description, value, type } = req.body;
  if (!name || !transactionDate || !description || !value || !type) {
    res.status(400).json({ message: "invalid data" });
  }
  const account = {
    id: accounts.length + 1,
    name,
    transactionDate,
    description,
    value,
    type,
  };
  accounts.push(account);
  res.status(200).json(account);
});

router.put("/account/:id", async (req, res) => {
  const { id } = req.params;
  const { name, transactionDate, description, value, type } = req.body;
  let account = accounts[+id - 1];
  if (name) {
    account.name = name;
  }
  if (transactionDate) {
    account.transactionDate = transactionDate;
  }
  if (description) {
    account.description = description;
  }
  if (value) {
    account.value = +value;
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
