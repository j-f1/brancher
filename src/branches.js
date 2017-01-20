const git = require('quick-git')
const interactor = require('./interactor')

exports.getBranch = what => {
  return git.branches().then(branches => branches.filter(br => br.current)[0].name).catch(e => {
    interactor.failTo(what, e)
  })
}

const BRANCHES = require('./conf').branchNames

exports.BRANCHES = BRANCHES

exports.type = name => {
  if (typeof name !== 'string') {
    return null
  } else if (name === BRANCHES.master) {
    return 'master'
  } else if (name === BRANCHES.develop) {
    return 'develop'
  } else if (name.startsWith(BRANCHES.releasePrefix)) {
    return 'release'
  } else if (name.startsWith(BRANCHES.hotfixPrefix)) {
    return 'hotfix'
  } else if (name.startsWith(BRANCHES.featurePrefix) && BRANCHES.featurePrefix) {
    return 'feature'
  }
}
