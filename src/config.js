import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";

dotenv.config();
const TOKEN = process.env.TOKEN;
export const URL = `http://${process.env.PC_IP}:9996`;
export const SH_PATH = process.env.SH_PATH;
export const HOST = process.env.PC_IP;
export const OWNER = process.env.OWNER;
export const CHAT_ID = Number(process.env.CHAT_ID);

export const bot = new TelegramBot(TOKEN, { polling: true });

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
    command: "restart",
    description: "Restarts the PC",
  },
  {
    command: "photo",
    description: "Take photo from webcam",
  },
]);

export const options = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "Turn ON PC ⚡", callback_data: "on" },
        { text: "Turn OFF PC ⛔", callback_data: "off" },
        { text: "Reboot PC 🔄", callback_data: "restart" },
      ],
      [
        { text: "Photo 📸", callback_data: "photo" },
        { text: "Ping 🏓", callback_data: "ping" },
      ],
    ],
  }),
};

export const getOpts = (msg) => {
  return {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
  };
};
