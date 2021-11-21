require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT;
const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Db running");
  });

const server = app.listen(PORT, () => {
  console.log("Server running");
});

process.on("unhandledRejection", (err) => {
  console.log("dddd", err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
