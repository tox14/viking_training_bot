const sequelize = require("../database");
const { DataTypes } = require("sequelize");

const Exercises = sequelize.define("exercises", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  chatId: {
    type: DataTypes.STRING,
  },
  exercise: {
    type: DataTypes.STRING,
  },
  group: {
    type: DataTypes.STRING,
  },
  datetime: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
  },
});

module.exports = Exercises;
