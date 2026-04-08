const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/mysqldb.config");

const Student = sequelize.define("Student", {
  studId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  prn: { type: DataTypes.BIGINT, unique: true, allowNull: false },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  dept: { type: DataTypes.ENUM("IT-A","IT-B","CSE-A","CSE-B","AIML"), allowNull: false },
  year: { type: DataTypes.INTEGER, validate: { min: 1, max: 4 } },
  sem: { type: DataTypes.INTEGER, validate: { min: 1, max: 8 } },
  userName: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Student;
