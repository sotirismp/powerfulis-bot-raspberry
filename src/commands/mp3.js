import ytdl from "@distube/ytdl-core";
import { sendMessage } from "../utils/sendMessage.js";
import { Transform } from "stream";
import { sendAudio } from "../utils/sendAudio.js";
import { addMessage } from "../utils/RequestQueue.js";
import { mode, changeMode } from "../../index.js";

export const mp3 = async (text, msg) => {
  try {
    const { type } = mode;
    let maxContent = 0;
    let maxBitrate = 0;
    let buffer = [];
    let currentIndex = 0;
    const portions = 10;
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
      formats,
    } = await ytdl.getBasicInfo(ytURL);

    formats
      .filter((item) => item?.mimeType.startsWith(`audio`))
      .map(({ contentLength, bitrate }) => {
        if (bitrate > maxBitrate) {
          maxContent = Number(contentLength);
          maxBitrate = bitrate;
        }
      });

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

    let i = 1;
    const chunk = maxContent / portions;
    let percentage = chunk * i;
    my_transform.on("data", async (buf) => {
      buffer.push(buf);
      currentIndex += Buffer.byteLength(buf);
      if (currentIndex >= percentage && i <= portions) {
        let str = "";
        for (let j = 1; j <= i; j++) str += "🟦";
        for (let j = 1; j <= portions - i; j++) str += "⬜";
        addMessage(`Downloading ⬇️\n ${str}`, message);
        i++;
        percentage = chunk * i;
      }
    });
    ytdl(ytURL, { format: "mp3", filter: "audioonly" }).pipe(my_transform);
  } catch ({ message }) {
    addMessage(message);
    changeMode({ type: "command" });
  }
};
