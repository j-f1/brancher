const opts = require('lodash.clonedeep')(require('./full'))

delete opts._
delete opts.configs
delete opts.config

require('./invariant')(opts)

module.exports = opts
