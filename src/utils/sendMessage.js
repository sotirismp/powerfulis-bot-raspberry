const { bot, getOpts } = require("../config");
const chatId = process.env.CHAT_ID;

exports.sendMessage = (message, msg) => {
  msg ? bot.editMessageText(message, getOpts(msg)) : bot.sendMessage(chatId, message);
};
