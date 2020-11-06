module.exports = {
    commands: ['ping', 'p'],
    minArgs: 0,
    maxArgs: 0,
    description: 'Comprueba si el bot esta activo',
    callback: (message, arguments, text) => {
        message.reply('Pong!')
    },
}