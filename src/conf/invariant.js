const chalk = require('chalk')
const listify = require('listify')

const interactor = require('../interactor')

module.exports = (conf) => {
  const {branchNames: BRANCHES} = conf
  const badPrefixes = Object.keys(BRANCHES).filter(key => key.endsWith('Prefix')).filter(key => !BRANCHES[key].length)
  if (badPrefixes.length > 1) {
    interactor.fail(`The branch name configuration specifies empty prefixes for the ${listify(badPrefixes.map(key => key.replace(/Prefix$/, '')).map(type => chalk.bold.red(type)))} branch types. Please change your configuration to provide prefixes for these branch types.`)
    process.exit(1)
  }
}
