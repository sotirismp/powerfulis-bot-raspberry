const { bot, getOpts } = require("../config");
const chatId = Number(process.env.CHAT_ID);

exports.flip = (msg) => {
  const result = Math.floor(Math.random() * 2) ? "Heads" : "Tails";
  msg ? bot.editMessageText(result, getOpts(msg)) : bot.sendMessage(chatId, result);
};
