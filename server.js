const fs = require("fs");
const express = require("express");

const app = express();

const products = JSON.parse(fs.readFileSync("./products.json"));

app.get("/api/v1/products", (req, res) => {
  res.send(products);
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server started at port:${port}`);
});
