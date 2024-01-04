const { fetchWrapper } = require("../utils/fetchWrapper");
const { sendMessage } = require("../utils/sendMessage");
var exec = require("child_process").exec;
const url = process.env.URL;

exports.ping = async (msg) => {
  try {
    const resp = await fetchWrapper(`${url}/1337/ping`);
    sendMessage("Pong", msg);
  } catch (err) {
    sendMessage(err.message === "fetch failed" ? "Offline" : err.message, msg);
  }
};
