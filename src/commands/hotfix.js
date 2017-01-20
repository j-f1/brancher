const { commonMake, saveIntoDevelopAndMaster } = require('./util')
const git = require('quick-git')
const { BRANCHES } = require('../branches')

exports.make = commonMake('hotfix', BRANCHES.master)
exports.save = (...args) => git.branches().then(branches => {
  const release = (branches.filter(({name}) => name.startsWith(BRANCHES.releasePrefix))[0] || {}).name
  if (release) {
    return saveIntoDevelopAndMaster('hotfix', [BRANCHES.master, release])(...args)
  } else {
    return saveIntoDevelopAndMaster('hotfix')(...args)
  }
})
