import { bot, options } from "../config.js";
const chatId = Number(process.env.CHAT_ID);

export const start = () => {
  bot.sendMessage(chatId, "Choose one of the following commands: ✅", options);
};
