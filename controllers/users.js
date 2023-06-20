const bcrypt = require("bcryptjs"); // импортируем bcrypt
const User = require("../models/user");
const NotFoundError = require("../utils/errors");
const { handleErrors } = require("../utils/errors");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => handleErrors(err, res));
};

module.exports.getUser = (req, res) => {
  const { id } = req.params;
  User.findOne({ _id: id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Запрашиваемый пользователь не найден");
      }
      return res.send({ data: user });
    })
    .catch((err) => handleErrors(err, res));
};

module.exports.createUser = (req, res) => {
  const { name, avatar, about, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((password) => {
      return User.create({ name, avatar, about, email, password});
    })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => handleErrors(err, res));
};

module.exports.updateUserInfo = (req, res) => {
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Запрашиваемый пользователь не найден");
      }
      return res.send({ data: user });
    })
    .catch((err) => handleErrors(err, res));
};

module.exports.updateUserAvatar = (req, res) => {
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Запрашиваемый пользователь не найден");
      }
      return res.send({ data: user });
    })
    .catch((err) => handleErrors(err, res));
};
