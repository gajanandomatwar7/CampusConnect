const { DataTypes } = require('sequelize');
const {sequelize}=require('../config/mysqldb.config');

const TimeTable=sequelize.define('TimeTable',{
    //timetable structure 
});

module.exports=TimeTable;
