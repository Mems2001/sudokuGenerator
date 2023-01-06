const Quadrants = require('../models/Quadrants.models');
const uuid = require('uuid');
const { findRowsById } = require('../Rows/rows.controllers');
const { findRowAById } = require('../Rows/RowA/rowA.controllers');
const { findRowBById } = require('../Rows/RowB/rowB.controllers');
const { findRowCById } = require('../Rows/RowC/rowC.controllers');
const { findRowDById } = require('../Rows/RowD/rowD.controllers');
const { findRowEById } = require('../Rows/RowE/rowE.controllers');
const { findRowFById } = require('../Rows/RowF/rowF.controllers');
const { findRowGById } = require('../Rows/RowG/rowG.controllers');
const { findRowHById } = require('../Rows/RowH/rowH.controllers');
const { findRowIById } = require('../Rows/RowI/rowI.controllers');

const createQuadrants = async(rowsId) => {
    try {
        const Rows = await findRowsById(rowsId);
        // console.log(Rows);
        const rowA = await findRowAById(Rows.rowAId);
        // console.log(rowA);
        const rowB = await findRowBById(Rows.rowBId);
        // console.log(rowB);
        const rowC = await findRowCById(Rows.rowCId);
        // console.log(rowC);
        const rowD = await findRowDById(Rows.rowDId);
        // console.log(rowD);
        const rowE = await findRowEById(Rows.rowEId);
        // console.log(rowE);
        const rowF = await findRowFById(Rows.rowFId);
        // console.log(rowF);
        const rowG = await findRowGById(Rows.rowGId);
        // console.log(rowG);
        const rowH = await findRowHById(Rows.rowHId);
        // console.log(rowF);
        const rowI = await findRowIById(Rows.rowIId);
        // console.log(rowF);

        // const q1 = [rowA.first , rowA.second , rowA.third , rowB.first , rowB.second , rowB.third , rowC.first , rowC.second , rowC.third];
        // const q2 = [rowA.fourth , rowA.fifth , rowA.sixth , rowB.fourth , rowB.fifth , rowB.sixth , rowC.fourth , rowC.fifth , rowC.sixth];

        const quadrants = {
            q1: [] ,
            q2: [] ,
            q3: [] ,
            q4: [] ,
            q5: [] ,
            q6: [] ,
            q7: [] ,
            q8: [] ,
            q9: [] 
        };

        for (let y=0 ; y<9 ; y++) {
            if (y<3) {
                quadrants.q1.push(rowA.values[y]);
                quadrants.q1.push(rowB.values[y]);
                quadrants.q1.push(rowC.values[y]);
                quadrants.q4.push(rowD.values[y]);
                quadrants.q4.push(rowE.values[y]);
                quadrants.q4.push(rowF.values[y]);
                quadrants.q7.push(rowG.values[y]);
                quadrants.q7.push(rowH.values[y]);
                quadrants.q7.push(rowI.values[y]);
            } if (y>2 && y<6) {
                quadrants.q2.push(rowA.values[y]);
                quadrants.q2.push(rowB.values[y]);
                quadrants.q2.push(rowC.values[y]);
                quadrants.q5.push(rowD.values[y]);
                quadrants.q5.push(rowE.values[y]);
                quadrants.q5.push(rowF.values[y]);
                quadrants.q8.push(rowG.values[y]);
                quadrants.q8.push(rowH.values[y]);
                quadrants.q8.push(rowI.values[y]);
            } if (y>5 && y<9) {
                quadrants.q3.push(rowA.values[y]);
                quadrants.q3.push(rowB.values[y]);
                quadrants.q3.push(rowC.values[y]);
                quadrants.q6.push(rowD.values[y]);
                quadrants.q6.push(rowE.values[y]);
                quadrants.q6.push(rowF.values[y]);
                quadrants.q9.push(rowG.values[y]);
                quadrants.q9.push(rowH.values[y]);
                quadrants.q9.push(rowI.values[y]);
            }
        }
        
        const data = await Quadrants.create({
            id: uuid.v4() ,
            q1: quadrants.q1 ,
            q2: quadrants.q2 ,
            q3: quadrants.q3 ,
            q4: quadrants.q4 ,
            q5: quadrants.q5 ,
            q6: quadrants.q6 ,
            q7: quadrants.q7 ,
            q8: quadrants.q8 ,
            q9: quadrants.q9 
        });
        return data
    } catch (error) {
        return console.log(error)
    }
};

module.exports = {
    createQuadrants
}