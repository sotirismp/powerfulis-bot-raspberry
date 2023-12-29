const { bot } = require("../config");
const chatId = Number(process.env.CHAT_ID);

exports.dice = async (msg) => {
  await bot.sendDice(chatId);
  if (msg) bot.deleteMessage(chatId, msg.message_id);
};
