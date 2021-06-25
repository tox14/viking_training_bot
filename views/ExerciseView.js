const exercises = require("../exercises.json");

module.exports = async (bot, message) => {
  const type = message.text.split("💪 ")[1] || message.text.split(": ")[1];

  const exercisesForSelectedType = exercises[type];
  const exercise =
    exercisesForSelectedType[
      Math.floor(Math.random() * exercisesForSelectedType.length)
    ];

  const options = {
    caption: `*${exercise.name}*`,
    parse_mode: "markdown",
    reply_markup: JSON.stringify({
      keyboard: [["✅ Next exercise: " + type], ["🔄 Change group", "❌ Stop"]],
      one_time_keyboard: true,
      resize_keyboard: true,
    }),
  };

  if (type) {
    await bot.sendPhoto(message.chat.id, exercise.image, options);
  }
};
