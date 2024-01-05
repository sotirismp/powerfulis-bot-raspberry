import express from "express";
import { sendMessage } from "../utils/sendMessage.js";
import { start } from "../commands/start.js";
const PORT = 2999;
const app = express();

app.get("/", async (req, res) => {
  try {
    await sendMessage("PC turned on 🚀");
    await start();
    res.send();
  } catch ({ message }) {
    sendMessage(message);
  }
});

app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`));

export default app;
