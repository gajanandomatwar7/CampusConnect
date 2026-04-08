const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/mysqldb.config");

const Teacher = sequelize.define("Teacher", {
  teacherId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  dept: { type: DataTypes.ENUM("IT","CSE","AIML"), allowNull: false },
  designation: { type: DataTypes.STRING, allowNull: false },
  teachExp: { type: DataTypes.INTEGER, validate: { min: 0, max: 100 } },
  email: { type: DataTypes.STRING, unique: true, validate: { isEmail: true } },
  userName: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  cabinLocation: { type: DataTypes.STRING },
});

module.exports = Teacher;
