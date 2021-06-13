module.exports = async (bot, message) => {
  const chatId = message.data ? message.message.chat.id : message.chat.id;

  const options = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "💪 Arms",
            callback_data: JSON.stringify({
              command: "/exercises",
              type: "arms",
            }),
          },
          {
            text: "💪 Shoulders",
            callback_data: JSON.stringify({
              command: "/exercises",
              type: "shoulders",
            }),
          },
        ],
        [
          {
            text: "💪 Chest",
            callback_data: JSON.stringify({
              command: "/exercises",
              type: "chest",
            }),
          },
          {
            text: "💪 Core",
            callback_data: JSON.stringify({
              command: "/exercises",
              type: "core",
            }),
          },
        ],
        [
          {
            text: "💪 Back",
            callback_data: JSON.stringify({
              command: "/exercises",
              type: "back",
            }),
          },
          {
            text: "💪 Legs and Glutes",
            callback_data: JSON.stringify({
              command: "/exercises",
              type: "legsandglut",
            }),
          },
        ],
      ],
    }),
  };

  await bot.sendMessage(
    chatId,
    "Pick a muscle group you want to work on!",
    options
  );
};
