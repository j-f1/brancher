const { BRANCHES } = require('../branches')
const interactor = require('../interactor')
const {formatBranch: br} = interactor

const annotate = (f, docs, alternates) => {
  const cmd = (...args) => Promise.resolve(f(interactor, ...args))
  Object.defineProperty(cmd, 'docs', {get: docs})
  cmd.alternates = alternates || []
  return cmd
}

exports['init'] = annotate(require('./init'), (DOC) => 'Initialize the repository with the necessary branches')

exports['make-feature'] = annotate(require('./feature').make, (DOC) => `Branch a new feature branch off of ${br(BRANCHES.develop)}`, ['feature', 'feat', 'f'])
exports['save-feature'] = annotate(require('./feature').save, (DOC) => `Save the current feature branch to ${br(BRANCHES.develop)}`)

exports['make-release'] = annotate(require('./release').make, (DOC) => `Branch a new feature branch off of ${br(BRANCHES.develop)}`, ['release', 'rel', 'r'])
exports['save-release'] = annotate(require('./release').save, (DOC) => `Save the current release branch to ${br(BRANCHES.develop)} and ${br(BRANCHES.master)}`)

exports['make-hotfix'] = annotate(require('./hotfix').make, (DOC) => `Branch a new feature branch off of ${br(BRANCHES.master)}`, ['hotfix', 'hot', 'h'])
exports['save-hotfix'] = annotate(require('./hotfix').save, (DOC) => `Save the current hotfix branch to ${br(BRANCHES.develop)} (or the current release branch) and ${br(BRANCHES.master)}`)

exports['save'] = annotate(require('./save'), (DOC) => `Save the current feature or release branch.`, ['s'])

exports['help'] = annotate(require('../help/cli'), (DOC) => 'View all commands', ['--help', '-h', '-?', 'h'])

exports['options'] = annotate(() => {
  interactor.log(require('prettify-json')(require('../conf')))
  return Promise.resolve()
}, (DOC) => 'View the current option set', ['opts'])
