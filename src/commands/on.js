const { bot } = require("../config");
const chatId = Number(process.env.CHAT_ID);

exports.turnOnPc = () => {
  bot.sendMessage(chatId, "Turning PC ON");
};
