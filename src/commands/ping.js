const { bot, options, getOpts } = require("../config");
const chatId = Number(process.env.CHAT_ID);

exports.ping = (msg) => {
  msg ? bot.editMessageText("Pong!", getOpts(msg)) : bot.sendMessage(chatId, "Pong!");
};
