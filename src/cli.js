require('./conf')

const commands = require('./commands')
const interactor = require('./interactor')
const args = process.argv.slice(2)
const chalk = require('chalk')
const help = `Try \`${chalk.bold.underline(require('../package.json').name + ' --help')}\` for help.`

const findCommand = (name, cmds) => {
  if (cmds.hasOwnProperty(name)) {
    return cmds[name]
  } else {
    for (const key of Object.keys(cmds)) {
      if ((cmds[key].alternates || []).includes(name)) {
        return cmds[key]
      }
    }
  }
}

const command = args[0]
if (!command) {
  interactor.fail(`No command specified. ${help}`)
  process.exit()
} else if (findCommand(command, commands)) {
  Promise.resolve(findCommand(command, commands)(...args.slice(1))).then(interactor.close.bind(interactor)).catch(e => {
    interactor.failTo(`run the command ${chalk.bold(command)}`, e)
    process.exit()
  })
} else {
  interactor.warn(`Command ${chalk.red(command)} not recognized. ${help}`)
  process.exit()
}

process.on('exit', () => interactor.close())
