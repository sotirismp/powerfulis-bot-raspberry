import { sendMessage } from "../utils/sendMessage.js";
import { exec } from "child_process";
import Ping from "ping";
const SH_PATH = process.env.SH_PATH;
const host = process.env.PC_IP;

export const turnOnPc = async (msg) => {
  try {
    const isAlive = await new Promise((r) => Ping.sys.probe(host, r));
    if (isAlive) {
      sendMessage("PC is already turned on ✅", msg);
    } else {
      exec(`sudo ${SH_PATH}/s.sh`);
      sendMessage("Turning PC ON 🚀", msg);
    }
  } catch ({ message }) {
    sendMessage(message, msg);
  }
};
