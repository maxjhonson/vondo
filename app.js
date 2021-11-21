const express = require("express");
const morgan = require("morgan");
const tourRoutes = require("./routes/tourRoutes");
const AppError = require("./utils/AppError");
const app = express();
const globalErrorHandler = require("./controllers/errorController");
app.use(morgan("dev"));
app.use(express.json());

app.use("/tours", tourRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this Server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
