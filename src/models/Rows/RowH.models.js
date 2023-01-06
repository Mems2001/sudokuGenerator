const db = require('../../utils/database');
const {DataTypes} = require('sequelize');

const RowH = db.define('row_H' , {
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

module.exports = RowH