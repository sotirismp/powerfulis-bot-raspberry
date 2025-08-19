import Ping from "ping";

import { HOST } from "../config.js";
import { sendMessage } from "../utils/sendMessage.js";

export const ping = async (msg) => {
  try {
    await sendMessage("Checking... ⏳", msg);
    const isAlive = await new Promise((r) => Ping.sys.probe(HOST, r));
    await sendMessage(isAlive ? "Pong 🏓" : "Offline", msg);
  } catch ({ message }) {
    sendMessage(message, msg);
  }
};
