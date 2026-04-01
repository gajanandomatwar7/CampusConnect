const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/mysqldb.config');

const TimeTable = sequelize.define('TimeTable', {
    //timetable structure 
    subject: {
        type:DataTypes.STRING,
        allowNull:false
    },
    day: {
        type:DataTypes.STRING,
        allowNull:false
    },
    startTime: {
        type:DataTypes.TIME,
        allowNull:false
    },
    endTime: {
        type:DataTypes.TIME,
        allowNull:false
    },
    teacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:'Teacher',
            key:'id',
        }
    }

});

TimeTable.associate = (models) => {
    TimeTable.belongsTo(models.Teacher, {
        foreignKey: "teacherId",
        as: "teacher"
    });
};

module.exports = TimeTable;
