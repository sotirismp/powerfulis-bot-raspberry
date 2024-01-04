const { sendMessage } = require("../utils/sendMessage");
const { exec } = require("child_process");

exports.turnOnPc = (msg) => {
  try {
    exec(`sudo ${__dirname}/s.sh`);
    sendMessage("Turning PC ON", msg);
  } catch ({ message }) {
    sendMessage(message, msg);
  }
};
