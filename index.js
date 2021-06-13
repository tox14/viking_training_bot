require("dotenv").config();

const TelegramApi = require("node-telegram-bot-api");
const {
  StartView,
  ChooseMuscleGroupView,
  ExerciseView,
  StopView,
  WrongCommandView,
} = require("./views");

const bot = new TelegramApi(process.env.TOKEN, { polling: true });

bot.setMyCommands([
  { command: "/start", description: "Start using the Viking Training Bot" },
  {
    command: "/choosemusclegroup",
    description: "Select the muscle group you want to work on",
  },
  {
    command: "/stop",
    description: "Stop training",
  },
]);

bot.on("message", async (msg) => {
  switch (msg.text) {
    case "/start":
      await StartView(bot, msg);
      break;
    case "/choosemusclegroup":
      await ChooseMuscleGroupView(bot, msg);
      break;
    case "/stop":
      await StopView(bot, msg);
      break;
    default:
      await WrongCommandView(bot, msg);
      break;
  }
});

bot.on("callback_query", async (msg) => {
  const command = msg.data[0] === "{" ? JSON.parse(msg.data).command : msg.data;

  switch (command) {
    case "/choosemusclegroup":
      await ChooseMuscleGroupView(bot, msg);
      break;
    case "/exercises":
      await ExerciseView(bot, msg);
      break;
    case "/stop":
      await StopView(bot, msg);
      break;
    default:
      break;
  }
});

bot.on("error", (err) => console.error("error", err));
bot.on("polling_error", (err) => console.error("polling_error", err));
