const { sendMessage } = require("../utils/sendMessage");
const { sendPhoto } = require("../utils/sendPhoto");
const url = process.env.URL;

exports.screen = async (screenId, msg) => {
  try {
    sendMessage("Sending...", msg);
    const resp = await fetch(`${url}/1337/screenshot?screen=${screenId}`);
    if (resp.status === 400) throw new Error("There is not such a Screen");
    const buffer = Buffer.from(await (await resp.blob()).arrayBuffer());
    if (buffer) sendPhoto(buffer, msg);
  } catch ({ message }) {
    sendMessage(message, msg);
  }
};
