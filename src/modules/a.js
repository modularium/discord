const rdl = require('readline')
const { version: ver } = require('../../package.json')

/**
 * Startup module that includes ascii, generating invite link
 */
module.exports = async (plugin, config) => {
  process.stdout.write('\x1B[2J\x1B[0f')
  const spinners = ['/', '-', '\\', '-']
  let index = 0
  const timeStarted = Date.now()

  const spinner = setInterval(() => {
    let line = spinners[index]
    if (index + 1 > spinners.length) index = 0; line = spinners[index]
    const lineToDisplay = `  ${line.x1} ${plugin.localeString('spinner.wait')}`
    process.stdout.write(lineToDisplay)
    if (Date.now() - timeStarted > 2500) process.stdout.write(`\t(${plugin.localeString('spinner.tooLong')})`)
    rdl.cursorTo(process.stdout, 0)

    index = index >= spinners.length ? 0 : index + 1
  }, 100)

  plugin.bot.on('ready', () => {
    rdl.clearLine(process.stdout, 0)

    clearInterval(spinner)

    if (config.bot.generateLink === true) {
      const link = plugin.bot.generateInvite({
        scopes: ['bot', ...config.bot.linkScopes],
        permissions: config.bot.linkPermissions
      })
      plugin.info(plugin.localeString('invitelink', link))
    }
    // plugin.bot.user.setUsername(config.user.name || 'ModulariumBot')
  })

  const line1 = '  ,__ __                      _                                   , __          '.x1.xb16
  const line2 = ' /|  |  |          |         | |             o                   /|/  \\         '.x1.xb16
  const line3 = '  |  |  |   __   __|         | |  __,   ,_              _  _  _   | __/ __ _|_  '.x1.xb16
  const line4 = '  |  |  |  /  \\_/  |  |   |  |/  /  |  /  |  |  |   |  / |/ |/ |  |   \\/  \\_|   '.x1.xb16
  const line5 = '  |  |  |_/\\__/ \\_/|_/ \\_/|_/|__/\\_/|_/   |_/|_/ \\_/|_/  |  |  |_/|(__/\\__/ |_/ '.x1.xb16
  const line6 = '                                                                                '.x1.xb16
  const line7 = `v${ver} `

  if (config.features.ascii) {
    console.log(`\n  ${line1}\n  ${line2}\n  ${line3}\n  ${line4}\n  ${line5}\n  ${line6}\n  ${('  ' + line7 + ' ').x1.xb16}\n`)
  } else {
    console.log(`\n  ${('  ModulariumBot | ' + line7).x1.xb16}\n`)
  }
}
