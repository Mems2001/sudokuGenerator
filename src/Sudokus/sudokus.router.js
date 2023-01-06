const sudokusServices = require('./sudokus.services');
const router = require('express').Router();

router.route('/')
    .post(sudokusServices.postSudoku)
    .get(sudokusServices.getAllSudokus)

router.get('/random' , sudokusServices.getRandomSudoku)
router.post('/:number' , sudokusServices.postN)

module.exports = router