const { bot } = require("../config");
const chatId = Number(process.env.CHAT_ID);

exports.flip = () => {
  const result = Math.floor(Math.random() * 2) ? "Heads" : "Tails";
  bot.sendMessage(chatId, result);
};
