import dotenv from "dotenv";
dotenv.config();
import { bot } from "./src/config.js";
import { ping } from "./src/commands/ping.js";
import { turnOnPc } from "./src/commands/on.js";
import { turnOffPc } from "./src/commands/off.js";
import { photo } from "./src/commands/photo.js";
import { start } from "./src/commands/start.js";
import { isMessageExpired } from "./src/utils/isMessageExpired.js";
import { sendMessage } from "./src/utils/sendMessage.js";

const OWNER = process.env.OWNER;
const chatId = Number(process.env.CHAT_ID);

bot.on("message", async ({ text, chat: { id }, from, date }) => {
  if (isMessageExpired(date)) return;
  if (from.username !== OWNER) return await sendMessage(`I'm sorry, you don't have permissions 😟`);
  if (chatId !== id) return;
  if (!text.startsWith("/")) return await sendMessage(`I'm listening to commands. \ntype /start and check my commands`);

  switch (text) {
    case "/start":
      start();
      break;
    case "/ping":
      ping();
      break;
    case "/on":
      turnOnPc();
      break;
    case "/off":
      turnOffPc();
      break;
    case "/photo":
      photo();
      break;
    default:
      bot.sendMessage(id, "Unknown command");
  }
});

bot.on("callback_query", async function onCallbackQuery(callbackQuery) {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  if (action === "photo") photo(msg);
  if (action === "ping") ping(msg);
  if (action === "on") turnOnPc(msg);
  if (action === "off") turnOffPc(msg);
});

bot.on("polling_error", (error) => {
  // console.log(error.code); // => 'EFATAL'
});
