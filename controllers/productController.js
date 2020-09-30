const Product = require("../models/productModel");
const factory = require("./handleFactory");

exports.getAllProducts = factory.getAll(Product);
exports.getProductById = factory.getOne(Product);
