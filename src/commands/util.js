const yn = require('yn')
const chalk = require('chalk')
const listify = require('listify')
const minimist = require('minimist')

const git = require('quick-git')
const conf = require('../conf')
const { BRANCHES, type, getBranch } = require('../branches')

exports.make = ({ prefix, prompt, run }) => (interactor, suffix, ...args) => {
  const { ask, failTo, info, br } = interactor
  const prom = suffix ? Promise.resolve(suffix) : ask(prompt)
  return prom.then(suffix => suffix
    ? run(interactor, suffix, ...args).catch(e => failTo(`create the branch ${br(prefix + suffix)}`, e))
    : info('Cancelled!')
  )
}

exports.save = ({ kind, targets, run }) => (interactor, ...args) => {
  const { ask, ok, fail, failTo, br, info } = interactor
  return git.ready().then(ready => ready
    ? getBranch('save the branch').then(branch => {
      if (type(branch) === kind) {
        ok(`Current branch is a ${kind} branch: ${br(branch)}`)
        return ask(`Are you sure you want to merge the branch ${br(branch)} into ${listify(targets.map(target => br(target)))} and delete it? (y/n)`).then(ans => {
          if (yn(ans, {lenient: true})) {
            return run(interactor, branch, ...args)
          } else {
            info('Cancelled.')
            process.exit()
          }
        })
      } else {
        throw new Error(`Current branch is not a feature branch: ${br(branch)}`)
      }
    }).catch((code, e) => {
      failTo('save the branch', e || code)
    }) : fail(`Working directory not clean. Try ${chalk.bold('git stash')} to save any pending changes.`)
  )
}

exports.commonMake = (kind, source, prompt) => exports.make({
  prefix: BRANCHES[kind + 'Prefix'],
  prompt: prompt || 'What is the next version?',
  run: ({ ok, br }, version) => git.run(['checkout', source || BRANCHES.develop], ['checkout', '-b', BRANCHES[kind + 'Prefix'] + version])
                                   .then(() => ok(`Switched to the new ${kind} branch ${br(BRANCHES[kind + 'Prefix'] + version)}`))
})

exports.getTagParams = (...args) => {
  const opts = minimist(args)
  const extraTagParams = []
  if (opts.s || JSON.parse(conf.sign)) {
    extraTagParams.push('-s')
  } else if (opts.u || conf.signingName) {
    extraTagParams.push('-u', opts.u)
  }
  return extraTagParams
}

exports.saveIntoDevelopAndMaster = (kind, targets = [BRANCHES.master, BRANCHES.develop]) => exports.save({
  kind,
  targets,
  run: ({ ok, br }, branch, ...args) => {
    const version = branch.replace(new RegExp('^' + BRANCHES[kind + 'Prefix']), '')
    return git.run(['checkout', targets[0]], ['merge', '--no-ff', branch])
              .then(() => ok(`Merged ${br(branch)} into ${br(targets[0])}`))
              .then(() => git.run(['tag', version, ...exports.getTagParams(args)], ['checkout', targets[1]], ['merge', '--no-ff', branch]))
              .then(() => ok(`Merged ${br(branch)} into ${br(targets[1])}`))
              .then(() => git.branch('-d', branch))
  }
})
