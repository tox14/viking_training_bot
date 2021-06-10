const TelegramApi = require("node-telegram-bot-api");

require("dotenv").config();

const TOKEN = process.env.TOKEN;

const bot = new TelegramApi(TOKEN, { polling: true });

bot.setMyCommands([
  { command: "/start", description: "Start using the Viking Training Bot" },
  {
    command: "/choosemusclegroup",
    description: "Select the muscle group you want to work on",
  },
]);

const startOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: "👊 Start exercising", callback_data: "/choosemusclegroup" }],
    ],
  }),
};

const chooseMuscleGroutOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "💪 Arms", callback_data: "arms" },
        { text: "💪 Shoulders", callback_data: "shoulders" },
      ],
      [
        { text: "💪 Chest", callback_data: "chest" },
        { text: "💪 Core", callback_data: "core" },
      ],
      [
        { text: "💪 Back", callback_data: "back" },
        { text: "💪 Legs and Glutes", callback_data: "legs_and_glutes" },
      ],
    ],
  }),
};

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  switch (text) {
    case "/start":
      bot.sendMessage(
        chatId,
        `Hello, ${msg.from.first_name} ${msg.from.last_name}! Click «Start exercising», choose a muscle group and start work!`,
        startOptions
      );
      break;
    case "/choosemusclegroup":
      bot.sendMessage(
        chatId,
        "Pick a muscle group you want to work on!",
        chooseMuscleGroutOptions
      );
      break;
    default:
      bot.sendMessage(chatId, "I don’t understand you. Choose some command!");
      break;
  }
});

bot.on("callback_query", (msg) => {
  switch (msg.data) {
    case "arms":
      break;
    case "shoulders":
      break;
    case "chest":
      break;
    case "core":
      break;
    case "back":
      break;
    case "legs_and_glutes":
      break;
    default:
      break;
  }
});
