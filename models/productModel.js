const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: Number,
  category: String,
  picture: String,
  disccount: Number,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
