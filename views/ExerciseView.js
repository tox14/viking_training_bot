const exercises = require("../exercises.json");
const ExercisesModel = require("../modeles/Exercises.model");

module.exports = async (bot, message) => {
  const chatId = message.chat.id;
  const type = message.text.split("💪 ")[1] || message.text.split(": ")[1];

  let exercisesForType = exercises[type];

  // We need to filter last 5 exercise
  const lastFiveExercises = await ExercisesModel.findAll({
    attributes: ["exercise"],
    where: {
      chatId: chatId.toString(),
      group: type,
    },
    order: [["datetime", "DESC"]],
    limit: 5,
  });
  if (lastFiveExercises.length) {
    const lastFiveExercisesObj = {};
    lastFiveExercises.forEach(({ exercise }) => {
      lastFiveExercisesObj[exercise] = true;
    });
    exercisesForType = exercisesForType.filter((exercise) => {
      return !lastFiveExercisesObj[exercise.name];
    });
  }

  const randomIndex = Math.floor(Math.random() * exercisesForType.length);
  const exercise = exercisesForType[randomIndex];

  await ExercisesModel.create({
    chatId,
    exercise: exercise.name,
    group: type,
  });

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
