module.exports = async (bot, message) => {
  const chatId = (message.chat && message.chat.id) || message.message.chat.id;

  await bot.sendMessage(chatId, "Well done! See you soon!");
};
