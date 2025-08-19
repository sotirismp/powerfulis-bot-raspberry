import Ping from "ping";

import { HOST, URL } from "../config.js";
import { fetchWrapper } from "../utils/fetchWrapper.js";
import { sendMessage } from "../utils/sendMessage.js";

export const restartPc = async (msg) => {
  try {
    const isAlive = await new Promise((r) => Ping.sys.probe(HOST, r));
    if (!isAlive) {
      sendMessage("PC is turned off 💀", msg);
    } else {
      const resp = await fetchWrapper(`${URL}/1337/restart`);
      if (!resp.ok) throw new Error("Cannot turn OFF PC");
      sendMessage("Restarting PC... 🔄", msg);
    }
  } catch ({ message }) {
    sendMessage(message, msg);
  }
};
