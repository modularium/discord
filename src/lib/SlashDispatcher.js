const { FoxError } = require('@modularium/fox')
const { Collection } = require('discord.js')
const { EventEmitter } = require('events')

class SlashError extends FoxError {
  constructor (message) {
    super(message)
    this.name = 'FoxSlashError'
  }
}

class SlashCommand {
  constructor ({ name, description, options, execute }) {
    if (!name || !execute) throw new SlashError('No name or execute()')

    this.name = name
    this.description = description
    this.options = options
    this.execute = execute
  }

  toDeploy () {
    return {
      name: this.name,
      description: this.description,
      options: this.options
    }
  }
}

/**
 * Slash Command Dispatcher
 *
 * @since v0.2 | 10th of August, 2021
 * @version 0.1.0-beta
 */
class SlashDispatcher extends EventEmitter {
  constructor () {
    super()
    this._commands = new Collection()
  }

  // TODO: more info
  async add (slashCommand) {
    const foxSlashCommand = new SlashCommand(slashCommand)
    this._commands.set(slashCommand.name, foxSlashCommand)
  }

  async remove (name) {
    this._commands.delete(name)
  }

  async find (name) {
    const cmd = await this._commands.find(cmd => {
      if (cmd.aliases) {
        return cmd.name === name || cmd.aliases.includes(name)
      }

      return cmd.name === name
    })

    return cmd
  }
}

module.exports = {
  SlashDispatcher,
  SlashCommand,
  SlashError
}
