const { bot } = require("../config");
const chatId = process.env.CHAT_ID;

exports.deleteMessage = (msg) => {
  bot.deleteMessage(chatId, msg.message_id);
};
