const { bot } = require("../config");
const { options } = require("../config");
const chatId = Number(process.env.CHAT_ID);

exports.start = () => {
  bot.sendMessage(chatId, "Choose one of the following commands:", options);
};
