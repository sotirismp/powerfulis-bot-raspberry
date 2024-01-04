const { fetchWrapper } = require("../utils/fetchWrapper");
const { sendMessage } = require("../utils/sendMessage");
const { sendPhoto } = require("../utils/sendPhoto");
const url = process.env.URL;

exports.photo = async (msg) => {
  try {
    sendMessage("Sending...", msg);
    const resp = await fetchWrapper(`${url}/1337/photo`, 10000);
    const buffer = Buffer.from(await (await resp.blob()).arrayBuffer());
    if (buffer) sendPhoto(buffer, msg);
  } catch (err) {
    sendMessage(err.message, msg);
  }
};
