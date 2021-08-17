const { Collection } = require('discord.js')
const { FoxDispatcher } = require('@modularium/fox')
const { SlashDispatcher } = require('./SlashDispatcher')
const moment = require('moment')

class RopeError extends Error {
  constructor (message) {
    super(message)
    this.name = 'RopeError'
  }
}

class RopePlugin {
  constructor (bot) {
    Object.defineProperty(this, 'bot', {
      get: () => bot,
      set: () => {
        this.err('Bot property cannot be changed!')
      }
    })

    this.list = {
      internal: new Collection(),
      external: new Collection()
    }

    this.commands = new FoxDispatcher()

    const slashCommands = new SlashDispatcher()

    slashCommands.deploy = async (cfg) => {
      slashCommands._commands.forEach(async (command) => {
        const deployingCommand = command.toDeploy()

        if (Array.isArray(cfg.guildId)) {
          cfg.guildId.forEach(async guildId => {
            if (cfg.global) { await this.bot.application.commands.create(deployingCommand) } else { await this.bot.guilds.cache.get(guildId).commands.create(deployingCommand) }
          })

          return
        }

        if (cfg.global) { await this.bot.application.commands.create(deployingCommand) } else { await this.bot.guilds.cache.get(cfg.guildId).commands.create(deployingCommand) }
      })
    }

    this.slashCommands = slashCommands

    this.log = (message, prefix) => {
      const prefixes = [moment().format('HH:mm:ss'), prefix].filter(Boolean)
      console.log(`[${prefixes.join(' | ')}]:`, message)
    }

    this.info = (message) => this.log(message, 'INFO'.x2)

    this.err = (message) => this.log(message, 'ERR'.x196)

    this.warn = (message) => this.log(message, 'WARN'.x220)

    this.pluginInfo = (message) => this.log(message, 'PLUGINS'.x38)

    this.designInfo = (message) => this.log(message, 'DESIGNS'.x76)

    this.updateInfo = (message) => this.log(message, 'UPDATE'.x41)

    this.foxLog = (message) => this.log(message, 'FOX'.x208)
  }
}

module.exports = {
  RopePlugin,
  RopeError
}
