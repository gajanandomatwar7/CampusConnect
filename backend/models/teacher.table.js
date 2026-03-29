const {DataTypes} = require('sequelize');
const {sequelize} = require('../config/mysqldb.config');

const Teacher = sequelize.define('Teacher', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subject: DataTypes.STRING
});

module.exports = Teacher;