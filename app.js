const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productsRoutes");

dotenv.config({ path: "./config.env" });
const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

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
