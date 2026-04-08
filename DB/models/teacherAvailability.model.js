const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/mysqldb.config");

const TeacherAvailability = sequelize.define("TeacherAvailability", {
  availabilityId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  day: { type: DataTypes.ENUM("Mon","Tue","Wed","Thu","Fri","Sat") },
  startTime: { type: DataTypes.TIME },
  endTime: { type: DataTypes.TIME },
  status: { type: DataTypes.ENUM("Available","Not Available"), defaultValue: "Available" },
});

module.exports = TeacherAvailability;
