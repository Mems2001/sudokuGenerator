const db = require('../../utils/database');
const {DataTypes} = require('sequelize');
const Rows = require('../Rows.models');

const RowA = db.define('row_A' , {
    id: {
        type: DataTypes.UUID ,
        primaryKey: true
    } ,
    values: {
        type: DataTypes.ARRAY(DataTypes.INTEGER) ,
        allowNull: false ,
        validate: {
            len : 9
        }
    }
} , {
    timestamps: false
});

module.exports = RowA