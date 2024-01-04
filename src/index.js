const { bot } = require("./config");
const { ping } = require("./commands/ping");
const { turnOnPc } = require("./commands/on");
const { turnOffPc } = require("./commands/off");
const { flip } = require("./commands/flip");
const { roll } = require("./commands/roll");
const { dice } = require("./commands/dice");
const { screen } = require("./commands/screen");
const { photo } = require("./commands/photo");
const { start } = require("./commands/start");
const { isMessageExpired } = require("./utils/isMessageExpired");

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
    case "/flip":
      flip();
      break;
    case "/roll":
      roll();
      break;
    case "/dice":
      dice();
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
    case "/screen1":
      screen(0);
      break;
    case "/screen2":
      screen(1);
      break;
    default:
      bot.sendMessage(id, "Unknown command");
  }
});

bot.on("callback_query", async function onCallbackQuery(callbackQuery) {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  if (action === "photo") photo(msg);
  if (action === "screen1") screen(0, msg);
  if (action === "screen2") screen(1, msg);
  if (action === "flip") flip(msg);
  if (action === "roll") roll(msg);
  if (action === "dice") dice(msg);
  if (action === "ping") ping(msg);
  if (action === "on") turnOnPc(msg);
  if (action === "off") turnOffPc(msg);
});

bot.on("polling_error", (error) => {
  // console.log(error.code); // => 'EFATAL'
});
