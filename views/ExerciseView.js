const exercises = require("../exercises.json");

module.exports = async (bot, message) => {
  const chatId = message.message.chat.id;
  const type = JSON.parse(message.data).type;

  const exercisesForSelectedType = exercises[type];
  const exercise =
    exercisesForSelectedType[
      Math.floor(Math.random() * exercisesForSelectedType.length)
    ];

  const options = {
    caption: `*${exercise.name}*`,
    parse_mode: "markdown",
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "✅ Next exercise",
            callback_data: JSON.stringify({
              command: "/exercises",
              type,
            }),
          },
        ],
        [
          {
            text: "🔄 Change group",
            callback_data: "/choosemusclegroup",
          },
          { text: "❌ Stop exercising", callback_data: "/stop" },
        ],
      ],
    }),
  };

  if (type) {
    await bot.sendPhoto(chatId, exercise.image, options);
  }
};
