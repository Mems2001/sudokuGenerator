const RowE = require('../../models/Rows/RowE.models');
const uuid = require('uuid');
const { findRowAById } = require('../RowA/rowA.controllers');
const { findRowBById } = require('../RowB/rowB.controllers');
const { findRowCById } = require('../RowC/rowC.controllers');
const { findRowDById } = require('../RowD/rowD.controllers');

const createRowE = async(idA , idB , idC , idD) => {
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
        } else if (z>2 && z<6) {
            quadrants.q2.push(rowD.values[z]);
        } else if (z>5 && z<9) {
            quadrants.q3.push(rowD.values[z])
        }
    };

    const generateRandom = () => {
        const random = Math.ceil(Math.random() * 9);
        return random
    };

    const checkQCA = (quadrant , column , array , n) => {
        let valueB = false;
        for (number of quadrant) {
            if (n === number) {
                valueB = true;
                // console.log(n ,'repeated quadrant');
                break
            }
        };
        for (digit of column) {
            if (n === digit) {
                valueB = true;
                // console.log(n ,'repeated column');
                break;
            }
        }; 
        for (symbol of array) {
            if (n === symbol) {
                valueB = true;
                // console.log(n ,'repeated array');
                break
            }
        };
        return valueB
    };

    const verifyDuplicate = (n , array , j) => {
        let value = false;
        let quadrant = undefined;

        if (j<3) {
            quadrant = quadrants.q1;
            // console.log('quadrant 1')
        } else if (j>2 && j<6) {
            quadrant = quadrants.q2;
            // console.log('quadrant 2')
        } else if (j>5 && j<9) {
            quadrant = quadrants.q3;
            // console.log('quadrant 3')
        }

        // console.log(quadrant)

        let Qkeys = [];
        let Ckeys1 = [];
        let Ckeys2 = [];
        let Ckeys3 = [];
        let Ckeys1Conflict = 0;
        let Ckeys2Conflict = 0;
        let Ckeys3Conflict = 0;
        
            for (number of quadrants.q3) {
                let exists = false;
                for (digit of array) {
                    // console.log(number , digit);
                    if (number === digit) {
                        exists = true
                    }
                };
                if (exists === false) {
                    // console.log(number ,'is a key!')
                    Qkeys.push(number)
                }
            };
        // console.log('Quadrant keys:' , Qkeys);
        
        for (number of columns[2]) {
            let exists = false;
            for (digit of quadrants.q1) {
                if (number === digit) {
                    exists = true
                };
            };
            if (!exists) {
                Ckeys1Conflict = Ckeys1Conflict + 1;
            }
            for (symbol of array) {
                if (symbol === number) {
                    exists = true
                }
            };
            if (!exists) {
                Ckeys1.push(number)
            }
        };      
        for (number of columns[5]) {
            let exists = false;
            for (digit of quadrants.q2) {
                if (number === digit) {
                    exists = true
                };
            };
            if (!exists) {
                Ckeys2Conflict = Ckeys2Conflict + 1;
            }
            for (symbol of array) {
                if (symbol === number) {
                    exists = true
                }
            };
            if (!exists) {
                Ckeys2.push(number)
            }
        };
        for (number of columns[8]) {
            let exists = false;
            for (digit of quadrants.q3) {
                if (number === digit) {
                    exists = true
                };
            };
            if (!exists) {
                Ckeys3Conflict = Ckeys3Conflict + 1;
            }
            for (symbol of array) {
                if (symbol === number) {
                    exists = true
                }
            };
            if (!exists) {
                Ckeys3.push(number)
            }
        };
        // console.log(array , 'Column Keys:' , Ckeys1 , Ckeys1Conflict , Ckeys2 , Ckeys2Conflict , Ckeys3 , Ckeys3Conflict , n , j);

        let Skeys = 0;
        let maxProb = undefined;
        let max = undefined;
        for (number of columns[5]) {
            let exists = false ;
            for (digit of quadrants.q3) {
                if (number === digit) {
                    exists = true;
                    break
                }
            };
            if (exists) {
                Skeys = Skeys + 1
            }
        };

        if (Skeys === 3) {
            maxProb = 18;
            max = (j+1)*2*(Qkeys.length)
        } else {
            maxProb = 24;
            if (j>2 && j<6 && Qkeys.length===(6-j)) {
                max = 100
            } else {
                max = (j+1)*2*(Qkeys.length)
            }
        };
        // console.log('Max Prob:' , maxProb , columns[5]);

        const Prior = (array , n) => {
            let notPrior = true;
            for (number of array) {
                if (n === number) {
                    notPrior = false
                }
            };
            return notPrior
        }; 
        const QPrior = () => {
            let value = 0;
            let value2 = false
            for (number of Qkeys) {
                if (checkQCA(quadrant , columns[j] , array , number)) {
                    value = value + 1
                }
            };
            if (value === Qkeys.length) {
                value2 = checkQCA(quadrant , columns[j] , array , n)
            } else {
                let exists = false
                for (digit of Qkeys) {
                    if (n === digit) {
                        exists = true
                    }
                };
                if (!exists) {
                    value2 = true
                }
            };
            return value2
        };

        const dice = Math.ceil(Math.random() * maxProb);

        if ((Ckeys1Conflict===3) || (Ckeys2Conflict===3) || (Ckeys3Conflict===3)) {
            if (j<3 && Ckeys2Conflict===3 && Ckeys2.length===1) {
                if (n === Ckeys2[0]) {
                    // console.log(n , Ckeys2[0] , 'avoided')
                    return true
                }
            };
            if (j<6 && Ckeys3Conflict===3 && Ckeys3.length===1) {
                if (n === Ckeys3[0]) {
                    // console.log(n , Ckeys3[0] , 'avoided')
                    return true
                }
            };
            if (j===1 && Ckeys1Conflict===3 && Ckeys1.length===3) {
                value = Prior(Ckeys1 , n)
            } else if (j===4 && Ckeys2Conflict===3 && Ckeys2.length===3) {
                value = Prior(Ckeys2 , n)
            } else if (j===7 && Ckeys3Conflict===3 && Ckeys3.length===3) {
                value = Prior(Ckeys3 , n)
            } else if (dice < max) {
                value = QPrior()
            } else {
                value = checkQCA(quadrant , columns[j] , array , n)
            }
        } else if (dice < max) {
            value = QPrior()
        } else {
            value = checkQCA(quadrant , columns[j] , array , n)
        };

        if (Ckeys3.length===0 && j===6 && Ckeys3Conflict===3) {
            // console.log('inviable row')
            value = true
        }

    return value
    };

    let loopControl = [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0]

    const generateNumber = (array , j) => {
        // console.log(loopControl , j);
        const random = generateRandom();
        if (verifyDuplicate(random , array , j)) {
            loopControl[j] ++ ;
                if (loopControl[j] <= 50) {
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
                console.log('loop prevention reset E')
                i = -1
            } else {
                numbers.push(number)
            }
        };
        console.log('Row_E' , numbers);

        const data = await RowE.create({
            id: uuid.v4() ,
            values: numbers
        });
        return data
    } catch (error) {
        console.log(error);
        return null
    }

}; 

const findRowEById = async(id) => {
    return await RowE.findOne({
        where: {
            id
        }
    })
};

module.exports = {
    createRowE ,
    findRowEById
}