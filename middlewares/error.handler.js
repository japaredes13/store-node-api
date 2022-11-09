const { stack } = require("../routes/productsRouter");

function logErrors(err, req, res, next) {
  console.log('ejecutando logError....');
  console.log(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  console.log('ejecutando errorHandler....');
  res.status(500).json({
    message : err.message,
    stack : err.stack
  });
}

module.exports = { logErrors, errorHandler}
