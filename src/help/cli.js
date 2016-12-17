const chalk = require('chalk')
const listify = require('listify')

const NAME = require('../../package.json').name

module.exports = ({log: l}) => {
  l(chalk.bold(`${NAME}: a git branch manager`))
  l(`Based on Vincent Driessen’s branching model (${chalk.cyan.underline('http://nvie.com/posts/a-successful-git-branching-model/')})`)

  l('\n' + chalk.bold.underline('USAGE'))
  const cmds = require('../commands')
  const keys = Object.keys(cmds)
  keys.filter(cmd => typeof cmds[cmd] === 'function').forEach((cmd, i) => {
    l(chalk.bold.green(cmd))
    if (cmds[cmd].alternates) {
      l(`Alternates: ${listify(cmds[cmd].alternates.map(alt => chalk.green(alt)))}`)
    }
    l(cmds[cmd].docs || chalk.yellow('<No Docs>'))
    l()
  })

  l('\n' + chalk.bold.underline('CONFIGURATION'))
  l(require('./conf'))

  l('\n' + chalk.underline('OPTIONS'))
  l(require('prettify-json')(require('../conf/defaults')))
}
