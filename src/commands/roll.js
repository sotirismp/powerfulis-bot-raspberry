const { bot, getOpts } = require("../config");
const chatId = Number(process.env.CHAT_ID);

exports.roll = (msg) => {
  const result = Math.floor(Math.random() * 101);
  msg ? bot.editMessageText(result, getOpts(msg)) : bot.sendMessage(chatId, result);
};
