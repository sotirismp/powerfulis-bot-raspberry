import { sendPhoto } from "../utils/sendPhoto.js";
import { sendMessage } from "../utils/sendMessage.js";
import { fetchWrapper } from "../utils/fetchWrapper.js";

const url = process.env.URL;

export const photo = async (msg) => {
  try {
    sendMessage("Sending...", msg);
    const resp = await fetchWrapper(`${url}/1337/photo`, 10000);
    const buffer = Buffer.from(await (await resp.blob()).arrayBuffer());
    if (buffer) sendPhoto(buffer, msg);
  } catch (err) {
    sendMessage(err.message, msg);
  }
};
