const router = require("express").Router();
const { signin } = require("../controllers/users");
const { celebrate, Joi } = require("celebrate");

router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  signin
);
module.exports = router;
