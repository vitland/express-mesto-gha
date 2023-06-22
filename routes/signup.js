const router = require("express").Router();
const { Joi, celebrate } = require("celebrate");
const { createUser } = require("../controllers/users");

router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().uri()
    }),
  }),
  createUser
);
module.exports = router;
