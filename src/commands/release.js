const { commonMake, saveIntoDevelopAndMaster } = require('./util')

exports.make = commonMake('release')
exports.save = saveIntoDevelopAndMaster('release')
