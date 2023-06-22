const router = require("express").Router();
const { Joi, celebrate } = require("celebrate");
const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
} = require("../controllers/cards");

router.get("/", getCards);
router.post(
  "/",
  celebrate({
    body: Joi.object().keys({ name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri() }),
  }),
  createCard
);
router.delete("/:cardId", deleteCard);
router.put("/:cardId/likes", addLike);
router.delete("/:cardId/likes", removeLike);

module.exports = router;
