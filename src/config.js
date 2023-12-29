const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");
dotenv.config();

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.setMyCommands([
  {
    command: "ping",
    description: "Checks if PC is ON",
  },
  {
    command: "flip",
    description: "Flips a coin",
  },
  {
    command: "roll",
    description: "Rolls a dice",
  },
  {
    command: "on",
    description: "Turns ON the PC",
  },
  {
    command: "off",
    description: "Turns OFF the PC",
  },
]);

exports.bot = bot;
