import { fetchWrapper } from "../utils/fetchWrapper.js";
import { sendMessage } from "../utils/sendMessage.js";
import Ping from "ping";
const url = process.env.URL;
const host = process.env.PC_IP;

export const restartPc = async (msg) => {
  try {
    const isAlive = await new Promise((r) => Ping.sys.probe(host, r));
    if (!isAlive) {
      sendMessage("PC is turned off 💀", msg);
    } else {
      const resp = await fetchWrapper(`${url}/1337/restart`);
      if (!resp.ok) throw new Error("Cannot turn OFF PC");
      sendMessage("Restarting PC... 🔄", msg);
    }
  } catch ({ message }) {
    sendMessage(message, msg);
  }
};
