const TelegramApi = require("node-telegram-bot-api");

require("dotenv").config();

const TOKEN = process.env.TOKEN;

const bot = new TelegramApi(TOKEN, { polling: true });

bot.setMyCommands([
  { command: "/start", description: "Start using the Viking Training Bot" },
]);

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  switch (text) {
    case "/start":
      bot.sendMessage(
        chatId,
        `Hello, ${msg.from.first_name} ${msg.from.last_name}! Click «Start exercising», choose a muscle group and start work!`
      );
      break;
    default:
      bot.sendMessage(chatId, "I don’t understand you. Choose some command!");
      break;
  }
});
