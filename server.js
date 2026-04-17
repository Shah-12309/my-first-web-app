const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let customers = [];

app.get("/customers", (req, res) => {
  res.json(customers);
});

app.post("/customers", (req, res) => {
  const newCustomer = {
    id: Date.now(),
    name: req.body.name
  };

  customers.push(newCustomer);
  res.json(newCustomer);
});

app.delete("/customers/:id", (req, res) => {
  customers = customers.filter(c => c.id != req.params.id);
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});