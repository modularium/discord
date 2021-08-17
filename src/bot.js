const { Client } = require('discord.js')

const ms = require('./modules')

module.exports.login = (cfg) => {
  const { options, token } = cfg.bot

  const bot = new Client(options || {})

  bot.login(token)
    .catch(({ stack }) => {
      console.log('Unable to start the bot, reason:')
      console.error(`${stack}`)
      process.exit(1337)
    })

  delete cfg.bot.token

  ms(bot, cfg)
}
