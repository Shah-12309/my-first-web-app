const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// ✅ MongoDB connection (YOUR STRING HERE)
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log("MongoDB ERROR ❌:", err.message));

// ✅ Schema
const customerSchema = new mongoose.Schema({
  name: String
});

const Customer = mongoose.model("Customer", customerSchema);

// ✅ GET all customers
app.get("/customers", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ✅ ADD customer
app.post("/customers", async (req, res) => {
  try {
    const newCustomer = new Customer({ name: req.body.name });
    await newCustomer.save();
    res.json(newCustomer);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ✅ UPDATE customer
app.put("/customers/:id", async (req, res) => {
  try {
    const updated = await Customer.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ✅ DELETE customer
app.delete("/customers/:id", async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.send("Deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ✅ Show index.html on root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});