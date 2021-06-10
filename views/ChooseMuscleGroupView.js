module.exports = (bot, message) => {
  const chatId = message.data ? message.message.chat.id : message.chat.id;

  const options = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          { text: "💪 Arms", callback_data: "/armsexercises" },
          { text: "💪 Shoulders", callback_data: "/shouldersexercises" },
        ],
        [
          { text: "💪 Chest", callback_data: "/chestexercises" },
          { text: "💪 Core", callback_data: "/coreexercises" },
        ],
        [
          { text: "💪 Back", callback_data: "/backexercises" },
          {
            text: "💪 Legs and Glutes",
            callback_data: "/legsandglutexerciseses",
          },
        ],
      ],
    }),
  };

  bot.sendMessage(chatId, "Pick a muscle group you want to work on!", options);
};
