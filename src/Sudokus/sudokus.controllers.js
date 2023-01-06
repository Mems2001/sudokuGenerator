const Sudokus = require('../models/Sudokus.models');
const uuid = require('uuid');
const { createRows } = require('../Rows/rows.controllers');
const Rows = require('../models/Rows.models');
const RowA = require('../models/Rows/RowA.models');
const RowB = require('../models/Rows/RowB.models');
const RowC = require('../models/Rows/RowC.models');
const { createQuadrants } = require('../Quadrants/quadrants.controllers');
const Quadrants = require('../models/Quadrants.models');
const RowD = require('../models/Rows/RowD.models');
const RowE = require('../models/Rows/RowE.models');

const createSudoku = async() => {
    try {
        const Rows = await createRows();
        const Quadrants = await createQuadrants(Rows.id);
        const data = await Sudokus.create({
            id: uuid.v4() ,
            rowId: Rows.id ,
            quadrantId: Quadrants.id
        });
        return data
    } catch (error) {
        return console.log(error)
    }
};

const createN = async(number) => {
    let quantity = 0;
    try {
        for (let i=0 ; i<number ; i++) {
            const S = await createSudoku();
            if (S) {
                quantity ++
            }
        };
        return quantity
    } catch (error) {
        console.log(error);
        return null
    }
};

const findAllSudokus = async() => {
    return await Sudokus.findAll({
        include: [{
            model: Rows , 
            attributes: {
                exclude: ['rowAId' , 'rowBId' , 'rowCId' , 'rowDId' , 'rowEId']
                } ,
            include: [
                {model: RowA ,
                attributes: {
                    exclude: ['id']
                }} ,
                {model: RowB ,
                attributes: {
                    exclude: ['id']
                }} ,
                {model: RowC ,
                attributes: {
                    exclude: ['id']
                }} ,
                {model: RowD ,
                attributes: {
                    exclude: ['id']
                }} ,
                {model: RowE ,
                attributes: {
                    exclude: ['id']
                }} 
            ] 
        } , {
            model: Quadrants ,
            attributes: {
                exclude: ['id']
            }
        }
    ] ,
    attributes: ['id'] 
    })
}; 

const findRandomSudoku = async() => {
    const generateRandom = (length) => {
        const random = Math.ceil(Math.random() * length);
        console.log(random)
        return random-1
    };

    try {
        const set = await findAllSudokus()
        const random = set[generateRandom(set.length)]

        return random
    } catch (error) {
        return null
    }
};

module.exports = {
    createSudoku ,
    createN ,
    findAllSudokus ,
    findRandomSudoku
}