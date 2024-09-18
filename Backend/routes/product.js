const express = require("express");
const productRouter = express.Router();
const {
  handleAddProduct,
  handleGetAllProducts,
  handleGetProductById,
} = require("../controllers/product");
const admin = require("../middlewares/authorization");

// Routes

productRouter.route("/").get(handleGetAllProducts);

productRouter.route("/:id").get(handleGetProductById);

productRouter.route("/add").post(admin, handleAddProduct);

module.exports = productRouter;
