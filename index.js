require("dotenv").config();

const TelegramApi = require("node-telegram-bot-api");
const sequalize = require("./database");
const {
  StartView,
  ChooseMuscleGroupView,
  ExerciseView,
  StopView,
  WrongCommandView,
} = require("./views");

const bot = new TelegramApi(process.env.TOKEN, { polling: true });

const start = async () => {
  try {
    // Connect to database
    await sequalize.authenticate();
    await sequalize.sync();

    bot.setMyCommands([
      { command: "/start", description: "Start using the Viking Training Bot" },
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
        case "👊 Start exercising":
        case "🔄 Change group":
          await ChooseMuscleGroupView(bot, msg);
          break;
        case "💪 Arms":
        case "✅ Next exercise: Arms":
        case "💪 Shoulders":
        case "✅ Next exercise: Shoulders":
        case "💪 Chest":
        case "✅ Next exercise: Chest":
        case "💪 Core":
        case "✅ Next exercise: Core":
        case "💪 Back":
        case "✅ Next exercise: Back":
        case "💪 Legs and Glutes":
        case "✅ Next exercise: Legs and Glutes":
          await ExerciseView(bot, msg);
          break;
        case "/stop":
        case "❌ Stop":
          await StopView(bot, msg);
          break;
        default:
          await WrongCommandView(bot, msg);
          break;
      }
    });

    bot.on("error", (err) => console.error("error", err));
    bot.on("polling_error", (err) => console.error("polling_error", err));
  } catch (err) {
    console.error(err);
  }
};

start();
