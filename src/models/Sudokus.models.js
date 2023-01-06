const db = require('../utils/database');
const {DataTypes} = require('sequelize');
const Rows = require('./Rows.models');
const Quadrants = require('./Quadrants.models');

const Sudokus = db.define('sudokus' , {
    id: {
        type: DataTypes.UUID ,
        primaryKey: true
    } ,
    rowId : {
        type: DataTypes.UUID ,
        allowNull: false ,
        field: 'rows_id' ,
        references: {
            key: 'id' ,
            model: Rows
        }
    } ,
    quadrantId:{
        type: DataTypes.UUID ,
        // allowNull: false ,
        field: 'quadrants_id' ,
        references: {
            key: 'id' ,
            model: Quadrants
        }
    }
}) ;

module.exports = Sudokus