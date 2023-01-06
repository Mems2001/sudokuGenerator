const RowI = require('../../models/Rows/RowI.models');
const uuid = require('uuid');

const createRowI = async() => {
    const data = await RowI.create({
        id: uuid.v4() ,
        values: [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0]
    });
    return data
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