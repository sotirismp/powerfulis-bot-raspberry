import Ping from "ping";
import { exec } from "child_process";

import { sendMessage } from "../utils/sendMessage.js";
import { HOST, SH_PATH } from "../config.js";

export const turnOnPc = async (msg) => {
  try {
    const isAlive = await new Promise((r) => Ping.sys.probe(HOST, r));
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
