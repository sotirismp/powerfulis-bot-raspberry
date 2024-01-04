const { bot } = require("../config");
const { deleteMessage } = require("../utils/deleteMessage");
const chatId = Number(process.env.CHAT_ID);

exports.dice = async (msg) => {
  await bot.sendDice(chatId);
  if (msg) deleteMessage(msg);
};
