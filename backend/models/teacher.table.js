const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/mysqldb.config');

const Teacher = sequelize.define('Teacher', {
  userName:{
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  firstName:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName:{
    type: DataTypes.STRING,
    allowNull: false
  },
  department:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  designation:{
    type: DataTypes.STRING,
    allowNull: false
  },
  password:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  emailID:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  subjects: {
    type: DataTypes.JSON,
    // allowNull: false
},
 latiitude:{
  type:DataTypes.FLOAT,
  allowNull: true,
 },
 longitude:{
  type: DataTypes.FLOAT,
  allowNull: true,
 },
 imageURL:{
  type: DataTypes.STRING,
  allowNull: true,
 }

});


module.exports = Teacher;