const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");

dotenv.config({ path: "./config.env" });
const app = express();

const products = JSON.parse(fs.readFileSync("./products.json"));

const getAllProducts = (req, res) => {
  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
};

app.route("/api/v1/products").get(getAllProducts);

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Succesful Connection"));

const port = 5000;
app.listen(port, () => {
  console.log(`Server started at port:${port}`);
});
