const { sendMessage } = require("../utils/sendMessage");
const url = process.env.URL;

exports.turnOffPc = async (msg) => {
  try {
    const resp = await fetch(`${url}/1337/off`);
    if (!resp.ok) throw new Error("Cannot turn OFF PC");
    sendMessage("Turning PC OFF", msg);
  } catch ({ message }) {
    sendMessage(message, msg);
  }
};
