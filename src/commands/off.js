import { fetchWrapper } from "../utils/fetchWrapper.js";
import { sendMessage } from "../utils/sendMessage.js";
const url = process.env.URL;

export const turnOffPc = async (msg) => {
  try {
    const resp = await fetchWrapper(`${url}/1337/off`);
    if (!resp.ok) throw new Error("Cannot turn OFF PC");
    sendMessage("Turning PC OFF", msg);
  } catch ({ message }) {
    sendMessage(message, msg);
  }
};
