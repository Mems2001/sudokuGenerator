const Quadrants = require("./Quadrants.models")
const Rows = require("./Rows.models")
const RowA = require("./Rows/RowA.models")
const RowB = require("./Rows/RowB.models")
const RowC = require("./Rows/RowC.models")
const RowD = require("./Rows/RowD.models")
const RowE = require("./Rows/RowE.models")
const RowF = require("./Rows/RowF.models")
const RowG = require("./Rows/RowG.models")
const RowH = require("./Rows/RowH.models")
const RowI = require("./Rows/RowI.models")
const Sudokus = require("./Sudokus.models")

const initModels = () => {
    Rows.hasOne(Sudokus)
    Sudokus.belongsTo(Rows)

    Quadrants.hasOne(Sudokus)
    Sudokus.belongsTo(Quadrants)

    // ROW RELATIONS 

    RowA.hasOne(Rows)
    Rows.belongsTo(RowA)

    RowB.hasOne(Rows)
    Rows.belongsTo(RowB)

    RowC.hasOne(Rows)
    Rows.belongsTo(RowC)

    RowD.hasOne(Rows)
    Rows.belongsTo(RowD)

    RowE.hasOne(Rows)
    Rows.belongsTo(RowE)

    RowF.hasOne(Rows)
    Rows.belongsTo(RowF)

    RowG.hasOne(Rows)
    Rows.belongsTo(RowG)

    RowH.hasOne(Rows)
    Rows.belongsTo(RowH)

    RowI.hasOne(Rows)
    Rows.belongsTo(RowI)
}

module.exports = initModels