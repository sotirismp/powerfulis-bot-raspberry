import ytdl from "@distube/ytdl-core";

import { sendMessage } from "../utils/sendMessage.js";
import { sendAudio } from "../utils/sendAudio.js";
import { addMessage } from "../utils/RequestQueue.js";
import { mode, changeMode } from "../../index.js";

function sanitizeFilename(title) {
  return title.replace(/[<>:"/\\|?*]+/g, "").trim(); // Remove invalid characters and trim spaces
}

export const mp3 = async (text, msg) => {
  try {
    const { type } = mode;

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

    const audioStream = ytdl(ytURL, {
      quality: "lowestaudio",
      filter: (format) => {
        return format.mimeType?.includes("audio/mp4");
      },
    });
    const bufferChunks = [];
    audioStream.on("data", (chunk) => bufferChunks.push(chunk));
    audioStream.on("end", async () => {
      try {
        const audioBuffer = Buffer.concat(bufferChunks);
        addMessage(`Sending the audio... ➡️`, message);
        await sendAudio(audioBuffer, { title: sanitizeFilename(title), name });
        addMessage(`Sent. ✅`, message);
        changeMode({ type: "command" });
      } catch (error) {
        addMessage(`Error sending audio: ${error.message}`, message);
        changeMode({ type: "command" });
      }
    });
  } catch (error) {
    addMessage(error.message);
    changeMode({ type: "command" });
  }
};
