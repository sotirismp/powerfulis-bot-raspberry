const { sendMessage } = require("../utils/sendMessage");

exports.flip = (msg) => {
  const result = Math.floor(Math.random() * 2) ? "Heads" : "Tails";
  sendMessage(result, msg);
};
