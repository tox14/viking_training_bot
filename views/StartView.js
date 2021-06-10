module.exports = (bot, message) => {
  const chatId = message.chat.id;

  const options = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "👊 Start exercising", callback_data: "/choosemusclegroup" }],
      ],
    }),
  };

  bot.sendMessage(
    chatId,
    `Hello, ${message.from.first_name} ${message.from.last_name}! Click «Start exercising», choose a muscle group and start work!`,
    options
  );
};
