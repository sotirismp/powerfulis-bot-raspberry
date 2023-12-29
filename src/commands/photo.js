const { bot, webcam, getOpts } = require("../config");
const chatId = Number(process.env.CHAT_ID);

const fileOptions = {
  filename: Date.now().toString(),
  contentType: "image/jpeg",
};

exports.photo = async (msg) => {
  msg ? bot.editMessageText(`Sending...`, getOpts(msg)) : bot.sendMessage(chatId, "Sending...");
  webcam.capture("test_picture", async function (err, data) {
    if (data) msg ? await bot.sendPhoto(chatId, data, {}, fileOptions) : bot.sendPhoto(chatId, data, {}, fileOptions);
  });
};
