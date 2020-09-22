// const fs = require("fs");
const Product = require("../models/productModel");
const factory = require("./handleFactory");

// const products = JSON.parse(
//   fs.readFileSync(`${__dirname}/../data/products.json`)
// );

exports.getAllProducts = factory.getAll(Product);

exports.getProductById = factory.getOne(Product);
