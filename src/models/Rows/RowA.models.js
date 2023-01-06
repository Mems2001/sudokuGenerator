const db = require('../../utils/database');
const {DataTypes} = require('sequelize');
const Rows = require('../Rows.models');

const RowA = db.define('row_A' , {
    id: {
        type: DataTypes.UUID ,
        primaryKey: true
    } ,
    // rowId: {
    //     type: DataTypes.UUID ,
    //     allowNull: false ,
    //     field: 'row_id' ,
    //     references: {
    //         key: 'id' ,
    //         model: Rows
    //     }
    // } ,
    // first: {
    //     type: DataTypes.INTEGER ,
    //     allowNull: false 
    // } ,
    // second: {
    //     type: DataTypes.INTEGER ,
    //     allowNull: false
    // } ,
    // third: {
    //     type: DataTypes.INTEGER ,
    //     allowNull: false
    // } ,
    // fourth: {
    //     type: DataTypes.INTEGER ,
    //     allowNull: false
    // } ,
    // fifth: {
    //     type: DataTypes.INTEGER ,
    //     allowNull: false
    // } ,
    // sixth: {
    //     type: DataTypes.INTEGER ,
    //     allowNull: false
    // } ,
    // seventh: {
    //     type: DataTypes.INTEGER ,
    //     allowNull: false
    // } ,
    // eighth: {
    //     type: DataTypes.INTEGER ,
    //     allowNull: false
    // } ,
    // ninth: {
    //     type: DataTypes.INTEGER ,
    //     allowNull: false
    // } ,
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