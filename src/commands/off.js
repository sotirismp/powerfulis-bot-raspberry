const { bot } = require("../config");
const chatId = process.env.CHAT_ID;

exports.turnOffPc = () => {
  bot.sendMessage(+chatId, "Turning PC OFF");
};
