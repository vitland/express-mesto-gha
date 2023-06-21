const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const { errorsHandler } = require("./utils/errorsHandler");
const { PORT = 3000 } = process.env;
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/mestodb", {
    useNewUrlParser: true,
    autoIndex: true,
  })
  .then((res) => console.log("mongo UP"))
  .catch((err) => console.log(err));

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
app.use(router);
app.use(errorsHandler)

app.listen(PORT, () => {
  console.log(`Сревер запущен на ${PORT} порту`);
});
