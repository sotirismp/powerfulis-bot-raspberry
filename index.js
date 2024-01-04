import { bot } from "./src/config.js";
import { ping } from "./src/commands/ping.js";
import { turnOnPc } from "./src/commands/on.js";
import { turnOffPc } from "./src/commands/off.js";
import { photo } from "./src/commands/photo.js";
import { start } from "./src/commands/start.js";
import { isMessageExpired } from "./src/utils/isMessageExpired.js";

const OWNER = process.env.OWNER;
const chatId = Number(process.env.CHAT_ID);

bot.on("message", async ({ text, chat: { id, ...rest2 }, from, date, ...rest }) => {
  if (isMessageExpired(date)) return;
  if (chatId !== id) return;
  if (from.username !== OWNER) return;
  if (!text.startsWith("/")) return bot.sendMessage(chatId, `I'm listening to commands. \ntype /start and check my commands`);

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
