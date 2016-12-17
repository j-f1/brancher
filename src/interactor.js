// ///////////////////////////////////////
// Logging, Deforestation, & Prompting //
// ///////////////////////////////////////

const chalk = require('chalk')
const readline = require('readline')

const bind = (self, keys) => keys.forEach(key => {
  self[key] = self[key].bind(self)
})

class Interactor {
  constructor (input, output) {
    this._input = input || process.stdin
    this._output = output || process.stdout

    bind(this, ['log', 'fail', 'failTo', 'ok', 'info', 'warn', 'ask', 'close', 'formatBranch'])
    this.br = this.formatBranch
  }
  log (message) {
    // if (fake) {
    //     const a2h = new (require('ansi-to-html'))({fg: '#000', bg: '#fff', newline: true});
    //     console.log(`<code>${a2h.toHtml(message)}</code>`);
    // } else {
    this._output.write((message || '') + '\n')
    // }
  }
  formatBranch (branch) {
    if (typeof branch === 'string') {
      return chalk.bold.underline(branch)
    }
    if (branch == null) {
      return chalk.bold.yellow.underline('(no branch)')
    }
  }
  fail (what, err) {
    let debugStr = ''
    if (process.env.NODE_ENV !== 'production' && (err || {}).stack) {
      debugStr = '\n' + chalk.yellow(err.stack)
    }
    this.log(`${chalk.red('✗')} ${what}${err ? '\n' + chalk.bold.red(err.stderr || err.message || err) + debugStr : ''}`)
  }
  failTo (what, err) {
    this.fail(`Failed to ${what}!`, err)
  }
  ok (what, out) {
    this.log(`${chalk.green('✓')} ${what}${out ? '\n' + chalk.bold.green(out) : ''}`)
  }
  info (what, out) {
    this.log(`${chalk.bold.cyan('i')} ${what}${out ? '\n' + chalk.bold(out) : ''}`)
  }
  warn (what, out) {
    this.log(`${chalk.bold.yellow('!')} ${what}${out ? '\n' + chalk.bold.yellow(out) : ''}`)
  }
  ask (query) {
    if (!this.rl) {
      this.rl = readline.createInterface({
        input: this._input,
        output: this._output,
        prompt: ''
      })
    }
    query = `${chalk.bold.cyan('?')} ${query} `
    // if (fake) {
    //   return Promise.resolve('feat')
    // } else {
    return new Promise(resolve => this.rl.question(query, resolve))
    // }
  }
  close () {
    this.rl && this.rl.close()
  }
}

module.exports = new Interactor()
