const git = require('quick-git')
const { BRANCHES } = require('../branches')
const chalk = require('chalk')
const NAME = require('../../package.json').name

module.exports = ({ ok, failTo }) => {
  return git.createOrSwitch('checkout', '-b', BRANCHES.master)
            .then(() => git.createOrSwitch('checkout', '-b', BRANCHES.develop))
            .then(() => ok(`Added branches ${BRANCHES.master} and ${BRANCHES.develop}. Try ${chalk.bold(NAME + ' make-feature')} to get started.`))
            .catch(err => failTo(`initialize ${NAME}`, err))
}
