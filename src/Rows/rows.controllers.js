const Rows = require('../models/Rows.models');
const uuid = require('uuid');
const { createRowA } = require('./RowA/rowA.controllers');
const { createRowB } = require('./RowB/rowB.controllers');
const { createRowC } = require('./RowC/rowC.controllers');
const { createRowD } = require('./RowD/rowD.controllers');
const { createRowE } = require('./RowE/rowE.controllers');
const { createRowF } = require('./RowF/rowF.controllers');
const { createRowG } = require('./RowG/rowG.controllers');
const { createRowH } = require('./RowH/rowH.controllers');
const { createRowI } = require('./RowI/rowI.controllers');

const createRows = async() => {
    try {
        // const rowId = await uuid.v4();
        
        const rowA = await createRowA();
        const rowB = await createRowB(rowA.id);
        const rowC = await createRowC(rowA.id , rowB.id);
        const rowD = await createRowD(rowA.id , rowB.id , rowC.id);
        const rowE = await createRowE(rowA.id , rowB.id , rowC.id , rowD.id);
        const rowF = await createRowF(rowA.id , rowB.id , rowC.id , rowD.id , rowE.id);
        const rowG = await createRowG(rowA.id , rowB.id , rowC.id , rowD.id , rowE.id , rowF.id);
        const rowH = await createRowH(rowA.id , rowB.id , rowC.id , rowD.id , rowE.id , rowF.id , rowG.id);
        const rowI = await createRowI(rowA.id , rowB.id , rowC.id , rowD.id , rowE.id , rowF.id , rowG.id , rowH.id);
        
        const data = await Rows.create({
            id: uuid.v4() ,
            rowAId: rowA.id ,
            rowBId: rowB.id ,
            rowCId: rowC.id ,
            rowDId: rowD.id ,
            rowEId: rowE.id ,
            rowFId: rowF.id ,
            rowGId: rowG.id ,
            rowHId: rowH.id ,
            rowIId: rowI.id 
        });
        return data
    } catch (error) {
        console.log(error);
        return error
    }
};

const findRowsById = async(id) => {
    return await Rows.findOne({
        where: {
            id
        } 
    })
};

module.exports = {
    createRows ,
    findRowsById
}