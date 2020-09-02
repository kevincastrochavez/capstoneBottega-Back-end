const app = require("./app");

const port = 5000;
app.listen(port, () => {
  console.log(`Server started at port:${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection");
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
