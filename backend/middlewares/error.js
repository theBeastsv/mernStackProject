class ErrorHandller extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "INternal Server error";
  err.statusCode = err.statusCode || 500;

  if (err.name === "CaseError") {
    const message = `Resource not found. Invalid ${err.path} `;
    err = new errorHandller(message, 400);
  }
  if (err.name === 11000) {
    const message = `Duplicate. Invalid ${Object.keys(err.keyValue)} Entered `;
    err = new errorHandller(message, 400);
  }
  if (err.name === "JsonWebTokenError") {
    const message = `Json web token is invalid `;
    err = new errorHandller(message, 400);
  }
  if (err.name === "TokenExpiredError") {
    const message = `Json web token is expired please try again `;
    err = new errorHandller(message, 400);
  }
  return res.status(statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorHandller;
