const mongoose = require("mongoose");
const isUrl = require("validator/lib/isURL");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Поле "name" должно быть заполнено'],
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
    },
    about: {
      type: String,
      required: [true, 'Поле "about" должно быть заполнено'],
      minlength: [2, 'Минимальная длина поля "about" - 2'],
      maxlength: [30, 'Максимальная длина поля "about" - 30'],
    },
    avatar: {
      type: String,
      validate: {
        validator: (s) => isUrl(s),
        message: "Некорректный URL",
      },
      required: true,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("user", userSchema);
