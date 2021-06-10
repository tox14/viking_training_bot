module.exports = (bot, message) => {
  const chatId = message.message.chat.id;
  const type = JSON.parse(message.data).type;

  const options = {
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
            callback_data: JSON.stringify({
              command: "/exercises",
              type,
            }),
          },
          { text: "❌ Stop exercising", callback_data: "/stop" },
        ],
      ],
    }),
  };

  if (type) {
    bot.sendMessage(chatId, `Your choise: ${type}`, options);
  }
};
