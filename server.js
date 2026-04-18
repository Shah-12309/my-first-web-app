const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

/* 🔗 CONNECT MONGODB */
mongoose.connect("mongodb+srv://admin:1234@cloudaws.5aqskkm.mongodb.net/?appName=CloudAWS/mydb")
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));

/* 📦 SCHEMA */
const CustomerSchema = new mongoose.Schema({
  name: String
});

const Customer = mongoose.model("Customer", CustomerSchema);

/* GET */
app.get("/customers", async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});

/* POST */
app.post("/customers", async (req, res) => {
  const newCustomer = new Customer({
    name: req.body.name
  });

  await newCustomer.save();
  res.json(newCustomer);
});

/* PUT */
app.put("/customers/:id", async (req, res) => {
  const updated = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  res.json(updated);
});

/* DELETE */
app.delete("/customers/:id", async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});