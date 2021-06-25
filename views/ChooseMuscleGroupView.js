module.exports = async (bot, message) => {
  const chatId = message.data ? message.message.chat.id : message.chat.id;

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
    chatId,
    "Pick a muscle group you want to work on!",
    options
  );
};
