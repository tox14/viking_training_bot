module.exports = (bot, message) => {
  const chatId = message.chat.id;

  bot.sendMessage(chatId, "I don’t understand you. Choose some command!");
};
