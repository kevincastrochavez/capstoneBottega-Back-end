const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");

dotenv.config({ path: "./config.env" });
const app = express();

app.use(morgan("dev"));
app.use(express.json());

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

const getAllUsers = (req, res) => {
  res.status(200).json({
    status: "success",
    results: products.length,
    data: {},
  });
};

const createUser = (req, res) => {
  res.status(200).json({
    status: "success",
    results: products.length,
    data: {},
  });
};

const getUser = (req, res) => {
  res.status(200).json({
    status: "success",
    results: products.length,
    data: {},
  });
};

const updateUser = (req, res) => {
  res.status(200).json({
    status: "success",
    results: products.length,
    data: {},
  });
};

const productRouter = express.Router();
const userRouter = express.Router();

productRouter.route("/").get(getAllProducts);

userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/:id").get(getUser).patch(updateUser);

app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);

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
