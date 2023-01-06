const RowC = require('../../models/Rows/RowC.models');
const uuid = require('uuid');
const { findRowAById } = require('../RowA/rowA.controllers');
const { findRowBById } = require('../RowB/rowB.controllers');

const createRowC = async(idA , idB) => {

    const numbers = [];
    const rowA = await findRowAById(idA);
    const rowB = await findRowBById(idB);

    // const q1 = [rowA.first , rowA.second , rowA.third , rowB.first , rowB.second , rowB.third];
    // const q2 = [rowA.fourth , rowA.fifth , rowA.sixth , rowB.fourth , rowB.fifth , rowB.sixth];
    // const q3 = [rowA.seventh , rowA.eighth , rowA.ninth , rowB.seventh , rowB.eighth , rowB.ninth];

    const quadrants = {
        q1: [] ,
        q2: [] ,
        q3: [] 
    };

    for (let y=0 ; y<9 ; y++) {
        if (y<3) {
            quadrants.q1.push(rowA.values[y]);
            quadrants.q1.push(rowB.values[y])
        } else if (y>2 && y<6) {
            quadrants.q2.push(rowA.values[y]);
            quadrants.q2.push(rowB.values[y])
        } else if (y>5 && y<9) {
            quadrants.q3.push(rowA.values[y]);
            quadrants.q3.push(rowB.values[y])
        }
    }

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
            // console.log('quadrant 2' , quadrants.q3)
        } else if (7 <= j) {
            quadrant = quadrants.q3;
            // console.log('quadrant 3')
        };
        // console.log(n , array , quadrant , j);

        // if (quadrant == quadrants.q2) {
        //     const keys = [];
        //     for (number of quadrants.q3) {
        //         let exist = false;
        //         for (digit of array) {
        //             if (digit === number) {
        //                 exist = true;
        //                 break
        //             }
        //         };
        //         if (exist === false) {
        //             keys.push(number)
        //         }
        //     };
        //     // console.log('keys:' , keys);

        //     if (keys.length === (6 - array.length)) {
        //         for (num of keys) {
        //             if (num === n) {
        //                 value = false;
        //                 break
        //             } else {
        //                 value = true
        //             }
        //         } 
        //     } else {
        //         for (number of quadrant) {
        //             if (n === number) {
        //                 value = true;
        //                 break
        //             };
        //             for (digit of array) {
        //                 if (n === digit) {
        //                     value = true;
        //                     break
        //                 }
        //             }
        //         }
        //     }
        // } else {
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
            };           
        // };
        return value
    };

    const generateNumber = (i , array) => {
        const random = generateRandom();
        // console.log(random , array)
        if (verifyDuplicate(random , numbers , i)) {
            return generateNumber(i , array)
        } else {
            return random
        }
    };

    try {
        for (let i=1 ; i<10 ; i++) {
            const x = await generateNumber(i , numbers);
            // console.log(x)
            numbers.push(x)
        };

        // console.log(numbers)
        
        const data = await RowC.create({
            id: uuid.v4() ,
            values: numbers
        });
        return data
    } catch (error) {
        console.log(error)
    }
};

const findRowCById = async(id) => {
    return await RowC.findOne({
        where: {
            id
        }
    })
};

module.exports = {
    createRowC ,
    findRowCById
}