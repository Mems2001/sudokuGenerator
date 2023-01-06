const RowH = require('../../models/Rows/RowH.models');
const uuid = require('uuid');

const createRowH = async() => {
    const data = await RowH.create({
        id: uuid.v4() ,
        values: [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0]
    });
    return data
};

const findRowHById = async(id) => {
    return await RowH.findOne({
        where: {
            id
        }
    })
};

module.exports = {
    createRowH ,
    findRowHById
}