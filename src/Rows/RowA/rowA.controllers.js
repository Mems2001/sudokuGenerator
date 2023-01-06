const RowA = require('../../models/Rows/RowA.models');
const uuid = require('uuid');

const createRowA = async() => {
    const numbers = []

    const generateRandom = () => {
        const random = Math.ceil(Math.random()*9);
        return random
    };

    const verifyDuplicate = (n , array) => {
        let value = false;
        for (x of array) {
            if (n === x) {
                value = true;
                break
            }
        };
        return value
    };

    const generateOther = (array) => {
        const random = generateRandom();
        if (verifyDuplicate(random , array)) {
            return generateOther(array)
        } else {
            return random
        }
    };

    try {
        const a1 = await generateRandom();
        numbers.push(a1);

        for (let i = 2 ; i < 10 ; i++) {
            const n = await generateOther(numbers);
            numbers.push(n)
        }

        if (numbers.length !== 9) {
            return undefined
        }

        // console.log(numbers)

        const data = await RowA.create({
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
        console.log(error)
        return error
    }
};

const findRowAById = async(id) => {
    return await RowA.findOne({
        where: {
            id
        }
    })
};

module.exports = {
    createRowA ,
    findRowAById
}