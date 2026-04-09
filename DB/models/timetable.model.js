const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/mysqldb.config");

const TimeTable = sequelize.define("TimeTable", {
  timetableId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  subject: { type: DataTypes.ENUM("CN","DBMS","TOC","OS","SE"), allowNull: false },
  day: { type: DataTypes.ENUM("Mon","Tue","Wed","Thu","Fri","Sat"), allowNull: false },
  startTime: { type: DataTypes.TIME, allowNull: false },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false,
    validate: {
      isAfterStart(value) {
        if (this.startTime >= value) {
          throw new Error("End time must be greater than start time");
        }
      },
    },
  },
});

module.exports = TimeTable;
