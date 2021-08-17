const modularium = require('./src/index')

/**
 * JSON config is now deprecated.
 * 
 * Reason: https://discordjs.guide/additional-info/changes-in-v13.html#intents
 */
modularium.run(require('./config'))