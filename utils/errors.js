class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFound";
    this.statusCode = 404;
  }
}
class LoginError extends Error {
  constructor(message) {
    super(message);
    this.name = "LoginError";
    this.statusCode = 401;
  }
}

handleErrors = (err, res) => {
  console.log(err);
  if (err.name === "NotFound") {
    return res.status(err.statusCode).send({ message: err.message });
  }
  if (err.name === "LoginError") {
    return res.status(err.statusCode).send({ message: err.message });
  }
  if (err.name === "ValidationError") {
    return res.status(400).send({ message: err.message });
  }
  if (err.name === "CastError") {
    return res.status(400).send({ message: err.message });
  }
  return res.status(500).send({ message: err.message });
};

module.exports = { handleErrors, LoginError, NotFoundError };
