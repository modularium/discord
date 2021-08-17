const bot = require('./bot')
if (process.stdout.hasColors(256)) require('colors-cli/toxic')
const util = require('util')
const { Intents } = require('discord.js')

class Config {
  constructor (config) {
    let proto = Object.getPrototypeOf(this)

    proto = { ...proto, ...config }

    Object.setPrototypeOf(this, proto)

    if (!this.bot.token) {
      console.log('Please, provide a token in a config\n\nExample:\nmodularium.run(%s)\n', util.inspect({ bot: { token: 'here_goes_your_token' } }, { showHidden: false, depth: 2, compact: false }))
      process.exit(1337)
    }

    // defaults
    this.lang ??= 'en_US'
    this.features ??= {}
    this.features.updates ??= true
    this.features.mbErrors ??= true
    this.bot.options ??= {}
    this.bot.options.intents ??= [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
    this.features.plugins ??= {}
    this.features.plugins.loadLocal ??= true
  }
}

module.exports.run = async (cfg) => {
  const config = new Config(cfg)

  bot.login(config)
}
