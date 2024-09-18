const Product = require("../models/products");

const handleGetAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
};

const handleGetProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.find({ _id: id });
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

const handleAddProduct = async (req, res) => {
  const product = req.body;
  try {
    const newProduct = new Product(product);
    await newProduct.save();

    // For multiple products
    //   product.map(async (element) => {
    //     const newProduct = new Product(element);
    //     await newProduct.save();
    //   });

    res.status(201).send("Product created successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  handleAddProduct,
  handleGetAllProducts,
  handleGetProductById,
};
