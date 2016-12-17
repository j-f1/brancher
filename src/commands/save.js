const { type, getBranch } = require('../branches')

module.exports = ({ br, failTo }, ...args) => getBranch('save the branch').then(branch => {
  const commands = require('.') // make sure that all commands are available.
  switch (type(branch)) {
    case 'feature':
      return commands['save-feature'](...args)
    case 'release':
      return commands['save-release'](...args)
    case 'hotfix':
      return commands['save-hotfix'](...args)
    default:
      failTo('save the branch', `Current branch ${br(branch)} is not a feature, release, or hotfix branch.`)
      break
  }
})
