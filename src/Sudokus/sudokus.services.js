const sudokusControllers = require('./sudokus.controllers');

const postSudoku = (req , res) => {
    sudokusControllers.createSudoku()
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
};

const postN = (req ,res) => {
    const number = req.params.number;
    sudokusControllers.createN(number)
        .then(data => {
            if (data) {
                res.status(201).json({
                    message: `created ${data} of ${number} sudokus`
                })
            } else {
                res.status(400).json({
                    message: 'mission failed'
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
};

const getAllSudokus = (req , res) => {
    sudokusControllers.findAllSudokus()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
};

const getRandomSudoku = (req ,res) => {
    sudokusControllers.findRandomSudoku()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
};

module.exports = {
    postSudoku ,
    postN ,
    getAllSudokus ,
    getRandomSudoku
}