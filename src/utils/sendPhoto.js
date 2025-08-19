import { bot, CHAT_ID } from "../config.js";

const fileOptions = {
  filename: Date.now().toString(),
  contentType: "image/png",
};

export const sendPhoto = async (buffer, msg) => {
  msg ? await bot.sendPhoto(CHAT_ID, buffer, {}, fileOptions) : bot.sendPhoto(CHAT_ID, buffer, {}, fileOptions);
};
