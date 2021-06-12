module.exports = (bot, message) => {
  const chatId = (message.chat && message.chat.id) || message.message.chat.id;

  bot.sendMessage(chatId, "Well done! See you soon!");
};
