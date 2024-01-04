import dotenv from "dotenv";
dotenv.config();
import { bot, getOpts } from "../config.js";
const chatId = process.env.CHAT_ID;

export const sendMessage = (message, msg) => {
  return msg ? bot.editMessageText(message, getOpts(msg)) : bot.sendMessage(chatId, message);
};
