import dotenv from "dotenv";
dotenv.config();

import { bot, CHAT_ID, getOpts } from "../config.js";

export const sendMessage = (message, msg) => {
  return msg ? bot.editMessageText(message, getOpts(msg)) : bot.sendMessage(CHAT_ID, message);
};
