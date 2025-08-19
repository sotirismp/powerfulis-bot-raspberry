import { sendPhoto } from "../utils/sendPhoto.js";
import { sendMessage } from "../utils/sendMessage.js";
import { fetchWrapper } from "../utils/fetchWrapper.js";
import { URL } from "../config.js";

export const photo = async (msg) => {
  try {
    await sendMessage("Sending... ⏳", msg);
    const resp = await fetchWrapper(`${URL}/1337/photo`, 10000);
    const buffer = Buffer.from(await (await resp.blob()).arrayBuffer());
    if (buffer) await sendPhoto(buffer, msg);
  } catch (err) {
    sendMessage(err.message, msg);
  }
};
