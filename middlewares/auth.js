const jwt = require("jsonwebtoken");
const { LoginError } = require("../utils/errors");

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new LoginError("Нужна авторизация");
  }

  let payload;

  try {
    payload = jwt.verify(token, "secret");
  } catch (error) {
    throw new LoginError("Нужна авторизация");
  }
  req.user = payload;
  next();
};
