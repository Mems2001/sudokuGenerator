const RowI = require('../../models/Rows/RowI.models');
const uuid = require('uuid');
const { findRowAById } = require('../RowA/rowA.controllers');
const { findRowBById } = require('../RowB/rowB.controllers');
const { findRowCById } = require('../RowC/rowC.controllers');
const { findRowDById } = require('../RowD/rowD.controllers');
const { findRowEById } = require('../RowE/rowE.controllers');
const { findRowFById } = require('../RowF/rowF.controllers');
const { findRowGById } = require('../RowG/rowG.controllers');
const { findRowHById } = require('../RowH/rowH.controllers');

const createRowI = async(idA , idB , idC , idD , idE , idF , idG , idH) => {

    let numbers = [];
    const rows = {
        rowA : await findRowAById(idA) ,
        rowB : await findRowBById(idB) ,
        rowC : await findRowCById(idC) ,
        rowD : await findRowDById(idD) ,
        rowE : await findRowEById(idE) ,
        rowF : await findRowFById(idF) ,    
        rowG : await findRowGById(idG) ,    
        rowH : await findRowHById(idH)    
    }

    // console.log(rows)

    const columns = {
        0: [] ,
        1: [] ,
        2: [] ,
        3: [] ,
        4: [] ,
        5: [] ,
        6: [] ,
        7: [] ,
        8: [] 
    };

    
    for (row in rows) {
        for (let i=0 ; i<9 ; i++) {
            // console.log(rows[row].values)
            columns[i].push(rows[row].values[i])
        }
    };
    // console.log(columns)

    const generateRandom = () => {
        return Math.ceil(Math.random()*9)
    };
    
    const selectMissingNumbers = (j , n , array) => {
        let value = false
        const missing = {
            0: [] ,
            1: [] ,
            2: [] ,
            3: [] ,
            4: [] ,
            5: [] ,
            6: [] ,
            7: [] ,
            8: [] 
        }
        for (let x=0 ; x<9 ; x++) {
            for (let i=1 ; i<10 ; i++) {
                let exists = false;
                for (number of columns[x]) {
                    if (i === number) {
                        exists = true
                    }
                };
                if (!exists) {
                    missing[x].push(i)
                }
            }
        };
        // console.log(missing , array , n)

        for (number of missing[j]) {
            if (number === n) {
                // console.log(n ,'is a missing number')
                value = true;
                break
            }
        };
        return value
    };

    let loopControl = [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0];
    
    const generateNumber = (array , j) => {
        const random = generateRandom();
        if (selectMissingNumbers(j , random , array)) {
            return random
        } else {
            loopControl[j] ++ ;
            if (loopControl[j] <= 50) {
                return generateNumber(array , j) 
            } else {
                numbers = [];
                loopControl = [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0]
                // console.log('loop prevention reset');
                return 'error'
            }  
        }
    };

    const missing2 = {
        0: [] ,
        1: [] ,
        2: [] ,
        3: [] ,
        4: [] ,
        5: [] ,
        6: [] ,
        7: [] ,
        8: [] 
    }
    for (let x=0 ; x<9 ; x++) {
        for (let i=1 ; i<10 ; i++) {
            let exists = false;
            for (number of columns[x]) {
                if (i === number) {
                    exists = true
                }
            };
            if (!exists) {
                missing2[x].push(i)
            }
        }
    };

    for (set in missing2) {
        if (missing2[set].length>1) {
            console.log('inviable puzzle')
            return null
        }
    };

    try {
         for (let i=0 ; i<9 ; i++) {
            const number = await generateNumber(numbers , i);
            if (number === 'error') {
                console.log('loop prevention reset I')
                i = -1
            } else {
                numbers.push(number)
            }
        };
        console.log('Row_I' , numbers)

        const data = await RowI.create({
            id: uuid.v4() ,
            values: numbers
        });
        return data
    } catch (error) {
        console.log(error);
        return null
    }
};

const findRowIById = async(id) => {
    return await RowI.findOne({
        where: {
            id
        }
    })
};

module.exports = {
    createRowI ,
    findRowIById
}