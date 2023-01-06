const RowG = require('../../models/Rows/RowG.models');
const uuid = require('uuid');

const createRowG = async() => {
    const data = await RowG.create({
        id: uuid.v4() ,
        values: [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0]
    });
    return data
};

const findRowGById = async(id) => {
    return await RowG.findOne({
        where: {
            id
        }
    })
};

module.exports = {
    createRowG ,
    findRowGById
}