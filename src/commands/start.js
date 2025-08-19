import { bot, CHAT_ID, options } from "../config.js";

export const start = async () => {
  await bot.sendMessage(CHAT_ID, "Choose one of the following commands: ✅", options);
};
