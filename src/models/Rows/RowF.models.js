const db = require ('../../utils/database');
const {DataTypes} = require('sequelize');

const RowF = db.define('row_F' , {
    id: {
        type: DataTypes.UUID ,
        primaryKey: true
    } ,
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

module.exports = RowF