const TelegramApi = require("node-telegram-bot-api");

require("dotenv").config();

const TOKEN = process.env.TOKEN;

const bot = new TelegramApi(TOKEN, { polling: true });

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Hello, friend!");
});
