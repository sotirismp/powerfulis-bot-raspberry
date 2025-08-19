import Ping from "ping";

import { HOST, URL } from "../config.js";
import { fetchWrapper } from "../utils/fetchWrapper.js";
import { sendMessage } from "../utils/sendMessage.js";

export const turnOffPc = async (msg) => {
  try {
    const isAlive = await new Promise((r) => Ping.sys.probe(HOST, r));
    if (!isAlive) {
      sendMessage("PC is already turned off ✅", msg);
    } else {
      const resp = await fetchWrapper(`${URL}/1337/off`);
      if (!resp.ok) throw new Error("Cannot turn OFF PC");
      sendMessage("Turning PC OFF 💤", msg);
    }
  } catch ({ message }) {
    sendMessage(message, msg);
  }
};
