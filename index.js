import dotenv from "dotenv";
import * as path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });
import { bot, CHAT_ID, OWNER } from "./src/config.js";
import { ping } from "./src/commands/ping.js";
import { turnOnPc } from "./src/commands/on.js";
import { turnOffPc } from "./src/commands/off.js";
import { photo } from "./src/commands/photo.js";
import { start } from "./src/commands/start.js";
import { isMessageExpired } from "./src/utils/isMessageExpired.js";
import { sendMessage } from "./src/utils/sendMessage.js";
import { restartPc } from "./src/commands/restart.js";

bot.on("message", async (msg) => {
  const { text, chat, from, date } = msg;
  if (isMessageExpired(date)) return;
  if (from.username !== OWNER) return await bot.sendMessage(id, `I'm sorry, you don't have permissions 😟`);
  if (CHAT_ID !== chat.id) return;

  if (!text.startsWith("/")) return await sendMessage(`I'm listening to commands. \ntype /start and check my commands`);
  const command = text.split(" ")[0];
  if (command === "/start") return start();
  if (command === "/ping") return ping();
  if (command === "/on") return turnOnPc();
  if (command === "/off") return turnOffPc();
  if (command === "/restart") return restartPc();
  if (command === "/photo") return photo();
  bot.sendMessage(chat.id, "Unknown command");
});

bot.on("callback_query", ({ data, message }) => {
  if (data === "photo") photo(message);
  if (data === "ping") ping(message);
  if (data === "on") turnOnPc(message);
  if (data === "off") turnOffPc(message);
  if (data === "restart") restartPc(message);
});
