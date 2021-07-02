const exercises_object = require("../exercises.json");
const { Sequelize, Op } = require("sequelize");
const Exercises = require("../modeles/Exercises.model");

module.exports = async (bot, message) => {
  const chatId = message.chat.id;

  const options = {
    parse_mode: "markdown",
  };

  const getDataForPeriod = async (start, end) => {
    return await Exercises.findAll({
      attributes: [
        "group",
        [Sequelize.fn("COUNT", Sequelize.col("group")), "count"],
      ],
      where: {
        chatId: chatId.toString(),
        datetime: {
          [Op.between]: [start.toISOString(), end.toISOString()],
        },
      },
      group: "group",
      order: [[Sequelize.literal("count"), "DESC"]],
      raw: true,
    });
  };

  const stats = {};
  Object.keys(exercises_object).forEach((group) => {
    stats[group] = {
      day: 0,
      week: 0,
      month: 0,
    };
  });

  // Get exercises per Day
  const DAY_START = new Date();
  DAY_START.setHours(0, 0, 0, 0);
  const statsDay = await getDataForPeriod(DAY_START, new Date());

  // Get exercises per Week
  const WEEK_START = new Date();
  WEEK_START.setDate(WEEK_START.getDate() - WEEK_START.getDay());
  WEEK_START.setHours(0, 0, 0, 0);
  const statsWeek = await getDataForPeriod(WEEK_START, new Date());

  // Get exercises per Month
  const MONTH_START = new Date();
  MONTH_START.setDate(MONTH_START.getDate() - 30);
  MONTH_START.setHours(0, 0, 0, 0);
  const statsMonth = await getDataForPeriod(MONTH_START, new Date());

  statsDay.forEach(({ group, count }) => {
    stats[group].day = count;
  });

  statsWeek.forEach(({ group, count }) => {
    stats[group].week = count;
  });

  statsMonth.forEach(({ group, count }) => {
    stats[group].month = count;
  });

  const request = `
*Exercises* per _Day_ / _Week_ / _Month_

${Object.keys(stats)
  .map(
    (key) =>
      `*${key}*: _${stats[key].day}_ / _${stats[key].week}_ / _${stats[key].month}_\n`
  )
  .join("")}
  `;

  bot.sendMessage(chatId, request, options);
};
