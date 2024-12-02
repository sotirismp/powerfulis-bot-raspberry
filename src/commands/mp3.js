import ytdl from "@distube/ytdl-core";
import { sendMessage } from "../utils/sendMessage.js";
import { Transform } from "stream";
import { sendAudio } from "../utils/sendAudio.js";
import { addMessage } from "../utils/RequestQueue.js";
import { mode, changeMode } from "../../index.js";

export const mp3 = async (text, msg) => {
  try {
    const { type } = mode;

    let buffer = [];
    let ytURL = text.split(" ")[type === "command" ? 1 : 0];

    if (!ytURL) {
      changeMode({ type: "listening", module: "/yt" });
      return await sendMessage(`Enter a YouTube URL. 🔴\nWaiting... ⏳`, msg);
    }

    const message = await sendMessage(`Searching for the song... 🔎`);
    const {
      videoDetails: {
        title,
        author: { name },
      },
    } = await ytdl.getBasicInfo(ytURL);

    if (!title || !name) throw new Error("Cannot find the video ❌");

    addMessage(`Video found, downloading... ⬇️`, message);

    const my_transform = new Transform({
      transform(chunk, encoding, callback) {
        callback(null, chunk);
      },
    });

    my_transform.on("end", async () => {
      var totalBuffer = Buffer.concat(buffer);
      addMessage(`Sending to you... ➡️`, message);
      await sendAudio(totalBuffer, { title, name });
      addMessage(`Send. ✅`, message);
      changeMode({ type: "command" });
    });

    my_transform.on("data", (buf) => {
      buffer.push(buf);
    });

    ytdl(ytURL, { format: "mp3", filter: "audioonly" }).pipe(my_transform);
  } catch ({ message }) {
    addMessage(message);
    changeMode({ type: "command" });
  }
};
