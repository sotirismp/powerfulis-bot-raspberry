import dotenv from "dotenv";
dotenv.config();
import { bot } from "../config.js";
const chatId = process.env.CHAT_ID;

export const sendAudio = (buffer, { title, name }) =>
  bot.sendAudio(
    chatId,
    buffer,
    {
      title: `${title}`,
      performer: `${name}`,
    },
    { filename: `${title}.mp3`, contentType: "audio/mpeg3" }
  );
