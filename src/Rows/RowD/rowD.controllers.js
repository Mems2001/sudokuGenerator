const RowD = require('../../models/Rows/RowD.models');
const uuid = require('uuid');
const { findRowAById } = require('../RowA/rowA.controllers');
const { findRowBById } = require('../RowB/rowB.controllers');
const { findRowCById } = require('../RowC/rowC.controllers');

const createRowD = async(idA , idB , idC) => {
    let numbers = [];

    const rowA = await findRowAById(idA)
    const rowB = await findRowBById(idB)
    const rowC = await findRowCById(idC)

    const columns = [];

    for (let y=0 ; y<9 ; y++) {
        const column = [] ;
        column.push(rowA.values[y]);
        column.push(rowB.values[y]);
        column.push(rowC.values[y]);
        columns.push(column)
    } ;
    // console.log(columns);

    const generateRandom = () => {
        const random = Math.ceil(Math.random() * 9);
        return random
    };

    const checkCA = (array , j , n) => {
        let value= false;
        for (number of columns[j]) {
            if (n === number) {
                value = true;
                break
            }};         
        for (digit of array) {
            if (n === digit) {
                value = true;
                break
            }
        };
        return value
    }

    const verifyDuplicate = (n , array , j) => {
        let value = false;
        const keys = [];
        const Ckeys = [];
        const prior = Math.ceil(Math.random() * 18)

        for (number of columns[8]) {
            let isKey = true;
            for (digit of array) {
                if (number === digit) {
                    isKey = false
                }
            };
            if (isKey) {
                keys.push(number)
            }
        };

        if (j<2) {
            for (number of columns[2]) {
                let exists = false;
                for (digit of array) {
                    if (number === digit) {
                        exists = true
                    }
                };
                if (!exists) {
                    Ckeys.push(number)
                }
            };
        } else if (j>2 && j<5) {
            for (number of columns[5]) {
                let exists = false;
                for (digit of array) {
                    if (number === digit) {
                        exists = true
                    }
                };
                if (!exists) {
                    Ckeys.push(number)
                }
            }
        };

        let prob2 = Ckeys.length * 2
        let prob = 0

        if (j < 6) {
            prob = (keys.length) * (j+1) 
        } else if (j===6) {
            prob = (keys.length) * 9
        } else if (j===7) {
            prob = (keys.length) * 18
        };

            if (prior < prob+1) {
                let isKey = false;
                for (number of keys) {
                    if (n === number) {
                        isKey = true
                    }
                };
                if (!isKey) {
                    value = true
                } else {
                    value = checkCA(array , j , n)
                }
            } else if (prior>prob && prior<(prob+prob2+1)) {
                let isKey = false;
                for (number of Ckeys) {
                    if (n === number) {
                        isKey = true
                    }
                };
                if (!isKey) {
                    value = true
                } else {
                    value = checkCA(array , j , n)
                }
            } else {
                value = checkCA(array , j , n)
            };      

        return value
    };

    let loopControl = [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ]

    const generateNumber = (array , j) => {
        const random = generateRandom();
        if (verifyDuplicate(random , array , j)) {
            loopControl[j] ++ ;
            if (loopControl[j] <= 100) {
                return generateNumber(array , j)
            } else {
                numbers = [];
                loopControl = [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0]
                // console.log('loop prevention reset');
                return 'error'
            }  
        } else {
            return random
        }
    };

    try {
        for (let i=0 ; i<9 ; i++) {
            let number = await generateNumber(numbers , i);
            if (number === 'error') {
                console.log('loop prevention reset')
                i = -1
            } else {
                numbers.push(number)
            }
        };

        console.log('Row_D' , numbers)
    
        const data = await RowD.create({
            id: uuid.v4() ,
            values: numbers 
        });
        return data

    } catch (error) {
        console.log(error);
        return error
    }
};

const findRowDById = async(id) => {
    return await RowD.findOne({
        where: {
            id
        }
    })
};

module.exports = {
    createRowD ,
    findRowDById
}