const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/mysqldb.config');

const Teacher = sequelize.define('Teacher', {
  userName:{
    type: DataTypes.STRING,
    allowNull: false
  },
  firstName:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName:{
    type: DataTypes.STRING,
    allowNull: false
  },
  designation:{
    type: DataTypes.STRING,
    allowNull: false
  },
  // subjects:{
  //   type: DataTypes.ARRAY
  // },

});

module.exports = Teacher;