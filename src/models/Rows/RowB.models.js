const db = require('../../utils/database');
const {DataTypes} = require('sequelize');

const RowB = db.define('row_B' , {
    id: {
        type: DataTypes.UUID ,
        primaryKey: true
    } ,
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
            len: 9
        }
    }
} , {
    timestamps: false
});

module.exports = RowB