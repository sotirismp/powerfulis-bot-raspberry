const { bot } = require("../config");
const screenshot = require("screenshot-desktop");
const chatId = process.env.CHAT_ID;

const fileOptions = {
  filename: Date.now().toString(),
  contentType: "image/jpeg",
};

exports.screen = async (screenId, msg) => {
  const resp = await screenshot.listDisplays();
  if (!resp[screenId]?.id) return msg ? bot.editMessageText("There is not such a Screen", opts) : null;

  if (msg) {
    const opts = {
      chat_id: msg.chat.id,
      message_id: msg.message_id,
    };
    bot.editMessageText(`Sending...`, opts);
    const data = await screenshot({ format: "jpg", screen: resp[screenId].id });
    await bot.sendPhoto(chatId, data, {}, fileOptions);
  } else {
    await bot.sendMessage(chatId, "Sending...");
    const data = await screenshot({ format: "jpg", screen: resp[screenId].id });
    bot.sendPhoto(chatId, data, {}, fileOptions);
  }
};
