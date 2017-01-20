const git = require('quick-git')
const { BRANCHES } = require('../branches')
const { make, save } = require('./util')

exports.make = make({
  prefix: BRANCHES.featureBranch,
  prompt: 'What is the name of the feature?',
  run: ({ ok, failTo, br }, branch) => git.run(['checkout', BRANCHES.develop], ['checkout', '-b', BRANCHES.featurePrefix + branch])
                                          .then(() => ok(`Switched to the new feature branch ${br(BRANCHES.featurePrefix + branch)}`))
                                          .catch((e) => failTo('create the branch ' + br(BRANCHES.featurePrefix + branch), e))
})

exports.save = save({
  kind: 'feature',
  targets: [BRANCHES.develop],
  run: ({ ok, br }, branch) => git.run(['checkout', BRANCHES.develop], ['merge', '--no-ff', branch]).then(() => ok(`Merged ${br(branch)} into ${br(BRANCHES.develop)}`)).then(() => git.branch('-d', branch))
})
