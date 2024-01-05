import dotenv from "dotenv";
dotenv.config();
const token = process.env.TOKEN;
import TelegramBot from "node-telegram-bot-api";
import app from "./server/index.js";

export const bot = new TelegramBot(token, { polling: true });

bot.setMyCommands([
  {
    command: "start",
    description: "Check the commands of the bot",
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
  {
    command: "photo",
    description: "Take photo from webcam",
  },
  {
    command: "yt",
    description: "Download mp3 from YT with URL",
  },
]);

export const options = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "Turn ON PC ⚡", callback_data: "on" },
        { text: "Turn OFF PC ⛔", callback_data: "off" },
      ],
      [
        { text: "Photo 📸", callback_data: "photo" },
        { text: "Ping 🏓", callback_data: "ping" },
      ],
      [{ text: "YouTube 🔴", callback_data: "yt" }],
    ],
  }),
};

export const getOpts = (msg) => {
  return {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
  };
};
