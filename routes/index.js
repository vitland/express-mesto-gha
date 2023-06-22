const auth = require('../middlewares/auth');

const router = require('express').Router()
router.use("/signup", require("./signup"));
router.use("/signin", require("./signin"));
router.use(auth)
router.use("/users", require("./users"));
router.use("/cards", require("./cards"));
router
.use((req, res, next) => {
  return res.status(404).send({ message: "Страница не найдена" });
});
module.exports = router