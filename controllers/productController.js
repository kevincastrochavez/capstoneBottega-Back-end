const fs = require("fs");

const products = JSON.parse(fs.readFileSync("./products.json"));

exports.getAllProducts = (req, res) => {
  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
};
