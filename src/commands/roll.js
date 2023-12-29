const { bot } = require("../config");
const chatId = Number(process.env.CHAT_ID);

exports.roll = () => {
  bot.sendDice(chatId);
};
