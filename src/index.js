const { bot } = require("./config");
const { turnOnPc } = require("./commands/on");
const { turnOffPc } = require("./commands/off");
const { flip } = require("./commands/flip");
const { roll } = require("./commands/roll");

const OWNER = process.env.OWNER;
const chatId = Number(process.env.CHAT_ID);

bot.on("message", async ({ text, chat: { id, ...rest2 }, from, ...rest }) => {
  if (chatId !== id) return;
  if (from.username !== OWNER) return;

  if (text === "/ping") bot.sendMessage(id, "Pong!");
  if (text === "/flip") flip();
  if (text === "/roll") roll();
  if (text === "/on") turnOnPc();
  if (text === "/off") turnOffPc();
});
