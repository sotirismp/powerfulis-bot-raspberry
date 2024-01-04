const { bot } = require("../config");
const chatId = process.env.CHAT_ID;

const fileOptions = {
  filename: Date.now().toString(),
  contentType: "image/png",
};

exports.sendPhoto = async (buffer, msg) => {
  msg ? await bot.sendPhoto(chatId, buffer, {}, fileOptions) : bot.sendPhoto(chatId, buffer, {}, fileOptions);
};
