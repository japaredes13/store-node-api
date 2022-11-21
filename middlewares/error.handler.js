const { ValidationError } = require("sequelize");

function logErrors(err, req, res, next) {
  console.log('ejecutando logError....!!');
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


function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

function ormErrorHandler(err, req, res, next){
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode : 409,
      message : err.name,
      errors : err.errors
    })
  }
}

module.exports = { logErrors, ormErrorHandler, errorHandler, boomErrorHandler}
