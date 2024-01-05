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
import { mp3 } from "./src/commands/mp3.js";

const OWNER = process.env.OWNER;
const chatId = Number(process.env.CHAT_ID);

export let mode = {
  type: "command",
  module: "",
};

export const changeMode = (newMode) => {
  mode = { ...newMode };
};

bot.on("message", async (msg) => {
  const { text, chat, from, date } = msg;
  if (isMessageExpired(date)) return;
  if (from.username !== OWNER) return await bot.sendMessage(id, `I'm sorry, you don't have permissions 😟`);
  if (chatId !== chat.id) return;

  if (mode.type === "command") {
    if (!text.startsWith("/")) return await sendMessage(`I'm listening to commands. \ntype /start and check my commands`);
    const command = text.split(" ")[0];
    if (command === "/start") return start();
    if (command === "/ping") return ping();
    if (command === "/on") return turnOnPc();
    if (command === "/off") return turnOffPc();
    if (command === "/photo") return photo();
    if (command === "/yt") return mp3(text);
    bot.sendMessage(id, "Unknown command");
  } else if (mode.type === "listening") {
    if (mode.module === "/yt") return mp3(text);
  }
});

bot.on("callback_query", async function onCallbackQuery(callbackQuery) {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  if (action === "photo") photo(msg);
  if (action === "ping") ping(msg);
  if (action === "on") turnOnPc(msg);
  if (action === "off") turnOffPc(msg);
  if (action === "yt") mp3("", msg);
});

bot.on("polling_error", (error) => {
  // console.log(error.code); // => 'EFATAL'
});
