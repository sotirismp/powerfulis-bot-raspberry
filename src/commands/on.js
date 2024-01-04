const { sendMessage } = require("../utils/sendMessage");
const { exec } = require("child_process");
const SH_PATH = process.env.CHAT_ID;

exports.turnOnPc = (msg) => {
  try {
    exec(`sudo ${SH_PATH}/s.sh`);
    sendMessage("Turning PC ON", msg);
  } catch ({ message }) {
    sendMessage(message, msg);
  }
};
