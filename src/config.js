const dotenv = require("dotenv");
dotenv.config();
const TelegramBot = require("node-telegram-bot-api");
const NodeWebcam = require("node-webcam");
const chatId = Number(process.env.CHAT_ID);
const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.sendMessage(chatId, `PC turned ON.\nType /start and check the commands.`);

bot.setMyCommands([
  {
    command: "start",
    description: "Show the menu",
  },
  {
    command: "photo",
    description: "Take photo from webcam",
  },
  {
    command: "screen1",
    description: "Screenshot screen 1 on PC",
  },
  {
    command: "screen2",
    description: "Screenshot screen 2 on PC",
  },
  {
    command: "flip",
    description: "Flip a coin",
  },
  {
    command: "roll",
    description: "Roll a number from 0 to 100",
  },
  {
    command: "dice",
    description: "Roll a dice",
  },
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
]);

const options = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "Photo", callback_data: "photo" },
        { text: "Screen1", callback_data: "screen1" },
        { text: "Screen2", callback_data: "screen2" },
      ],
      [
        { text: "Flip", callback_data: "flip" },
        { text: "Roll", callback_data: "roll" },
        { text: "Dice", callback_data: "dice" },
      ],
      [
        { text: "Ping", callback_data: "ping" },
        { text: "Turn ON", callback_data: "on" },
        { text: "Turn OFF", callback_data: "off" },
      ],
    ],
  }),
};

const webcamOpts = {
  width: 1280,
  height: 720,
  quality: 100,
  frames: 60,
  delay: 0,
  output: "jpeg",
  device: false,
  callbackReturn: "buffer",
  verbose: false,
};

const Webcam = NodeWebcam.create(webcamOpts);

const getOpts = (msg) => {
  return {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
  };
};

exports.getOpts = getOpts;
exports.webcam = Webcam;
exports.options = options;
exports.bot = bot;
