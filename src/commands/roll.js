const { bot, getOpts } = require("../config");
const { sendMessage } = require("../utils/sendMessage");
const chatId = Number(process.env.CHAT_ID);

exports.roll = (msg) => {
  const result = Math.floor(Math.random() * 101);
  sendMessage(result, msg);
};
