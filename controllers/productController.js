const fs = require("fs");
const catchAsync = require("../catchAsync");

const products = JSON.parse(fs.readFileSync("./products.json"));

exports.getAllProducts = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});
