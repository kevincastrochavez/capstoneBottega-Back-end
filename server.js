const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception");
  console.log(err.name, err.message);

  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

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
const server = app.listen(port, () => {
  console.log(`Server started at port:${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection");
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
