const RowF = require('../../models/Rows/RowF.models');
const uuid = require('uuid');
const { findRowAById } = require('../RowA/rowA.controllers');
const { findRowBById } = require('../RowB/rowB.controllers');
const { findRowCById } = require('../RowC/rowC.controllers');
const { findRowDById } = require('../RowD/rowD.controllers');
const { findRowEById } = require('../RowE/rowE.controllers');

const createRowF = async(idA , idB , idC , idD , idE) => {

    let numbers = [];
    const columns = [];
    const quadrants = {
        q1: [] ,
        q2: [] ,
        q3: []
    };

    const rowA = await findRowAById(idA);
    const rowB = await findRowBById(idB);
    const rowC = await findRowCById(idC);
    const rowD = await findRowDById(idD);
    const rowE = await findRowEById(idE);

    for (let y=0 ; y<9 ; y++) {
        const column = [];
        column.push(rowA.values[y]);
        column.push(rowB.values[y]);
        column.push(rowC.values[y]);
        columns.push(column)
    };

    for (let z=0 ; z<9 ; z++) {
        if (z<3) {
            quadrants.q1.push(rowD.values[z]);
            quadrants.q1.push(rowE.values[z]);
        } else if (z>2 && z<6) {
            quadrants.q2.push(rowD.values[z]);
            quadrants.q2.push(rowE.values[z]);
        } else if (z>5 && z<9) {
            quadrants.q3.push(rowD.values[z]);
            quadrants.q3.push(rowE.values[z]);
        }
    };

    const generateRandom = () => {
        return Math.ceil(Math.random() * 9)
    };

    const checkQCA = (quadrant , column , array , n) => {
        let value = false;
        for (number of quadrant) {
            if (n === number) {
                value=true;
                break
            }
        };
        for (digit of column) {
            if (n === digit) {
                value=true;
                break
            }
        };
        for (symbol of array) {
            if (n === symbol) {
                value=true;
                break
            }
        };
        return value
    };

    const Prior = (array , n) => {
        let exists = false;
        for (number of array) {
            if (number === n) {
                exists = true
            }
        };
        if (!exists) {
            // console.log('not key')
            return true
        } else {
            // console.log('is Key')
            return checkQCA(quadrant , column , numbers , n)
        }
    }

    const verifyDuplicate = (n , array , j) => {
        let value = false;
        let quadrant = undefined;
        let column = columns[j];

        if (j < 3) {
            quadrant = quadrants.q1
        } else if (j>=3 && j<=5) {
            quadrant = quadrants.q2
        } else if (j>=6 && j<= 8) {
            quadrant = quadrants.q3
        };

        
        const QKeys = {
            q1: [],
            q2: [],
            q3: []
        };
        const Ckeys = {
            0: [] ,
            1: [] ,
            2: [] ,
            3: [] ,
            4: [] ,
            5: [] ,
            6: [] ,
            7: [] ,
            8: [] ,
        };
        
        for (let i=1; i<10 ; i++ ) {
            let exists = false;
            for (number of quadrants.q1) {
                if (i === number) {
                    exists = true
                }
            };
            for (digit of array) {
                if (i === digit) {
                    exists = true
                }
            }
            if (!exists) {
                QKeys.q1.push(i)
            }
        };
        for (let i=1; i<10 ; i++ ) {
            let exists = false;
            for (number of quadrants.q2) {
                if (i === number) {
                    exists = true
                }
            };
            for (digit of array) {
                if (i === digit) {
                    exists = true
                }
            }
            if (!exists) {
                QKeys.q2.push(i)
            }
        };
        for (let i=1; i<10 ; i++ ) {
            let exists = false;
            for (number of quadrants.q3) {
                if (i === number) {
                    exists = true
                }
            };
            for (digit of array) {
                if (i === digit) {
                    exists = true
                }
            }
            if (!exists) {
                QKeys.q3.push(i)
            }
        };
        
        
            for (let i=0 ; i<3 ; i++) {
                for (number of columns[i]) {
                    for (digit of QKeys.q1) {
                        if (digit === number) {
                            Ckeys[i].push(digit)
                        }
                    }
                }
            }
        
        
            for (let i=3 ; i<6 ; i++) {
                for (number of columns[i]) {
                    for (digit of QKeys.q2) {
                        if (digit === number) {
                            Ckeys[i].push(digit)
                        }
                    }
                }
            }
        

            for (let i=6 ; i<9 ; i++) {
                for (number of columns[i]) {
                    for (digit of QKeys.q3) {
                        if (digit === number) {
                            Ckeys[i].push(digit)
                        }
                    }
                }
            }
        
        // console.log(quadrant , array , column , Ckeys , n , j);
        
        const Prior = (keys , n) => {
            let exists = false;
            for (number of keys) {
                if (number === n) {
                    exists = true
                }
            };
            if (!exists) {
                // console.log('not key')
                return true
            } else {
                // console.log('is Key')
                return checkQCA(quadrant , column , array , n)
            }
        }

        value = checkQCA(quadrant , column , array , n)

        if ((j===0)||(j===1)||(j===3)||(j===4)||(j===6)||(j===7)) {
            if ((j===0)||(j===3)||(j===6)) {
                if (Ckeys[j+1].length === 2) {
                    // console.log('Conflict in:' ,j , Ckeys[j+1] , QKeys)
                    value = Prior(Ckeys[j+1] , n)
                };
                if (Ckeys[j+2].length === 2) {
                    // console.log('Conflict in:' ,j , Ckeys[j+2] , QKeys)
                    value = Prior(Ckeys[j+2] , n)
                }
            } else if (((j===1)||(j===4)||(j===7)) && (Ckeys[j+1].length===2 || Ckeys[j+1].length===1)) {
                // console.log('Conflict in:' ,j , Ckeys[j+1] , QKeys)
                value = Prior(Ckeys[j+1] , n)
            }
        }

        return value
    };

    let loopControl = [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0];
    let specialLoopControl = 0;

    const generateNumber = (array , j) => {
        // console.log(loopControl , j);
        const random = generateRandom();
        if (verifyDuplicate(random , array , j)) {
            loopControl[j] ++ ;
            if (specialLoopControl === 50) {
                return 'fatal_error'
            } else {
                if (loopControl[j] <= 50) {
                    return generateNumber(array , j) 
                } else {
                    numbers = [];
                    specialLoopControl ++
                    loopControl = [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0]
                    // console.log('loop prevention reset');
                    return 'error'
                }  
            }
        } else {
            return random
        }
    };


    try {
        for (let i=0 ; i<9 ; i++) {
            let number = await generateNumber(numbers , i);
            if (number === 'fatal_error') {
                return null
            } else {
                if (number === 'error') {
                    console.log('loop prevention reset F')
                    i = -1
                } else {
                    numbers.push(number)
                }
            }
        };
        console.log('row_F' , numbers)
        const data = RowF.create({
            id: uuid.v4() ,
            values: numbers
            // [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0]
        });
        return data
    } catch (error) {
        console.log(error);
        return error
    }
};

const findRowFById = async(id) => {
    return await RowF.findOne({
        where: {
            id
        }
    })
};

module.exports = {
    createRowF ,
    findRowFById
}