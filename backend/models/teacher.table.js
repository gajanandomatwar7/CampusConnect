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
  designation:{
    type: DataTypes.STRING,
    allowNull: false
  },
  password:{
    type:DataTypes.STRING,
    allowNull:false,
  }
  // subjects:{
  //   type: DataTypes.ARRAY
  // },

});

Teacher.associate = (models) => {
    Teacher.hasMany(models.TimeTable, {
        foreignKey: "teacherId",
        as: "schedule"
    });
    Teacher.hasMany(models.Status, {
    foreignKey: "teacherId",
    as: "statuses"
});
};

module.exports = Teacher;