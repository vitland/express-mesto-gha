const Card = require("../models/card");
const NotFoundError = require("../utils/errors");
const { handleErrors } = require("../utils/errors");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      return res.status(200).send({ data: cards });
    })
    .catch((err) => handleErrors(err, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => handleErrors(err, res));
};

module.exports.deleteCard = (req, res) => {
  Card.findOneAndDelete({ _id: req.params.cardId })
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Запрашиваемая карта не найдена");
      }
      return res.status(200).send({ data: card });
    })
    .catch((err) => handleErrors(err, res));
};

module.exports.addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Запрашиваемая карта не найдена");
      }
      return res.status(200).send({ data: card });
    })
    .catch((err) => handleErrors(err, res));
};

module.exports.removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Запрашиваемая карта не найдена");
      }
      return res.status(200).send({ data: card });
    })
    .catch((err) => handleErrors(err, res));
};
