require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");

const app = express();
const PORT = process.env.PORT;
const User = require("./routes/user");
const Product = require("./routes/product");
const Payment = require("./routes/stripe");

// Middleware
app.use(express.json());
app.use(cors());

// Connection with DB
connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// Routes
app.use("/user", User);
app.use("/products", Product);
app.use("/checkout", Payment);
