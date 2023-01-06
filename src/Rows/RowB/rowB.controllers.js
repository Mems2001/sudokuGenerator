const RowB = require('../../models/Rows/RowB.models');
const uuid = require('uuid');
const { findRowAById } = require('../RowA/rowA.controllers');

const createRowB = async(id) => {
    const RowA = await findRowAById(id);

    const quadrants = {
        q1: [] ,
        q2: [] ,
        q3: []
    }

    for (let y=0 ; y<9 ; y++) {
        if (y<3) {
            quadrants.q1.push(RowA.values[y])
        } else if (y>2 && y<6) {
            quadrants.q2.push(RowA.values[y])
        } else if (y>5 && y<9) {
            quadrants.q3.push(RowA.values[y])
        }
    }
    // const q1 = [RowA.values[0] , RowA.values[1] , RowA.values[2]]
    // const q2 = [RowA.values[3] , RowA.values[4] , RowA.values[5]]
    // const q3 = [RowA.values[6] , RowA.values[7] , RowA.values[8]]

    const numbers = [];

    const generateRandom = () => {
        const random = Math.ceil(Math.random()*9);
        return random
    };

    const verifyDuplicate = (n , array , j) => {
        let quadrant = 0;
        let value = false;

        if (j <= 3) {
            quadrant = quadrants.q1;
            // console.log('quadrant 1')
        } else if (4 <= j && j <= 6) {
            quadrant = quadrants.q2;
            // console.log('quadrant 2' , q3)
        } else if (7 <= j) {
            quadrant = quadrants.q3;
            // console.log('quadrant 3')
        };
        // console.log(n , array , quadrant , j);

        if (quadrant == quadrants.q2) {
            const keys = [];
            for (number of quadrants.q3) {
                let exist = false;
                for (digit of array) {
                    if (digit === number) {
                        exist = true;
                        break
                    }
                };
                if (exist === false) {
                    keys.push(number)
                }
            };
            // console.log('keys:' , keys);

            if (keys.length === (6 - array.length)) {
                for (num of keys) {
                    if (num === n) {
                        value = false;
                        break
                    } else {
                        value = true
                    }
                } 
            } else {
                for (number of quadrant) {
                    if (n === number) {
                        value = true;
                        break
                    }};
                for (digit of array) {
                    if (n === digit) {
                        value = true;
                        break
                    }
                }
            }
        } else {
            for (number of quadrant) {
                if (n === number) {
                    value = true;
                    break
                }};
            for (digit of array) {
                if (n === digit) {
                    value = true;
                    break
                }
            }
        };

        return value
    };

    const generateNumber = (i , array) => {
        const random = generateRandom();
        if (verifyDuplicate(random , array , i)) {
            return generateNumber(i , array)
        } else {
            return random
        }
    };
    
    try {
        for (let k=1 ; k<10 ; k++) {
            const n = await generateNumber(k , numbers);
            numbers.push(n)
            }
        
        // console.log('numbers' , numbers)

        const data = await RowB.create({
            id: uuid.v4() ,
            // rowId ,
            // first: numbers[0] ,
            // second: numbers[1] ,
            // third: numbers[2] ,
            // fourth: numbers[3] ,
            // fifth: numbers[4] ,
            // sixth: numbers[5] ,
            // seventh: numbers[6] ,
            // eighth: numbers[7] ,
            // ninth: numbers[8] ,
            values: numbers
        });
        return data

    } catch (error) {
        return console.log(error)
    }
};

const findRowBById = async(id) => {
    return await RowB.findOne({
        where: {
            id
        }
    })
};

module.exports = {
    createRowB ,
    findRowBById
}