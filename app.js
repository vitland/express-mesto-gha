const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes');
const { errorsHandler } = require('./errors/errorsHandler');

const { PORT } = require('./config');
const { DB_LINK } = require('./config');

const app = express();

mongoose
  .connect(DB_LINK, {
    useNewUrlParser: true,
    autoIndex: true,
  })
  .then(() => console.log('mongo UP'))
  .catch((err) => console.log(err));

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
app.use(router);
// celebrate обработчик ошибок
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`Сревер запущен на ${PORT} порту`);
});
