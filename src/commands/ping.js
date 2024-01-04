import { sendMessage } from "../utils/sendMessage.js";
import { fetchWrapper } from "../utils/fetchWrapper.js";
const url = process.env.URL;

export const ping = async (msg) => {
  try {
    const resp = await fetchWrapper(`${url}/1337/ping`);
    sendMessage("Pong", msg);
  } catch (err) {
    sendMessage(err.message === "fetch failed" ? "Offline" : err.message, msg);
  }
};
