module.exports = async (bot, message) => {
  const options = {
    reply_markup: JSON.stringify({
      keyboard: [
        ["💪 Arms", "💪 Shoulders"],
        ["💪 Chest", "💪 Core"],
        ["💪 Back", "💪 Legs and Glutes"],
      ],
      one_time_keyboard: true,
      resize_keyboard: true,
    }),
  };

  await bot.sendMessage(
    message.chat.id,
    "Pick a muscle group you want to work on!",
    options
  );
};
