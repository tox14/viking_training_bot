module.exports = async (bot, message) => {
  const chatId = message.chat.id;

  await bot.sendMessage(chatId, "I don’t understand you. Choose some command!");
};
