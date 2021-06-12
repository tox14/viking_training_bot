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

bot.on("message", (msg) => {
  switch (msg.text) {
    case "/start":
      StartView(bot, msg);
      break;
    case "/choosemusclegroup":
      ChooseMuscleGroupView(bot, msg);
      break;
    case "/stop":
      StopView(bot, msg);
      break;
    default:
      WrongCommandView(bot, msg);
      break;
  }
});

bot.on("callback_query", (msg) => {
  const command = msg.data[0] === "{" ? JSON.parse(msg.data).command : msg.data;

  switch (command) {
    case "/choosemusclegroup":
      ChooseMuscleGroupView(bot, msg);
      break;
    case "/exercises":
      ExerciseView(bot, msg);
      break;
    case "/stop":
      StopView(bot, msg);
      break;
    default:
      break;
  }
});

bot.on("error", (err) => console.error("error", err));
bot.on("polling_error", (err) => console.error("polling_error", err));
