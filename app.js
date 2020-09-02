const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");

const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productsRoutes");

dotenv.config({ path: "./config.env" });
const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);

app.all("*", (req, res, next) => {
  const err = new Error(`Can not find ${req.originalUrl} on this server!`);
  err.status = "fail";
  err.statusCode = 404;

  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

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

module.exports = app;
