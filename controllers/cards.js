const Card = require("../models/card");
const {NotFoundError, ForbiddenError} = require("../utils/errors");

module.exports.getCards = (req, res, next) => {
  console.log(req.user._id)
  Card.find({})
    .then((cards) => {
      return res.send({ data: cards });
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {

  Card.findOneAndDelete({ _id: req.params.cardId, owner:req.user._id })
    .then((card) => {
      if (!card) {
        throw new ForbiddenError("Вы не может удалить карту");
      }
      return res.send({ data: card });
    })
    .catch(next);
};

module.exports.addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Запрашиваемая карта не найдена");
      }
      return res.send({ data: card });
    })
    .catch(next);
};

module.exports.removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Запрашиваемая карта не найдена");
      }
      return res.send({ data: card });
    })
    .catch(next);
};
