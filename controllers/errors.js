module.exports = class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFound";
    this.statusCode = 404;
  }
};

module.exports.handleErrors = (err, res) => {
  if (err.name === "NotFound") {
    return res.status(404).send({ message: err.message });
  }
  if (err.name === "ValidationError") {
    return res.status(400).send({ message: err.message });
  }
  if (err.name === "CastError") {
    return res.status(400).send({ message: err.message });
  }
  res.status(500).send({ message: err.message });
};
