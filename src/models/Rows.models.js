const db = require('../utils/database');
const {DataTypes} = require('sequelize');
const RowA = require('./Rows/RowA.models');
const RowB = require('./Rows/RowB.models');
const RowC = require('./Rows/RowC.models');
const RowD = require('./Rows/RowD.models');
const RowE = require('./Rows/RowE.models');
const RowF = require('./Rows/RowF.models');
const RowG = require('./Rows/RowG.models');
const RowH = require('./Rows/RowH.models');
const RowI = require('./Rows/RowI.models');

const Rows = db.define('rows' , {
    id: {
        type: DataTypes.UUID ,
        primaryKey: true
    } ,
    rowAId: {
        type: DataTypes.UUID ,
        allowNull: false ,
        field: 'row_A_Id' ,
        references: {
            key: 'id' ,
            model: RowA
        }
    } ,
    rowBId : {
        type: DataTypes.UUID ,
        allowNull: false ,
        field: 'row_B_Id' ,
        references: {
            key: 'id' ,
            model: RowB
        }
    } ,
    rowCId : {
        type: DataTypes.UUID ,
        allowNull: false ,
        field: 'row_C_Id' ,
        references: {
            key: 'id' ,
            model: RowC
        }
    } ,
    rowDId: {
        type: DataTypes.UUID ,
        allowNull: false ,
        field: 'row_D_Id' ,
        references: {
            key: 'id' ,
            model: RowD
        } 
    } ,
    rowEId: {
        type: DataTypes.UUID ,
        allowNull: false ,
        field: 'row_E_Id' ,
        references: {
            key: 'id' ,
            model: RowE
        } 
    } ,
    rowFId: {
        type: DataTypes.UUID ,
        allowNull: false ,
        field: 'row_F_Id' ,
        references: {
            key: 'id' ,
            model: RowF
        }
    } ,
    rowGId: {
        type: DataTypes.UUID ,
        allowNull: false ,
        field: 'row_G_Id' ,
        references: {
            key: 'id' ,
            model: RowG
        }
    } ,
    rowHId: {
        type: DataTypes.UUID ,
        allowNull: false ,
        field: 'row_H_Id' ,
        references: {
            key: 'id' ,
            model: RowH
        }
    } ,
    rowIId: {
        type: DataTypes.UUID ,
        allowNull: false ,
        field: 'row_I_Id' ,
        references: {
            key: 'id' ,
            model: RowI
        }
    } ,
} , {
    timestamps: false
}) ;

module.exports = Rows