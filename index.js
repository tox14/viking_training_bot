const TelegramApi = require("node-telegram-bot-api");
const { StartView, ChooseMuscleGroupView } = require("./views");

require("dotenv").config();

const bot = new TelegramApi(process.env.TOKEN, { polling: true });

bot.setMyCommands([
  { command: "/start", description: "Start using the Viking Training Bot" },
  {
    command: "/choosemusclegroup",
    description: "Select the muscle group you want to work on",
  },
]);

bot.on("message", (msg) => {
  switch (msg.text) {
    case "/start":
      StartView(bot, msg);
      break;
    case "/choosemusclegroup":
      ChooseMuscleGroupView(bot, msg);
      break;
    default:
      bot.sendMessage(
        msg.chat.id,
        "I don’t understand you. Choose some command!"
      );
      break;
  }
});

bot.on("callback_query", (msg) => {
  switch (msg.data) {
    case "/armsexercises":
      break;
    case "/shouldersexercises":
      break;
    case "/chestexercises":
      break;
    case "/coreexercises":
      break;
    case "/backexercises":
      break;
    case "/legs_and_glutesexercises":
      break;
    default:
      break;
  }
});
