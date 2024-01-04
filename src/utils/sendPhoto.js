import { bot } from "../config.js";
const chatId = process.env.CHAT_ID;

const fileOptions = {
  filename: Date.now().toString(),
  contentType: "image/png",
};

export const sendPhoto = async (buffer, msg) => {
  msg ? await bot.sendPhoto(chatId, buffer, {}, fileOptions) : bot.sendPhoto(chatId, buffer, {}, fileOptions);
};
