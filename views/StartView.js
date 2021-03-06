module.exports = async (bot, message) => {
  const options = {
    reply_markup: JSON.stringify({
      keyboard: [["👊 Start exercising"]],
      one_time_keyboard: true,
      resize_keyboard: true,
    }),
  };

  await bot.sendMessage(
    message.chat.id,
    `Hello, ${message.from.first_name} ${message.from.last_name}! Click «Start exercising», choose a muscle group and start work!`,
    options
  );
};
