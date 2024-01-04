import { fetchWrapper } from "../utils/fetchWrapper.js";
import { sendMessage } from "../utils/sendMessage.js";
import Ping from "ping";
const url = process.env.URL;
const host = process.env.PC_IP;

export const turnOffPc = async (msg) => {
  try {
    const isAlive = await new Promise((r) => Ping.sys.probe(host, r));
    if (!isAlive) {
      sendMessage("PC is already turned off ✅", msg);
    } else {
      const resp = await fetchWrapper(`${url}/1337/off`);
      if (!resp.ok) throw new Error("Cannot turn OFF PC");
      sendMessage("Turning PC OFF 💤", msg);
    }
  } catch ({ message }) {
    sendMessage(message, msg);
  }
};
