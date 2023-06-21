errorsHandler = (err, req, res, next) => {
  console.log(err.statusCode, err.message);
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

module.exports = { errorsHandler };
