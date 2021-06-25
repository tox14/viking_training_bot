module.exports = async (bot, message) => {
  await bot.sendMessage(
    message.chat.id,
    "I don’t understand you. Choose some command!"
  );
};
