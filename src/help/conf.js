const NAME = require('../package.json').name
const chalk = require('chalk')

module.exports = `
${NAME} uses ${chalk.bold('rc')}.
You can create a ${chalk.bold(`.${NAME}rc`)} in any directory,
and ${NAME} will interpret it as either INI or JSON.

You can also set environment variables:
an environment variable named ${chalk.bold(NAME + '_' + chalk.gray('{key}'))} will set the ${chalk.bold.gray('{key}')} config key.
Use ${chalk.bold(NAME + '_' + chalk.gray('{key 1}') + '__' + chalk.gray('{key 2}'))} to set deep property values.

You can also pass arguments to ${NAME}. Passing ${chalk.bold('--' + chalk.gray('{key}'))} will set the ${chalk.bold.gray('{key}')} config key.
Use dot notation to set deep property values.
`.slice(1, -1)
