import { bot } from "../config.js";
const chatId = process.env.CHAT_ID;

export const deleteMessage = (msg) => {
  bot.deleteMessage(chatId, msg.message_id);
};
