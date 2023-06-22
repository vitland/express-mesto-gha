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
class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = "ForbiddenError";
    this.statusCode = 403;
  }
}

module.exports = { LoginError, NotFoundError, ForbiddenError };
