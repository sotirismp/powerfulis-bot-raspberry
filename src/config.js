const dotenv = require("dotenv");
dotenv.config();
const TelegramBot = require("node-telegram-bot-api");
const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.setMyCommands([
  {
    command: "ping",
    description: "Check if PC is ON",
  },
  {
    command: "on",
    description: "Turns ON the PC",
  },
  {
    command: "off",
    description: "Turns OFF the PC",
  },
  {
    command: "photo",
    description: "Take photo from webcam",
  },
]);

const options = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "Turn ON PC", callback_data: "on" },
        { text: "Turn OFF PC", callback_data: "off" },
      ],
      [
        { text: "Photo", callback_data: "photo" },
        { text: "Ping", callback_data: "ping" },
      ],
    ],
  }),
};

const getOpts = (msg) => {
  return {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
  };
};

exports.getOpts = getOpts;
exports.options = options;
exports.bot = bot;
