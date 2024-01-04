import { sendMessage } from "../utils/sendMessage.js";
import { exec } from "child_process";
const SH_PATH = process.env.CHAT_ID;

export const turnOnPc = (msg) => {
  try {
    exec(`sudo ${SH_PATH}/s.sh`);
    sendMessage("Turning PC ON", msg);
  } catch ({ message }) {
    sendMessage(message, msg);
  }
};
