import { sendMessage } from "../utils/sendMessage.js";
import Ping from "ping";
const url = process.env.URL;
const host = process.env.PC_IP;

export const ping = async (msg) => {
  try {
    await sendMessage("Checking... ⏳", msg);
    const isAlive = await new Promise((r) => Ping.sys.probe(host, r));
    await sendMessage(isAlive ? "Pong 🏓" : "Offline", msg);
  } catch ({ message }) {
    sendMessage(message, msg);
  }
};
