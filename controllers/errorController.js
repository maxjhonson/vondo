const AppError = require("../utils/AppError");

module.exports = (err, req, res, next) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  //   const handleCastErrorDb = err=>{
  //       const message = `Invalid`
  //       return new AppError(message, 404)
  //   }

  if (process.env.NODE_ENV === "develoment") {
    res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  } else {
    //if(err.name === 'CastError') err = handleCastErrrorDB(err);
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message,
      });
    } else {
      console.log("Error", err);
      res.status(500).json({
        status: "error",
        message: "Something went very wrong!",
      });
    }
  }
};
